import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { joinVideoSession, endVideoSession } from '../api/videoSessionService';
import signalingService from '../api/signalingService';
import webRTCService from '../api/webRTCService';

const VideoSession = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  
  const [isConnected, setIsConnected] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [permissionWarning, setPermissionWarning] = useState(null);
  const [canRetryMedia, setCanRetryMedia] = useState(false);
  const [isRetryingMedia, setIsRetryingMedia] = useState(false);
  const [remoteParticipantName, setRemoteParticipantName] = useState('Remote Participant');
  const [hasRemoteVideo, setHasRemoteVideo] = useState(false);
  const [remoteUserJoined, setRemoteUserJoined] = useState(false);
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  // Assign local stream to video element when it becomes available
  useEffect(() => {
    if (localStream && localVideoRef.current) {
      console.log('Assigning local stream to video element');
      localVideoRef.current.srcObject = localStream;
      localVideoRef.current.play().catch(err => console.error('Error playing local video:', err));
    }
  }, [localStream]);

  useEffect(() => {
    initializeVideoSession();
    
    return () => {
      cleanup();
    };
  }, [appointmentId]);

  const initializeVideoSession = async () => {
    try {
      setIsLoading(true);
      
      // Get user info from token
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = jwtDecode(token);
          setUserRole(payload.role);
          setUserName(payload.sub);
        } catch (err) {
          console.error('Error decoding token:', err);
        }
      }
      
      // Join video session
      console.log('Joining video session for appointment:', appointmentId);
      const response = await joinVideoSession(appointmentId);
      console.log('Video session API response:', response.data);
      
      let { roomToken, wsUrl, allowedFrom, allowedUntil } = response.data;
      
      // Validate roomToken
      if (!roomToken) {
        console.error('API response missing roomToken. Full response:', response.data);
        setError('Invalid session response: missing room token. Please try again.');
        setIsLoading(false);
        return;
      }
      
      // Construct WebSocket URL if not provided or incorrect
      if (!wsUrl || wsUrl.includes('undefined')) {
        console.warn('Invalid wsUrl from API:', wsUrl, '- Constructing correct URL');
        // Use wss for secure WebSocket, connect to /ws/signaling endpoint
        wsUrl = `wss://localhost:8443/ws/signaling`;
        console.log('Constructed WebSocket URL:', wsUrl);
      }
      
      setSessionData(response.data);
      
      // Initialize WebRTC - this happens regardless of media availability
      await webRTCService.initialize(handleRemoteStream, handleRemoteDisconnection);
      console.log('WebRTC initialized');
      
      // Try to get local media, but don't fail if unavailable
      let localVideoStream;
      try {
        localVideoStream = await webRTCService.startLocalVideo();
        setLocalStream(localVideoStream);
        setCanRetryMedia(false);
        console.log('Local stream acquired successfully');
        
        // Log stream details for debugging
        console.log('Local stream tracks:', {
          videoTracks: localVideoStream.getVideoTracks().length,
          audioTracks: localVideoStream.getAudioTracks().length
        });
      } catch (mediaError) {
        console.error('Media access error:', mediaError);
        
        let warningMsg = 'Camera/microphone access denied. ';
        if (mediaError.name === 'NotAllowedError') {
          warningMsg += 'You can still join the session. Enable permissions in browser settings to use camera/microphone.';
        } else if (mediaError.name === 'NotFoundError') {
          warningMsg += 'No camera/microphone devices found. You can still participate in the session.';
        } else {
          warningMsg += 'You can still join the session without media.';
        }
        
        setPermissionWarning(warningMsg);
        setCanRetryMedia(true);
        
        // Allow continuing without media
        console.log('Continuing session without local media');
      }
      
      // Ensure video and audio are enabled if we have them
      if (localVideoStream) {
        const videoTrack = localVideoStream.getVideoTracks()[0];
        const audioTrack = localVideoStream.getAudioTracks()[0];
        if (videoTrack) {
          videoTrack.enabled = true;
          console.log('Video track enabled:', videoTrack.getSettings());
        }
        if (audioTrack) {
          audioTrack.enabled = true;
          console.log('Audio track enabled:', audioTrack.getSettings());
        }
      }
      
      // Connect to signaling server - happens regardless of media availability
      console.log('Connecting to signaling server:', wsUrl);
      signalingService.connect(wsUrl, roomToken, handleSignalingMessage);
      
      // User is now in the session, even without media
      setIsConnected(true);
      setIsLoading(false);
      console.log('Session initialized. User is connected.');
      
    } catch (error) {
      console.error('Failed to initialize video session:', error);
      setError(error.response?.data?.message || error.message || 'Failed to join video session');
      setIsLoading(false);
    }
  };

  const handleSignalingMessage = async (message) => {
    try {
      switch (message.type) {
        case 'user-joined':
          // Another user joined, mark them as joined
          console.log('Remote user joined');
          setRemoteUserJoined(true);
          setParticipants(prev => {
            // Avoid duplicates
            if (prev.includes('Remote participant')) {
              return prev;
            }
            return [...prev, 'Remote participant'];
          });
          // Create offer if we're the initiator
          if (!webRTCService.isInitiator) {
            console.log('Creating offer for remote participant');
            await webRTCService.createOffer();
          }
          break;
          
        case 'user-left':
        case 'user-disconnected':
          // Remote user left or disconnected
          console.log('Remote user left/disconnected');
          setRemoteUserJoined(false);
          setHasRemoteVideo(false);
          setParticipants([]);
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null;
          }
          console.log('Remote user removed, showing waiting state');
          break;
          
        case 'OFFER':
          console.log('Received offer from remote');
          if (!message.offer) {
            console.error('Offer message missing offer data');
            break;
          }
          try {
            await webRTCService.handleOffer(new RTCSessionDescription(message.offer));
          } catch (err) {
            console.error('Error handling offer:', err);
          }
          break;
          
        case 'ANSWER':
          console.log('Received answer from remote');
          if (!message.answer) {
            console.error('Answer message missing answer data');
            break;
          }
          try {
            await webRTCService.handleAnswer(new RTCSessionDescription(message.answer));
          } catch (err) {
            console.error('Error handling answer:', err);
          }
          break;
          
        case 'ICE':
          if (!message.candidate) {
            console.error('ICE message missing candidate data');
            break;
          }
          try {
            await webRTCService.handleIceCandidate(new RTCIceCandidate(message.candidate));
          } catch (err) {
            console.error('Error handling ICE candidate:', err);
          }
          break;
          
        default:
          console.log('Unknown message type:', message.type);
      }
    } catch (error) {
      console.error('Error handling signaling message:', error);
    }
  };

  const handleRemoteStream = (stream) => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = stream;
      // Check if stream has video tracks
      const hasVideo = stream && stream.getVideoTracks().length > 0;
      setHasRemoteVideo(hasVideo);
      console.log('Remote stream assigned. Has video:', hasVideo);
    }
  };

  const handleRemoteDisconnection = () => {
    console.log('Remote user disconnected - resetting session state');
    setRemoteUserJoined(false);
    setHasRemoteVideo(false);
    setParticipants([]);
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
    console.log('Showing waiting state again');
  };

  const toggleAudio = () => {
    const enabled = webRTCService.toggleAudio();
    setIsAudioEnabled(enabled);
  };

  const toggleVideo = () => {
    const enabled = webRTCService.toggleVideo();
    setIsVideoEnabled(enabled);
  };

  const retryMediaPermission = async () => {
    try {
      setIsRetryingMedia(true);
      setPermissionWarning(null);
      console.log('Retrying media permission request...');
      const stream = await webRTCService.startLocalVideo();
      setLocalStream(stream);
      setCanRetryMedia(false);
      console.log('Media permission granted successfully');
    } catch (error) {
      console.error('Still unable to access media:', error);
      setPermissionWarning('Still unable to access camera/microphone. You can continue without media.');
    } finally {
      setIsRetryingMedia(false);
    }
  };

  const leaveSession = async () => {
    try {
      // Try to end session if we have session data
      if (sessionData) {
        // The videoSessionId might be in the session data or we can derive it
        // For now, we'll just disconnect gracefully
        console.log('Leaving session for appointment:', appointmentId);
      }
      cleanup();
      navigate(-1);
    } catch (error) {
      console.error('Error ending session:', error);
      cleanup();
      navigate(-1);
    }
  };

  const cleanup = () => {
    // Stop all tracks in local stream
    if (localStream) {
      localStream.getTracks().forEach(track => {
        console.log('Stopping track:', track.kind);
        track.stop();
      });
    }
    webRTCService.cleanup();
    signalingService.disconnect();
    setIsConnected(false);
    setLocalStream(null);
  };

  if (isLoading) {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center" 
           style={{ backgroundColor: "#FAF9F7", minHeight: "100vh" }}>
        <div className="text-center">
          <div className="spinner-border mb-3" style={{ color: "#8E6EC8" }}></div>
          <h5 style={{ color: "#8E6EC8" }}>Connecting to video session...</h5>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center" 
           style={{ backgroundColor: "#FAF9F7", minHeight: "100vh" }}>
        <div className="card border-0 shadow-sm" style={{ backgroundColor: "#FFFFFF", borderRadius: "15px", maxWidth: "500px" }}>
          <div className="card-body text-center p-5">
            <i className="fas fa-exclamation-triangle fa-3x mb-3" style={{ color: "#D9899A" }}></i>
            <h4 className="mb-3" style={{ color: "#8E6EC8" }}>Unable to Join Session</h4>
            <p className="mb-4" style={{ color: "#CFCFD4" }}>{error}</p>
            <button 
              className="btn px-4"
              style={{ backgroundColor: "#8E6EC8", color: "white", border: "none" }}
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: "#FAF9F7", minHeight: "100vh", padding: "0" }}>
      {/* Permission Warning */}
      {permissionWarning && (
        <div className="alert alert-warning m-0" style={{ borderRadius: "0" }}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <i className="fas fa-exclamation-triangle me-2"></i>
              {permissionWarning}
            </div>
            {canRetryMedia && (
              <button 
                className="btn btn-sm btn-outline-warning"
                onClick={retryMediaPermission}
                disabled={isRetryingMedia}
              >
                {isRetryingMedia ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                    Requesting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-redo me-1"></i>Retry Permissions
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="row mb-0">
        <div className="col-12">
          <div className="card border-0" style={{ background: "linear-gradient(135deg, #F3A6A1 0%, #E8A1B0 100%)", color: "white", borderRadius: "0" }}>
            <div className="card-body py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-center flex-grow-1">
                  <h5 className="mb-0">
                    <i className="fas fa-video me-2"></i>
                    Video Session - Appointment #{appointmentId}
                  </h5>
                </div>
                <div className="text-end">
                  <small className="d-block">
                    You: {userRole === 'ROLE_PROFESSIONAL' ? 'Professional' : 'Patient'}
                  </small>
                  <small className="opacity-75">{userName}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Container */}
      <div className="row g-0" style={{ height: "calc(100vh - 140px)" }}>
        {/* Remote Video */}
        <div className="col-12 col-lg-8 position-relative">
          <div className="h-100 d-flex align-items-center justify-content-center" 
               style={{ backgroundColor: "#2C2C2C" }}>
            {/* Video element always present but hidden when no video */}
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-100 h-100"
              style={{ objectFit: "cover", display: hasRemoteVideo ? 'block' : 'none' }}
            />
            
            {remoteUserJoined ? (
              hasRemoteVideo ? (
                <div className="position-absolute top-0 start-0 m-2">
                  <span className="badge px-2 py-1" style={{ backgroundColor: "rgba(0,0,0,0.7)", color: "white" }}>
                    {userRole === 'ROLE_PROFESSIONAL' ? 'Patient' : 'Professional'}
                  </span>
                </div>
              ) : (
                <>
                  <div className="position-absolute text-center text-white">
                    <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" 
                         style={{ width: "150px", height: "150px", backgroundColor: "rgba(255,255,255,0.15)" }}>
                      <i className="fas fa-user fa-5x opacity-50"></i>
                    </div>
                    <h6 className="mb-2">{userRole === 'ROLE_PROFESSIONAL' ? 'Patient' : 'Professional'}</h6>
                    <p className="opacity-75 mb-0">Audio Only • No camera available</p>
                  </div>
                  
                  <div className="position-absolute top-0 start-0 m-2">
                    <span className="badge px-2 py-1" style={{ backgroundColor: "rgba(0,0,0,0.7)", color: "white" }}>
                      {userRole === 'ROLE_PROFESSIONAL' ? 'Patient' : 'Professional'} (Audio Only)
                    </span>
                  </div>
                </>
              )
            ) : (
              <div className="position-absolute text-center text-white">
                <i className="fas fa-user-clock fa-5x mb-3 opacity-50"></i>
                <h5>Waiting for {userRole === 'ROLE_PROFESSIONAL' ? 'patient' : 'professional'} to join...</h5>
                <p className="opacity-75">The session will start once both participants are connected</p>
              </div>
            )}
          </div>
        </div>

        {/* Local Video */}
        <div className="col-12 col-lg-4">
          <div className="h-100 position-relative" style={{ backgroundColor: "#1A1A1A" }}>
            {localStream ? (
              <>
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-100 h-100"
                  style={{ objectFit: "cover", transform: "scaleX(-1)" }}
                  onLoadedMetadata={() => console.log('Local video loaded with metadata')}
                  onError={(e) => console.error('Local video element error:', e)}
                  onPlay={() => console.log('Local video playing')}
                  onCanPlay={() => console.log('Local video can play')}
                />
                <div className="position-absolute top-0 start-0 m-2">
                  <span className="badge px-2 py-1" style={{ backgroundColor: "rgba(0,0,0,0.7)", color: "white" }}>
                    You ({userRole === 'ROLE_PROFESSIONAL' ? 'Professional' : 'Patient'})
                  </span>
                </div>
                {!isVideoEnabled && (
                  <div className="position-absolute top-50 start-50 translate-middle text-white text-center">
                    <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2" 
                         style={{ width: "80px", height: "80px", backgroundColor: "rgba(255,255,255,0.2)" }}>
                      <i className="fas fa-video-slash fa-2x"></i>
                    </div>
                    <div>Camera Off</div>
                  </div>
                )}
              </>
            ) : (
              <div className="h-100 d-flex flex-column align-items-center justify-content-center text-white text-center">
                {isRetryingMedia ? (
                  <>
                    <div className="spinner-border mb-3" style={{ color: "#8E6EC8" }} role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <h6>Requesting camera/microphone access...</h6>
                    <p className="opacity-75 mb-0 px-2">Please allow permissions when prompted by your browser</p>
                  </>
                ) : (
                  <>
                    <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" 
                         style={{ width: "100px", height: "100px", backgroundColor: "rgba(255,255,255,0.1)" }}>
                      <i className="fas fa-microphone-slash fa-3x opacity-50"></i>
                    </div>
                    <h6>Audio Only</h6>
                    <p className="opacity-75 mb-2 px-2">Camera/microphone not available</p>
                    {canRetryMedia && (
                      <button 
                        className="btn btn-sm btn-light"
                        onClick={retryMediaPermission}
                        disabled={isRetryingMedia}
                      >
                        {isRetryingMedia ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                            Requesting...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-redo me-1"></i>Enable Media
                          </>
                        )}
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="row g-0">
        <div className="col-12">
          <div className="card border-0" style={{ backgroundColor: "#FFFFFF", borderRadius: "0" }}>
            <div className="card-body py-3">
              <div className="d-flex justify-content-center gap-3">
                {/* Mute/Unmute */}
                <button
                  className="btn btn-lg rounded-circle d-flex align-items-center justify-content-center"
                  style={{ 
                    width: "60px", 
                    height: "60px",
                    backgroundColor: !localStream ? "#CCCCCC" : (isAudioEnabled ? "#8E6EC8" : "#D9899A"),
                    color: "white",
                    border: "none",
                    opacity: !localStream ? 0.6 : 1
                  }}
                  onClick={toggleAudio}
                  disabled={!localStream}
                  title={!localStream ? "Media not available" : (isAudioEnabled ? "Mute" : "Unmute")}
                >
                  <i className={`fas ${isAudioEnabled ? "fa-microphone" : "fa-microphone-slash"} fa-lg`}></i>
                </button>

                {/* Camera On/Off */}
                <button
                  className="btn btn-lg rounded-circle d-flex align-items-center justify-content-center"
                  style={{ 
                    width: "60px", 
                    height: "60px",
                    backgroundColor: !localStream ? "#CCCCCC" : (isVideoEnabled ? "#8E6EC8" : "#D9899A"),
                    color: "white",
                    border: "none",
                    opacity: !localStream ? 0.6 : 1
                  }}
                  onClick={toggleVideo}
                  disabled={!localStream}
                  title={!localStream ? "Media not available" : (isVideoEnabled ? "Turn Camera Off" : "Turn Camera On")}
                >
                  <i className={`fas ${isVideoEnabled ? "fa-video" : "fa-video-slash"} fa-lg`}></i>
                </button>

                {/* Leave Session */}
                <button
                  className="btn btn-lg rounded-circle d-flex align-items-center justify-content-center"
                  style={{ 
                    width: "60px", 
                    height: "60px",
                    backgroundColor: "#D9899A",
                    color: "white",
                    border: "none"
                  }}
                  onClick={leaveSession}
                  title="Leave Session"
                >
                  <i className="fas fa-phone-slash fa-lg"></i>
                </button>
              </div>

              {/* Session Info */}
              <div className="text-center mt-3">
                <small style={{ color: "#CFCFD4" }}>
                  <i className="fas fa-circle text-success me-1"></i>
                  Connected as {userRole === 'ROLE_PROFESSIONAL' ? 'Professional' : 'Patient'}
                  {remoteUserJoined && (
                    <span className="ms-2">
                      <i className="fas fa-users me-1"></i>
                      2 participant(s)
                    </span>
                  )}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSession;
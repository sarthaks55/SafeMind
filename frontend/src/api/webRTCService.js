import signalingService from './signalingService';

class WebRTCService {
  constructor() {
    this.peerConnection = null;
    this.localStream = null;
    this.remoteStream = null;
    this.onRemoteStream = null;
    this.onDisconnect = null;
    this.isInitiator = false;
    this.senders = [];
    
    this.configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    };
  }

  async initialize(onRemoteStream, onDisconnect) {
    this.onRemoteStream = onRemoteStream;
    this.onDisconnect = onDisconnect;
    this.peerConnection = new RTCPeerConnection(this.configuration);
    
    // Log connection state changes for debugging
    this.peerConnection.onconnectionstatechange = () => {
      console.log('Connection state:', this.peerConnection.connectionState);
      
      // Detect disconnection
      if (this.peerConnection.connectionState === 'disconnected' || 
          this.peerConnection.connectionState === 'failed' ||
          this.peerConnection.connectionState === 'closed') {
        console.log('Peer connection disconnected');
        if (this.onDisconnect) {
          this.onDisconnect();
        }
      }
    };
    
    this.peerConnection.oniceconnectionstatechange = () => {
      console.log('ICE connection state:', this.peerConnection.iceConnectionState);
      
      // Also detect ICE disconnection
      if (this.peerConnection.iceConnectionState === 'disconnected' ||
          this.peerConnection.iceConnectionState === 'failed') {
        console.log('ICE connection lost');
        if (this.onDisconnect) {
          this.onDisconnect();
        }
      }
    };
    
    this.peerConnection.onicegatheringstate = () => {
      console.log('ICE gathering state:', this.peerConnection.iceGatheringState);
    };
    
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('Sending ICE candidate');
        signalingService.send({
          type: 'ICE',
          candidate: event.candidate
        });
      }
    };
    
    this.peerConnection.ontrack = (event) => {
      console.log('Remote track received:', event.track.kind);
      this.remoteStream = event.streams[0];
      if (this.onRemoteStream) {
        this.onRemoteStream(this.remoteStream);
      }
    };
    
    this.peerConnection.onerror = (event) => {
      console.error('Peer connection error:', event);
    };
  }

  async startLocalVideo() {
    try {
      console.log('Requesting media devices...');
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: true
      });
      
      console.log('Media devices acquired successfully');
      console.log('Video tracks:', this.localStream.getVideoTracks().length);
      console.log('Audio tracks:', this.localStream.getAudioTracks().length);
      
      if (this.localStream.getVideoTracks().length === 0) {
        console.warn('No video track in stream');
      }
      if (this.localStream.getAudioTracks().length === 0) {
        console.warn('No audio track in stream');
      }
      
      if (this.peerConnection) {
        this.localStream.getTracks().forEach(track => {
          console.log('Adding track to peer connection:', track.kind);
          const sender = this.peerConnection.addTrack(track, this.localStream);
          this.senders.push({ track, sender });
        });
      }
      
      return this.localStream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      
      if (error.name === 'NotAllowedError') {
        console.error('Permission denied. User may have blocked camera/microphone access.');
      } else if (error.name === 'NotFoundError') {
        console.error('No camera/microphone devices found.');
      }
      
      throw error;
    }
  }

  async createOffer() {
    try {
      this.isInitiator = true;
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      console.log('Offer created and set as local description');
      
      signalingService.send({
        type: 'OFFER',
        offer: offer
      });
    } catch (error) {
      console.error('Error creating offer:', error);
      throw error;
    }
  }

  async handleOffer(offer) {
    try {
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      console.log('Answer created and set as local description');
      
      signalingService.send({
        type: 'ANSWER',
        answer: answer
      });
    } catch (error) {
      console.error('Error handling offer:', error);
      throw error;
    }
  }

  async handleAnswer(answer) {
    try {
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      console.log('Answer set as remote description');
    } catch (error) {
      console.error('Error handling answer:', error);
      throw error;
    }
  }

  async handleIceCandidate(candidate) {
    try {
      if (candidate) {
        await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      }
    } catch (error) {
      console.error('Error adding ICE candidate:', error);
      // Don't throw - ICE errors are not always fatal
    }
  }

  toggleAudio() {
    if (this.localStream) {
      const audioTrack = this.localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        return audioTrack.enabled;
      }
    }
    return false;
  }

  toggleVideo() {
    if (this.localStream) {
      const videoTrack = this.localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        return videoTrack.enabled;
      }
    }
    return false;
  }

  cleanup() {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }
    
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
    
    this.remoteStream = null;
    this.isInitiator = false;
    this.senders = [];
  }
}

export default new WebRTCService();
import { useState } from 'react';
import { joinVideoSession } from '../api/videoSessionService';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';

const ExampleApiHandling = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleJoinSession = async (appointmentId) => {
    try {
      setLoading(true);
      setErrorMessage('');
      setSuccessMessage('');
      
      const response = await joinVideoSession(appointmentId);
      
      if (response.success) {
        // Success case - response.success = true
        setSuccessMessage(response.message || 'Joined video session successfully');
        console.log('Session data:', response.data);
        // Use response.data for further processing
      } else {
        // Error case - response.success = false
        setErrorMessage(response.message || 'Failed to join session');
        console.log('Error details:', response);
      }
    } catch (err) {
      // Network or other errors
      setErrorMessage(err.response?.data?.message || 'Network error occurred');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3>API Response Handling Example</h3>
      
      {/* Error and Success Messages */}
      <ErrorMessage error={errorMessage} onClose={() => setErrorMessage('')} />
      <SuccessMessage message={successMessage} onClose={() => setSuccessMessage('')} />
      
      <div className="mt-3">
        <button 
          className="btn btn-primary me-2"
          onClick={() => handleJoinSession(1)}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Test Valid Session (ID: 1)'}
        </button>
        
        <button 
          className="btn btn-danger"
          onClick={() => handleJoinSession(99)}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Test Invalid Session (ID: 99)'}
        </button>
      </div>
      
      <div className="mt-4">
        <h5>Expected Responses:</h5>
        <div className="row">
          <div className="col-md-6">
            <h6 className="text-success">Success Response (ID: 1)</h6>
            <pre className="bg-light p-2">
{`{
  "success": true,
  "message": "Joined video session successfully",
  "data": {
    "roomToken": "abc123",
    "wsUrl": "wss://example.com/ws/signaling",
    "allowedFrom": "2026-02-01T18:00:00",
    "allowedUntil": "2026-02-01T18:30:00"
  },
  "timestamp": "2026-02-01T18:00:01"
}`}
            </pre>
          </div>
          <div className="col-md-6">
            <h6 className="text-danger">Error Response (ID: 99)</h6>
            <pre className="bg-light p-2">
{`{
  "success": false,
  "message": "Appointment not found with id 99",
  "data": null,
  "timestamp": "2026-02-01T18:00:01"
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExampleApiHandling;
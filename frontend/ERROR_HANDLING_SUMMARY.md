# API Response Handling & Console Logging Updates

## Overview
Updated the frontend to properly handle both success and error responses from the backend API, display user-friendly messages, and log all responses to console.

## Key Changes Made

### 1. Console Logging (axios.js)
- Added response interceptor to log all API responses
- Added error interceptor to log all API errors
- All API calls now automatically log responses to console

### 2. Reusable Components Created
- **ErrorMessage.jsx** - Displays error messages with dismiss functionality
- **SuccessMessage.jsx** - Displays success messages with dismiss functionality
- **ExampleApiHandling.jsx** - Demonstrates proper API response handling

### 3. Updated Components
- **Login.jsx** - Uses ErrorMessage/SuccessMessage instead of alerts
- **RegisterUser.jsx** - Uses ErrorMessage/SuccessMessage instead of alerts
- **User Profile.jsx** - Uses ErrorMessage/SuccessMessage for profile updates
- **User Appointments.jsx** - Uses ErrorMessage/SuccessMessage for appointment operations
- **DiaryEditor.jsx** - Uses ErrorMessage/SuccessMessage for diary operations
- **VideoSession.jsx** - Properly handles error responses

### 4. Utility Functions (apiUtils.js)
- **handleApiResponse()** - Consistent response handling
- **handleApiError()** - Consistent error handling
- **showMessage()** - Message display utility

## Response Handling Pattern

### Success Response Handling
```javascript
const response = await apiCall();
if (response.success) {
  setSuccessMessage(response.message || "Operation successful");
  // Use response.data for further processing
} else {
  setErrorMessage(response.message || "Operation failed");
}
```

### Error Response Handling
```javascript
try {
  // API call
} catch (err) {
  setErrorMessage(err.response?.data?.message || "Network error");
}
```

## Sample API Responses

### Success Response
```json
{
  "success": true,
  "message": "Joined video session successfully",
  "data": {
    "roomToken": "abc123",
    "wsUrl": "wss://example.com/ws/signaling",
    "allowedFrom": "2026-02-01T18:00:00",
    "allowedUntil": "2026-02-01T18:30:00"
  },
  "timestamp": "2026-02-01T18:00:01"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Appointment not found with id 99",
  "data": null,
  "timestamp": "2026-02-01T18:00:01"
}
```

## Benefits

1. **Console Logging** - All API responses are automatically logged for debugging
2. **User-Friendly Messages** - Error/success messages displayed in UI instead of alerts
3. **Consistent Handling** - All components follow the same response handling pattern
4. **Better UX** - Dismissible message components with proper styling
5. **Debugging** - Easy to track API responses in browser console

## Usage Example

```javascript
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';

const MyComponent = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleApiCall = async () => {
    try {
      setErrorMessage('');
      const response = await someApiCall();
      
      if (response.success) {
        setSuccessMessage(response.message);
        // Process response.data
      } else {
        setErrorMessage(response.message);
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div>
      <ErrorMessage error={errorMessage} onClose={() => setErrorMessage('')} />
      <SuccessMessage message={successMessage} onClose={() => setSuccessMessage('')} />
      {/* Rest of component */}
    </div>
  );
};
```

## Testing

1. Check browser console for API response logs
2. Test success scenarios - should show green success messages
3. Test error scenarios - should show red error messages
4. Verify message dismissal functionality
5. Test network errors and timeouts
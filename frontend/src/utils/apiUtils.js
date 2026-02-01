// Utility function to handle API responses consistently
export const handleApiResponse = (response, onSuccess, onError) => {
  console.log('API Response:', response);
  
  if (response.success) {
    if (onSuccess) onSuccess(response.data, response.message);
  } else {
    if (onError) onError(response.message || 'Operation failed');
  }
  
  return response.success;
};

// Utility function to handle API errors
export const handleApiError = (error, onError) => {
  console.log('API Error:', error.response?.data || error.message);
  
  const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
  if (onError) onError(errorMessage);
  
  return errorMessage;
};

// Utility function for showing success/error messages
export const showMessage = (message, type = 'info') => {
  // This can be extended to use toast notifications or other UI libraries
  console.log(`${type.toUpperCase()}: ${message}`);
  return message;
};
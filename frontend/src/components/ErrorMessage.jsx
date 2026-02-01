const ErrorMessage = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      <i className="fas fa-exclamation-triangle me-2"></i>
      {error}
      {onClose && (
        <button 
          type="button" 
          className="btn-close" 
          onClick={onClose}
          aria-label="Close"
        ></button>
      )}
    </div>
  );
};

export default ErrorMessage;
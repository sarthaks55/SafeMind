const SuccessMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="alert alert-success alert-dismissible fade show" role="alert">
      <i className="fas fa-check-circle me-2"></i>
      {message}
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

export default SuccessMessage;
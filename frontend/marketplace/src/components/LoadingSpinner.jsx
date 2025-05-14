// src/components/LoadingSpinner.js
// Optional CSS for custom animations

const LoadingSpinner = ({ variant = 'primary', size = 'md', text = 'Loading...' }) => {
  // Size classes
  const sizeClasses = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg' // You'll need to define this in your CSS
  };

  // Variant colors
  const variantClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    danger: 'text-danger',
    warning: 'text-warning',
    info: 'text-info',
    light: 'text-light',
    dark: 'text-dark'
  };

  return (
    <div className="loading-spinner-container">
      {/* Option 1: Standard Bootstrap Spinner */}
      <div className={`spinner-border ${sizeClasses[size]} ${variantClasses[variant]}`} role="status">
        <span className="visually-hidden">{text}</span>
      </div>
      
      {/* Option 2: Custom Animated Spinner (uncomment to use) */}
      {/* <div className="custom-spinner">
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
      </div> */}
      
      {/* Optional loading text */}
      {text && <div className="loading-text mt-2">{text}</div>}
    </div>
  );
};

export default LoadingSpinner;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaIdCard, 
  FaLock, 
  FaBirthdayCake 
} from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    Username: '',
    email: '',
    Password: '',
    ConfirmPassword: '',
    Phone: '',
    Cin: '',
    Birthday: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.Username.trim()) {
      newErrors.Username = 'Username is required';
    } else if (formData.Username.length < 5) {
      newErrors.Username = 'Username must be at least 5 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.Phone) {
      newErrors.Phone = 'Phone is required';
    } else if (!/^\d{8}$/.test(formData.Phone)) {
      newErrors.Phone = 'Phone must be 8 digits';
    }
    
    if (!formData.Cin) {
      newErrors.Cin = 'CIN is required';
    } else if (!/^[A-Z0-9]{8}$/.test(formData.Cin)) {
      newErrors.Cin = 'CIN must be 8 alphanumeric characters';
    }
    
    if (!formData.Birthday) {
      newErrors.Birthday = 'Birthday is required';
    }
    
    if (!formData.Password) {
      newErrors.Password = 'Password is required';
    } else if (formData.Password.length < 6) {
      newErrors.Password = 'Password must be at least 6 characters';
    }
    
    if (formData.Password !== formData.ConfirmPassword) {
      newErrors.ConfirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await axios.post('http://localhost:5001/api/auth/register', {
        Username: formData.Username,
        email: formData.email,
        Password: formData.Password,
        Phone: formData.Phone,
        Cin: formData.Cin,
        Birthday: formData.Birthday
      });
      
      toast.success('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response) {
        // Server responded with error status
        if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 400) {
          errorMessage = 'Validation failed. Please check your inputs.';
        } else if (error.response.status === 409) {
          errorMessage = 'User already exists with these details.';
        }
        
        // Set field-specific errors if available
        if (error.response.data?.errors) {
          setErrors(error.response.data.errors);
        }
      } else if (error.request) {
        // Request was made but no response
        errorMessage = 'Network error. Please check your connection.';
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: '800px', width: '100%' }}>
        <h2 className="text-center mb-4 text-primary">
          <FaUser className="me-2" />
          Create Your Account
        </h2>
        
        <form onSubmit={handleSubmit}>
          {/* Username and Email */}
          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <label className="form-label">
                <FaUser className="me-2" />
                Username
              </label>
              <input
                type="text"
                className={`form-control ${errors.Username ? 'is-invalid' : ''}`}
                name="Username"
                value={formData.Username}
                onChange={handleChange}
                placeholder="Enter username (min 5 characters)"
              />
              {errors.Username && <div className="invalid-feedback">{errors.Username}</div>}
            </div>
            
            <div className="col-md-6 mb-3">
              <label className="form-label">
                <FaEnvelope className="me-2" />
                Email
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
          </div>

          {/* Phone and Birthday */}
          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <label className="form-label">
                <FaPhone className="me-2" />
                Phone
              </label>
              <input
                type="tel"
                className={`form-control ${errors.Phone ? 'is-invalid' : ''}`}
                name="Phone"
                value={formData.Phone}
                onChange={handleChange}
                placeholder="Enter 8-digit phone number"
              />
              {errors.Phone && <div className="invalid-feedback">{errors.Phone}</div>}
            </div>
            
            <div className="col-md-6 mb-3">
              <label className="form-label">
                <FaBirthdayCake className="me-2" />
                Birthday
              </label>
              <input
                type="date"
                className={`form-control ${errors.Birthday ? 'is-invalid' : ''}`}
                name="Birthday"
                value={formData.Birthday}
                onChange={handleChange}
              />
              {errors.Birthday && <div className="invalid-feedback">{errors.Birthday}</div>}
            </div>
          </div>

          {/* CIN */}
          <div className="mb-3">
            <label className="form-label">
              <FaIdCard className="me-2" />
              CIN
            </label>
            <input
              type="text"
              className={`form-control ${errors.Cin ? 'is-invalid' : ''}`}
              name="Cin"
              value={formData.Cin}
              onChange={handleChange}
              placeholder="Enter 8-character CIN"
            />
            {errors.Cin && <div className="invalid-feedback">{errors.Cin}</div>}
          </div>

          {/* Password and Confirm Password */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <label className="form-label">
                <FaLock className="me-2" />
                Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.Password ? 'is-invalid' : ''}`}
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                placeholder="Enter password (min 6 characters)"
              />
              {errors.Password && <div className="invalid-feedback">{errors.Password}</div>}
            </div>
            
            <div className="col-md-6 mb-3">
              <label className="form-label">
                <FaLock className="me-2" />
                Confirm Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.ConfirmPassword ? 'is-invalid' : ''}`}
                name="ConfirmPassword"
                value={formData.ConfirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
              {errors.ConfirmPassword && <div className="invalid-feedback">{errors.ConfirmPassword}</div>}
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100 py-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Registering...
              </>
            ) : 'Register'}
          </button>

          <div className="text-center mt-3">
            <p className="text-muted">
              Already have an account?{' '}
              <a href="/login" className="text-primary text-decoration-none">
                Login here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [formData, setFormData] = useState({
    Username: '',
    email: '',
    Password: '',
    confirmPassword: '',
    Phone: '',
    Cin: '',
    Birthday: null,
    role: 'user'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = 'http://localhost:5001/api';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'Cin' ? value.toUpperCase() : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, Birthday: date }));
    if (errors.Birthday) {
      setErrors(prev => ({ ...prev, Birthday: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.Username || formData.Username.trim().length < 5) {
      newErrors.Username = 'Username must be at least 5 characters';
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }

    if (!formData.Password || formData.Password.length < 6 ||
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.Password)) {
      newErrors.Password = 'Password must include uppercase, lowercase, number, and special character';
    }

    if (formData.Password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!/^\d{8}$/.test(formData.Phone)) {
      newErrors.Phone = 'Phone must be exactly 8 digits';
    }

    if (!/^[A-Z0-9]{8}$/.test(formData.Cin)) {
      newErrors.Cin = 'CIN must be 8 uppercase letters or digits';
    }

    if (!formData.Birthday || formData.Birthday >= new Date()) {
      newErrors.Birthday = 'Valid birthday in the past is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const userData = {
        Username: formData.Username.trim(),
        email: formData.email.trim(),
        Password: formData.Password,
        Phone: formData.Phone,
        Cin: formData.Cin.toUpperCase(),
        Birthday: formData.Birthday.toISOString().split('T')[0],
        role: formData.role
      };

       await axios.post(`${API_BASE_URL}/auth/register`, userData, {
        headers: { 'Content-Type': 'application/json' }
      });

      toast.success('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);

    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        toast.error(err.response?.data?.message || 'Registration failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              <h2 className="fw-bold text-center text-primary mb-4">Create Your Account</h2>

              <form onSubmit={handleSubmit} noValidate>

                {/* Username */}
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    name="Username"
                    className={`form-control ${errors.Username ? 'is-invalid' : ''}`}
                    value={formData.Username}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.Username}</div>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.email}</div>
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="Password"
                    className={`form-control ${errors.Password ? 'is-invalid' : ''}`}
                    value={formData.Password}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.Password}</div>
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.confirmPassword}</div>
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    name="Phone"
                    className={`form-control ${errors.Phone ? 'is-invalid' : ''}`}
                    value={formData.Phone}
                    onChange={handleChange}
                    maxLength={8}
                  />
                  <div className="invalid-feedback">{errors.Phone}</div>
                </div>

                {/* CIN */}
                <div className="mb-3">
                  <label className="form-label">CIN</label>
                  <input
                    type="text"
                    name="Cin"
                    className={`form-control ${errors.Cin ? 'is-invalid' : ''}`}
                    value={formData.Cin}
                    onChange={handleChange}
                    maxLength={8}
                  />
                  <div className="invalid-feedback">{errors.Cin}</div>
                </div>

                {/* Birthday */}
                <div className="mb-3">
                  <label className="form-label">Birthday</label>
                  <DatePicker
                    selected={formData.Birthday}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select your birthday"
                    maxDate={new Date()}
                    showYearDropdown
                    scrollableYearDropdown
                    className={`form-control ${errors.Birthday ? 'is-invalid' : ''}`}
                  />
                  {errors.Birthday && (
                    <div className="invalid-feedback d-block">{errors.Birthday}</div>
                  )}
                </div>

                {/* Role */}
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option value="user">User</option>
                    <option value="farmer">Farmer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Register'}
                </button>

                <p className="text-center mt-3">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary">Log in</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

// src/pages/Login.js
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    Password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, Password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', formData);
      localStorage.setItem('user', JSON.stringify(response.data));
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card auth-card shadow">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="auth-title">
                    <FaSignInAlt className="me-2" />
                    Sign In
                  </h2>
                  <p className="text-muted">Access your AgriMarket account</p>
                </div>

                <form onSubmit={onSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      <FaEnvelope className="me-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={email}
                      onChange={onChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="Password" className="form-label">
                      <FaLock className="me-2" />
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="Password"
                      name="Password"
                      value={Password}
                      onChange={onChange}
                      placeholder="Enter your password"
                      minLength="6"
                      required
                    />
                  </div>

                  <div className="d-grid mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={loading}
                    >
                      {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="mb-0">
                      Don't have an account?{' '}
                      <Link to="/Register" className="text-decoration-none">
                        Register here
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

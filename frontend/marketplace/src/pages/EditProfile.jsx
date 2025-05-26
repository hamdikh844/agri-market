import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    Phone: '',
    Cin: '',
    Birthday: '',
    profileImage: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const API_BASE_URL = 'http://localhost:5001/api';

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.warning('Please login first');
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = res.data;
        setFormData({
          name: user.name || '',
          email: user.email || '',
          Phone: user.Phone || '',
          Cin: user.Cin || '',
          Birthday: user.Birthday ? user.Birthday.split('T')[0] : '',
          profileImage: user.profileImage || '',
        });
      } catch (err) {
        toast.error('Failed to load user data');
        navigate('/profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Unauthorized');
      return;
    }

    try {
      await axios.put(`${API_BASE_URL}/auth/updateProfile`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Profile updated successfully');
      navigate('/profile');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h3 className="mb-4 text-center">Edit Your Profile</h3>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            name="Phone"
            value={formData.Phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">CIN</label>
          <input
            type="text"
            className="form-control"
            name="Cin"
            value={formData.Cin}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Birthday</label>
          <input
            type="date"
            className="form-control"
            name="Birthday"
            value={formData.Birthday}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Profile Image URL</label>
          <input
            type="text"
            className="form-control"
            name="profileImage"
            value={formData.profileImage}
            onChange={handleChange}
          />
        </div>

        {formData.profileImage && (
          <div className="text-center mb-3">
            <img
              src={formData.profileImage}
              alt="Preview"
              className="rounded-circle border"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;

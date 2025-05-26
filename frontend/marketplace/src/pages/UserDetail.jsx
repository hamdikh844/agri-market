import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const API_BASE_URL = 'http://localhost:5001/api';

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.warning('Please login first');
          navigate('/login');
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/auth/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUser(response.data?.data || response.data);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to fetch user details');
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          navigate('/profile');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate]);

  const formatField = (value) => value || 'N/A';
  const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : 'N/A');

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-5">
        <h4>User not found</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/profile')}>
          Back to Profile
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="card mx-auto shadow p-4" style={{ maxWidth: '500px' }}>
        <div className="text-center">
          <img
            src={user.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.Username || user.name)}&background=random`}
            alt={user.Username || user.name}
            className="rounded-circle border mb-3"
            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
          />
          <h4 className="mb-1">{formatField(user.Username || user.name)}</h4>
          <p className="text-muted">{formatField(user.email)}</p>
          <span className={`badge fs-6 bg-${user.role === 'admin' ? 'danger' : user.role === 'farmer' ? 'success' : 'primary'}`}>
            {user.role?.toUpperCase()}
          </span>
        </div>

        <hr />

        <div className="mt-3">
          <p><strong>📞 Phone:</strong> {formatField(user.Phone)}</p>
          
          <p><strong>🎂 Birthday:</strong> {formatDate(user.Birthday)}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Profile.css'; // optional for extra custom styles

const Profile = () => {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const API_BASE_URL = 'http://localhost:5001/api';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.warning('Please login to view your profile');
          navigate('/login');
          return;
        }

        const userResponse = await axios.get(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userResponse.data);

        const usersResponse = await axios.get(`${API_BASE_URL}/auth/getAll`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllUsers(usersResponse.data.data);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to fetch data');
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const goToUserProfile = (id) => {
    navigate(`/user/${id}`);
  };

  if (isLoading) {
    return (
      <div className="loading-screen d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        {/* Sidebar */}
        <nav className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark text-white min-vh-100 d-flex flex-column">
          <div className="p-3">
            <h4 className="text-white mb-4">Dashboard</h4>
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="nav-item mb-3">
                <button
                  className="btn btn-sm btn-outline-light w-100"
                  onClick={() => navigate('/EditProfile')}
                >
                  Edit Profile
                </button>
              </li>
              {user?.role === 'farmer' && (
                <li className="nav-item mb-3">
                  <button
                    className="btn btn-sm btn-outline-success w-100"
                    onClick={() => navigate('/my-farm')}
                  >
                    Manage Farm
                  </button>
                </li>
              )}
              <li className="nav-item mb-3">
                <button
                  className="btn btn-sm btn-outline-primary w-100"
                  onClick={() => navigate('/products')}
                >
                  Browse Products
                </button>
              </li>
              <li className="nav-item mb-3">
                <button
                  className="btn btn-sm btn-outline-secondary w-100"
                  onClick={() => navigate('/change-password')}
                >
                  Change Password
                </button>
              </li>
              <li className="nav-item mt-auto">
                <button className="btn btn-sm btn-danger w-100" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main content */}
        <main className="col py-4">
          {/* Current User Card */}
          <div className="card shadow-sm mb-4 mx-auto" style={{ maxWidth: '400px' }}>
            <div className="card-body text-center">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                alt="Profile"
                className="rounded-circle border border-primary mb-3"
                style={{ width: '120px', height: '120px', cursor: 'default', objectFit: 'cover' }}
              />
              <h3 className="mb-1">{user.name}</h3>
              <p className="text-muted mb-2">{user.email}</p>
              <span
                className={`badge fs-6 bg-${
                  user.role === 'farmer' ? 'success' : user.role === 'admin' ? 'danger' : 'primary'
                }`}
              >
                {user.role.toUpperCase()}
              </span>
            </div>
          </div>

          {/* All Users Grid */}
          <div>
            <h5 className="mb-3 text-primary">All Users</h5>
            {allUsers.length === 0 ? (
              <p>No users found.</p>
            ) : (
              <div className="row g-4">
                {allUsers.map((u) => (
                  <div key={u._id} className="col-6 col-md-4 col-lg-3">
                    <div
                      className="card shadow-sm h-100 text-center user-card"
                      onClick={() => goToUserProfile(u._id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') goToUserProfile(u._id);
                      }}
                      style={{ cursor: 'pointer', transition: 'transform 0.2s ease' }}
                    >
                      <div className="card-body">
                        <img
                          src={u.profileImage || 'https://via.placeholder.com/150'}
                          alt={u.Username || u.name}
                          className="rounded-circle mb-3 border border-secondary"
                          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        />
                        <h6 className="mb-1">{u.Username || u.name}</h6>
                        <p className="text-muted small mb-2 text-truncate">{u.email}</p>
                        <span
                          className={`badge bg-${
                            u.role === 'admin' ? 'danger' : u.role === 'farmer' ? 'success' : 'secondary'
                          }`}
                        >
                          {u.role.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;

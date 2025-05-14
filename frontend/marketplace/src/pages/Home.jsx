import { Link } from 'react-router-dom';
import { FaCarrot, FaAppleAlt, FaBreadSlice, FaCheese, FaTractor } from 'react-icons/fa';

export default function Home() {
  const categories = [
    { 
      name: 'Vegetables', 
      icon: <FaCarrot className="fs-1" />, 
      color: 'text-success',
      image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'Fruits', 
      icon: <FaAppleAlt className="fs-1" />, 
      color: 'text-danger',
      image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'Grains', 
      icon: <FaBreadSlice className="fs-1" />, 
      color: 'text-warning',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'Dairy', 
      icon: <FaCheese className="fs-1" />, 
      color: 'text-info',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'Machinery', 
      icon: <FaTractor className="fs-1" />, 
      color: 'text-primary',
      image: 'https://images.unsplash.com/photo-1585011650347-c59dbef5a823?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section bg-success bg-gradient text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">Fresh Farm Products <br />Direct to Your Door</h1>
              <p className="lead mb-4">Connecting local farmers with consumers for fresh, affordable, and sustainable agriculture.</p>
              <div className="d-flex gap-3">
                <Link to="/products" className="btn btn-light btn-lg px-4 rounded-pill">
                  <i className="fas fa-shopping-basket me-2"></i> Shop Now
                </Link>
                <Link to="/sell" className="btn btn-outline-light btn-lg px-4 rounded-pill">
                  <i className="fas fa-tractor me-2"></i> Sell Products
                </Link>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <img 
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Farm produce" 
                className="img-fluid rounded shadow" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Shop by Category</h2>
          <div className="row g-4">
            {categories.map((category, index) => (
              <div key={index} className="col-6 col-md-4 col-lg-2">
                <Link 
                  to={`/category/${category.name.toLowerCase()}`} 
                  className="card category-card h-100 border-0 shadow-sm text-decoration-none text-dark text-center p-3 hover-effect"
                >
                  <div className={`${category.color} mb-3`}>
                    {category.icon}
                  </div>
                  <h5 className="mb-0">{category.name}</h5>
                  <div className="category-image-container mt-3">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="img-fluid rounded" 
                      style={{ height: '100px', width: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h2 className="fw-bold mb-0">Featured Products</h2>
            <Link to="/products" className="btn btn-outline-success">
              View All <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>
          <div className="row g-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="col-md-6 col-lg-3">
                <div className="card product-card h-100 border-0 shadow-sm overflow-hidden">
                  <div className="position-relative">
                    <img 
                      src={`https://source.unsplash.com/random/300x200?agriculture,${item}`} 
                      className="card-img-top" 
                      alt="Product" 
                      style={{ height: '200px', objectFit: 'cover' }} 
                    />
                    <div className="badge bg-success position-absolute top-0 end-0 m-2">Fresh</div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Organic Product {item}</h5>
                    <p className="text-muted small mb-2">From Local Farm {item}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="mb-0 text-success">${(item * 2.5).toFixed(2)}</h6>
                      <button className="btn btn-sm btn-outline-success">
                        <i className="fas fa-cart-plus"></i> Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rest of your existing sections... */}
    </div>
  );
}
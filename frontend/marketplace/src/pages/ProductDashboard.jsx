import React from 'react';
import { Link } from 'react-router-dom';
import { FaAppleAlt, FaTractor, FaCarrot, FaBreadSlice, FaCheese } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDashboard = () => {
  const categories = [
    {
      name: 'Fruits',
      icon: <FaAppleAlt className="text-danger" size={24} />,
      link: '/products/create/fruit',
      description: 'Add fresh fruits, seasonal produce, and exotic varieties'
    },
    {
      name: 'Machinery',
      icon: <FaTractor className="text-primary" size={24} />,
      link: '/products/create/machinery',
      description: 'List farming equipment, tools, and agricultural machines'
    },
    {
      name: 'Vegetables',
      icon: <FaCarrot className="text-warning" size={24} />,
      link: '/products/create/vegetables',
      description: 'Add organic vegetables, leafy greens, and root crops'
    },
    {
      name: 'Grains',
      icon: <FaBreadSlice className="text-info" size={24} />,
      link: '/products/create/grains',
      description: 'List cereals, pulses, wheat, rice, and other staples'
    },
    {
      name: 'Dairy',
      icon: <FaCheese className="text-success" size={24} />,
      link: '/products/create/dairy',
      description: 'Add milk products, cheeses, butter, and dairy alternatives'
    }
  ];

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-dark mb-3">
            Agricultural Product Management
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Select a category to add new products to your marketplace
          </p>
        </div>

        {/* Category Cards */}
        <div className="row g-4">
          {categories.map((category, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <Link
                to={category.link}
                className="card h-100 text-decoration-none shadow-sm hover-shadow transition-all"
              >
                <div className="card-body text-center d-flex flex-column">
                  <div className="icon-wrapper mx-auto mb-3 bg-light p-3 rounded-circle">
                    {category.icon}
                  </div>
                  <h3 className="h5 card-title text-dark mb-2">{category.name}</h3>
                  <p className="card-text text-muted small mb-4 flex-grow-1">
                    {category.description}
                  </p>
                  <button className="btn btn-outline-success align-self-center">
                    Add Product
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="card shadow-sm mt-5">
          <div className="card-body">
            <h2 className="h5 card-title mb-4">Quick Actions</h2>
            <div className="d-flex flex-column flex-sm-row gap-3">
              <Link
                to="/products"
                className="btn btn-outline-secondary flex-grow-1"
              >
                View All Products
              </Link>
              <Link
                to="/products/create"
                className="btn btn-success flex-grow-1"
              >
                Create Generic Product
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap JS Bundle with Popper */}
  
    </div>
  );
};

export default ProductDashboard;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa'; // Removed unused FaUpload
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const MachineryProductPage = () => {
  const navigate = useNavigate();
  
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: 1,
    category: 'Machinery',
    model: '',
    horsepower: '',
    year: '',
    condition: 'New'
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    setPreviews([...previews, ...newPreviews]);
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    const newPreviews = [...previews];
    const newImages = [...images];
    newPreviews.splice(index, 1);
    newImages.splice(index, 1);
    setPreviews(newPreviews);
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      Object.entries(product).forEach(([key, value]) => {
        formData.append(key, value);
      });
      images.forEach(image => {
        formData.append('images', image);
      });

      await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate('/products', { state: { success: 'Machinery product created successfully!' } });
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create machinery product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="h4 mb-0">Create New Machinery Product</h2>
            </div>
            
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <h3 className="h5 mb-3 text-muted">Equipment Details</h3>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">Equipment Name*</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g., John Deere Tractor"
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label htmlFor="model" className="form-label">Model Number*</label>
                      <input
                        type="text"
                        className="form-control"
                        id="model"
                        name="model"
                        value={product.model}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="col-md-4">
                      <label htmlFor="horsepower" className="form-label">Horsepower*</label>
                      <input
                        type="number"
                        className="form-control"
                        id="horsepower"
                        name="horsepower"
                        value={product.horsepower}
                        onChange={handleChange}
                        min="0"
                        required
                      />
                    </div>
                    
                    <div className="col-md-4">
                      <label htmlFor="year" className="form-label">Manufacturing Year*</label>
                      <input
                        type="number"
                        className="form-control"
                        id="year"
                        name="year"
                        value={product.year}
                        onChange={handleChange}
                        min="1900"
                        max={new Date().getFullYear()}
                        required
                      />
                    </div>
                    
                    <div className="col-md-4">
                      <label htmlFor="condition" className="form-label">Condition*</label>
                      <select
                        className="form-select"
                        id="condition"
                        name="condition"
                        value={product.condition}
                        onChange={handleChange}
                        required
                      >
                        <option value="New">New</option>
                        <option value="Used">Used</option>
                        <option value="Refurbished">Refurbished</option>
                      </select>
                    </div>
                    
                    <div className="col-md-6">
                      <label htmlFor="price" className="form-label">Price (USD)*</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                          type="number"
                          className="form-control"
                          id="price"
                          name="price"
                          min="0"
                          step="0.01"
                          value={product.price}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <label htmlFor="quantity" className="form-label">Quantity Available*</label>
                      <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        name="quantity"
                        min="1"
                        value={product.quantity}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="col-12">
                      <label htmlFor="description" className="form-label">Description*</label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="3"
                        value={product.description}
                        onChange={handleChange}
                        required
                        placeholder="Include specifications, features, hours of use (if used), etc."
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                {/* Image Upload Section */}
                <div className="mb-4">
                  <h3 className="h5 mb-3 text-muted">Equipment Images</h3>
                  <div className="mb-3">
                    <label htmlFor="images" className="form-label">Upload Images (Max 5)*</label>
                    <input
                      type="file"
                      className="form-control"
                      id="images"
                      name="images"
                      onChange={handleImageChange}
                      multiple
                      accept="image/*"
                      required
                    />
                    <div className="form-text">Show the equipment from different angles</div>
                  </div>
                  
                  {previews.length > 0 && (
                    <div className="row g-2">
                      {previews.map((preview, index) => (
                        <div key={index} className="col-6 col-md-4 col-lg-3">
                          <div className="position-relative">
                            <img
                              src={preview.url}
                              alt={`Preview ${index}`}
                              className="img-thumbnail"
                              style={{ height: '100px', width: '100%', objectFit: 'cover' }}
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 rounded-circle"
                              style={{ width: '24px', height: '24px', padding: '0' }}
                            >
                              <FaTimes size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="btn btn-outline-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating...' : 'Create Machinery Listing'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineryProductPage;
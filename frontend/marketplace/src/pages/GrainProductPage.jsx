import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const GrainProductPage = () => {
  const navigate = useNavigate();
  
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: 1,
    category: 'Grains',
    type: '',
    moisture_content: '',
    protein_content: '',
    origin: ''
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const grainTypes = ['Wheat', 'Rice', 'Corn', 'Barley', 'Oats', 'Quinoa', 'Millet'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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

      navigate('/products', { state: { success: 'Grain product created successfully!' } });
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create grain product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-warning text-white">
              <h2 className="h4 mb-0">Create New Grain Product</h2>
            </div>
            
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <h3 className="h5 mb-3 text-muted">Grain Details</h3>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">Grain Name*</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Organic Whole Wheat"
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label htmlFor="type" className="form-label">Grain Type*</label>
                      <select
                        className="form-select"
                        id="type"
                        name="type"
                        value={product.type}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select type</option>
                        {grainTypes.map((type, index) => (
                          <option key={index} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="col-md-4">
                      <label htmlFor="moisture_content" className="form-label">Moisture Content (%)*</label>
                      <input
                        type="number"
                        className="form-control"
                        id="moisture_content"
                        name="moisture_content"
                        value={product.moisture_content}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        step="0.1"
                        required
                      />
                    </div>
                    
                    <div className="col-md-4">
                      <label htmlFor="protein_content" className="form-label">Protein Content (%)*</label>
                      <input
                        type="number"
                        className="form-control"
                        id="protein_content"
                        name="protein_content"
                        value={product.protein_content}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        step="0.1"
                        required
                      />
                    </div>
                    
                    <div className="col-md-4">
                      <label htmlFor="origin" className="form-label">Country of Origin*</label>
                      <input
                        type="text"
                        className="form-control"
                        id="origin"
                        name="origin"
                        value={product.origin}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label htmlFor="price" className="form-label">Price (per kg/lb)*</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                          type="number"
                          className="form-control"
                          id="price"
                          name="price"
                          value={product.price}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
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
                        value={product.quantity}
                        onChange={handleChange}
                        min="1"
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
                        placeholder="Describe the grain quality, processing method, etc."
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="h5 mb-3 text-muted">Product Images</h3>
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
                    <div className="form-text">Show the grain quality and packaging</div>
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
                    className="btn btn-warning"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating...' : 'Create Grain Product'}
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

export default GrainProductPage;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DairyProductPage = () => {
  const navigate = useNavigate();
  
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: 1,
    category: 'Dairy',
    type: '',
    expiry_date: '',
    storage_temp: '',
    fat_content: ''
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [today] = useState(new Date().toISOString().split('T')[0]);

  const dairyTypes = ['Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream', 'Ice Cream'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    const newPreviews = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    setPreviews([...previews, ...newPreviews]);
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(previews[index].url);
    const newPreviews = [...previews];
    const newImages = [...images];
    newPreviews.splice(index, 1);
    newImages.splice(index, 1);
    setPreviews(newPreviews);
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (images.length === 0) {
      alert('Please upload at least one image');
      return;
    }

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

      navigate('/products', { state: { success: 'Dairy product created successfully!' } });
    } catch (error) {
      console.error('Error creating product:', error);
      alert(`Failed to create dairy product: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      previews.forEach(preview => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-info text-white">
              <h2 className="h4 mb-0">Create New Dairy Product</h2>
            </div>
            
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <h3 className="h5 mb-3 text-muted">Dairy Details</h3>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">Product Name*</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Organic Whole Milk"
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label htmlFor="type" className="form-label">Dairy Type*</label>
                      <select
                        className="form-select"
                        id="type"
                        name="type"
                        value={product.type}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select type</option>
                        {dairyTypes.map((type, index) => (
                          <option key={index} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="col-md-4">
                      <label htmlFor="expiry_date" className="form-label">Expiry Date*</label>
                      <input
                        type="date"
                        className="form-control"
                        id="expiry_date"
                        name="expiry_date"
                        value={product.expiry_date}
                        onChange={handleChange}
                        min={today}
                        required
                      />
                    </div>
                    
                    <div className="col-md-4">
                      <label htmlFor="storage_temp" className="form-label">Storage Temp (°C)*</label>
                      <input
                        type="number"
                        className="form-control"
                        id="storage_temp"
                        name="storage_temp"
                        value={product.storage_temp}
                        onChange={handleChange}
                        min="-20"
                        max="20"
                        required
                        placeholder="e.g., 4"
                      />
                    </div>
                    
                    <div className="col-md-4">
                      <label htmlFor="fat_content" className="form-label">Fat Content (%)</label>
                      <input
                        type="number"
                        className="form-control"
                        id="fat_content"
                        name="fat_content"
                        value={product.fat_content}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        step="0.1"
                        placeholder="e.g., 3.5"
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label htmlFor="price" className="form-label">Price ($)*</label>
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
                      <label htmlFor="quantity" className="form-label">Quantity*</label>
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
                        placeholder="Describe the product features, benefits, etc."
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
                    <div className="form-text">Show the product packaging and details</div>
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
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-info text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating...
                      </>
                    ) : (
                      'Create Dairy Product'
                    )}
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

export default DairyProductPage;
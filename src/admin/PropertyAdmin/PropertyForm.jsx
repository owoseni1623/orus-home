import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './PropertyForm.module.css';
import { API_URL } from '../../config/env';

const PropertyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    type: '',
    yearBuilt: '',
    features: [''],
    images: [],
    isAvailable: true
  });

  // Get token from localStorage
  const getAuthToken = () => localStorage.getItem('token');

  // Axios config with auth header
  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json'
    },
    withCredentials: true
  };

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  const fetchProperty = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/properties/${id}`,
        axiosConfig
      );
      setFormData(response.data);
    } catch (error) {
      toast.error('Error fetching property details');
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        navigate('/admin/properties');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayField = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();
    
    files.forEach(file => {
      formData.append('images', file);
    });
  
    try {
      const response = await axios.post(
        `${API_URL}/upload/properties`, 
        formData,
        {
          ...axiosConfig,
          headers: {
            ...axiosConfig.headers,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
  
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...response.data.urls]
      }));
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.response?.data?.message || 'Error uploading images');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const endpoint = `${API_URL}/properties${id ? `/${id}` : ''}`;
      const method = id ? 'put' : 'post';
      
      // Clean up empty values in arrays and ensure features is already an array
      const cleanedFormData = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== ''),
        // Ensure numbers are sent as numbers
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        yearBuilt: formData.yearBuilt ? Number(formData.yearBuilt) : undefined
      };
  
      const response = await axios[method](
        endpoint,
        cleanedFormData,
        axiosConfig
      );
  
      toast.success(`Property ${id ? 'updated' : 'created'} successfully`);
      navigate('/admin/properties');
    } catch (error) {
      console.error('Error saving property:', error);
      if (error.response?.status === 401) {
        toast.error('Please login to continue');
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || `Error ${id ? 'updating' : 'creating'} property`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer_pro011}>
      <h1 className={styles.formTitle_pro011}>
        {id ? 'Edit Property' : 'Add New Property'}
      </h1>

      <form onSubmit={handleSubmit} className={styles.form_pro011}>
        <div className={styles.formGrid_pro011}>
          <div className={styles.formSection_pro011}>
            <div className={styles.formGroup_pro011}>
              <label className={styles.inputLabel_pro011}>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={styles.inputField_pro011}
                required
              />
            </div>

            <div className={styles.formGroup_pro011}>
              <label className={styles.inputLabel_pro011}>Price (₦)</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={styles.inputField_pro011}
                required
              />
            </div>

            <div className={styles.formGroup_pro011}>
              <label className={styles.inputLabel_pro011}>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={styles.inputField_pro011}
                required
              />
            </div>

            <div className={styles.formGroup_pro011}>
              <label className={styles.inputLabel_pro011}>Property Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={styles.selectField_pro011}
                required
              >
                <option value="">Select Property Type</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Land">Land</option>
                <option value="Duplex">Duplex</option>
                <option value="Apartment">Apartment</option>
                <option value="Penthouse">Penthouse</option>
              </select>
            </div>

            <div className={styles.formGroup_pro011}>
              <label className={styles.inputLabel_pro011}>Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className={styles.inputField_pro011}
                required
                min="0"
              />
            </div>

            <div className={styles.formGroup_pro011}>
              <label className={styles.inputLabel_pro011}>Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className={styles.inputField_pro011}
                required
                min="0"
              />
            </div>

            <div className={styles.formGroup_pro011}>
              <label className={styles.inputLabel_pro011}>Area</label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className={styles.inputField_pro011}
                required
                placeholder="e.g., 500 sq m"
              />
            </div>

            <div className={styles.formGroup_pro011}>
              <label className={styles.inputLabel_pro011}>Year Built</label>
              <input
                type="number"
                name="yearBuilt"
                value={formData.yearBuilt}
                onChange={handleChange}
                className={styles.inputField_pro011}
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>

            <div className={styles.formGroup_pro011}>
              <label className={styles.checkboxLabel_pro011}>
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                  className={styles.checkboxField_pro011}
                />
                <span className={styles.checkboxText_pro011}>Available for Purchase</span>
              </label>
            </div>
          </div>

          <div className={styles.formSection_pro011}>
            <div className={styles.formGroup_pro011}>
              <label className={styles.inputLabel_pro011}>Features</label>
              <div className={styles.arrayContainer_pro011}>
                {formData.features.map((feature, index) => (
                  <div key={index} className={styles.arrayField_pro011}>
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleArrayChange(index, 'features', e.target.value)}
                      className={styles.arrayInput_pro011}
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayField('features', index)}
                      className={styles.removeButton_pro011}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('features')}
                  className={styles.addButton_pro011}
                >
                  Add Feature
                </button>
              </div>
            </div>

            <div className={styles.formGroup_pro011}>
              <label className={styles.inputLabel_pro011}>Images</label>
              <div className={styles.imageUploadContainer_pro011}>
                <input
                  type="file"
                  multiple
                  onChange={handleImageUpload}
                  className={styles.fileInput_pro011}
                  accept="image/*"
                />
                <div className={styles.imageGrid_pro011}>
                  {formData.images.map((image, index) => (
                    <div key={index} className={styles.imageContainer_pro011}>
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className={styles.previewImage_pro011}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== index)
                          }));
                        }}
                        className={styles.imageDeleteButton_pro011}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.formActions_pro011}>
          <button
            type="button"
            onClick={() => navigate('/admin/properties')}
            className={styles.cancelButton_pro011}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton_pro011}
          >
            {loading ? 'Saving...' : id ? 'Update Property' : 'Create Property'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
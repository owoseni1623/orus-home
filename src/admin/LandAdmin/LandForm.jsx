import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './LandForm.module.css';
import { API_URL } from '../../config/env';

const LandForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    area: '',
    type: '',
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
      fetchLand();
    }
  }, [id]);

  const fetchLand = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/lands/${id}`,
        axiosConfig
      );
      setFormData(response.data);
    } catch (error) {
      toast.error('Error fetching land details');
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        navigate('/admin/lands');
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
    
    // Create local preview URLs for immediate display
    const localPreviewUrls = files.map(file => URL.createObjectURL(file));
    
    // Update form state with local preview URLs
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...localPreviewUrls]
    }));
  
    // Prepare FormData for server upload
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });
  
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/upload/lands`,
        formData,
        {
          ...axiosConfig,
          headers: {
            ...axiosConfig.headers,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      // Replace local preview URLs with actual server URLs
      setFormData(prev => ({
        ...prev,
        images: prev.images.map((img, index) => 
          img.startsWith('blob:') ? response.data.urls[index] : img
        )
      }));
      
      toast.success('Images uploaded successfully');
    } catch (error) {
      // Remove local preview URLs on upload failure
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter(img => !img.startsWith('blob:'))
      }));
      
      toast.error('Error uploading images');
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const method = id ? 'put' : 'post';
      const url = id ? `${API_URL}/lands/${id}` : `${API_URL}/lands`;
      
      // Clean up the form data
      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
        area: formData.area?.toString(),
        features: formData.features.filter(feature => feature.trim() !== ''),
        images: formData.images || [],
        isAvailable: Boolean(formData.isAvailable)
      };
  
      console.log('Submitting data:', submitData); // Debug log
      
      const response = await axios[method](url, submitData, axiosConfig);
      
      console.log('Server response:', response.data); // Debug log
      
      toast.success(`Land ${id ? 'updated' : 'created'} successfully`);
      navigate('/admin/lands');
    } catch (error) {
      console.error('Submission error:', error.response?.data || error);
      toast.error(error.response?.data?.message || 'Error submitting form');
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>{id ? 'Edit' : 'Add'} Land Listing</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="area">Area (sq ft)</label>
          <input
            type="number"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className={styles.select}
          >
            <option value="">Select Type</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="agricultural">Agricultural</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Features</label>
          {formData.features.map((feature, index) => (
            <div key={index} className={styles.arrayField}>
              <input
                type="text"
                value={feature}
                onChange={(e) => handleArrayChange(index, 'features', e.target.value)}
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => removeArrayField('features', index)}
                className={styles.removeButton}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField('features')}
            className={styles.addButton}
          >
            Add Feature
          </button>
        </div>

        <div className={styles.formGroup}>
          <label>Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            accept="image/*"
            className={styles.fileInput}
          />
          <div className={styles.imagePreview}>
            {formData.images.map((image, index) => (
              <div key={index} className={styles.imageContainer}>
                <img src={image} alt={`Preview ${index + 1}`} />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className={styles.removeImageButton}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
            />
            Available for Sale
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? 'Saving...' : (id ? 'Update' : 'Create')} Land Listing
        </button>
      </form>
    </div>
  );
};

export default LandForm;
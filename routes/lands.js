const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { 
  getLands, 
  getLand, 
  createLand, 
  updateLand, 
  deleteLand,
  searchLands,
  fixImagePaths
} = require('../controllers/landController');
const { protect, authorize } = require('../middleware/auth');

// Configure storage for land images
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/lands');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      console.error('Error creating directory:', error);
      cb(error);
    }
  },
  filename: function (req, file, cb) {
    // Create a clean, safe filename
    const sanitizedName = path.basename(file.originalname).replace(/[^a-zA-Z0-9.-]/g, '-');
    const filename = `${Date.now()}-${sanitizedName}`;
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|webp|avif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// Routes
router.route('/')
  .get(getLands)
  .post(protect, authorize('admin'), createLand);

router.route('/search')
  .get(searchLands);

router.route('/fix-image-paths')
  .get(protect, authorize('admin'), fixImagePaths);

// Add a dedicated upload route
router.post(
  '/upload-images',
  protect, 
  authorize('admin'),
  upload.array('images', 5),
  async (req, res) => {
    try {
      const uploadedFiles = req.files.map(file => file.filename);
      
      res.status(200).json({
        success: true,
        data: uploadedFiles
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({
        success: false,
        message: 'Error uploading images',
        error: error.message
      });
    }
  }
);

router.route('/:id')
  .get(getLand)
  .put(protect, authorize('admin'), updateLand)
  .delete(protect, authorize('admin'), deleteLand);

module.exports = router;
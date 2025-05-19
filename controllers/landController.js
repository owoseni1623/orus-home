const Land = require('../models/Land');
const asyncHandler = require('express-async-handler');
const path = require('path');

// Helper function to clean price
const cleanPrice = (price) => {
  if (typeof price === 'string') {
    return Number(price.replace(/[^0-9.-]+/g, ''));
  }
  return price;
};

// @desc    Get all land properties
// @route   GET /api/lands
exports.getLands = asyncHandler(async (req, res) => {
  const lands = await Land.find().sort('-createdAt');
  
  // Process image paths correctly for frontend use
  const processedLands = lands.map(land => {
    const processedLand = land.toObject(); // Convert to plain object
    if (processedLand.images) {
      // Don't modify the actual paths, just ensure they're properly formatted
      processedLand.images = processedLand.images.map(imagePath => {
        // Just return the filename, the frontend will construct the full URL
        return imagePath.replace(/\\/g, '/').split('/').pop();
      });
    }
    return processedLand;
  });
  
  res.json(processedLands);
});

// @desc    Get single land property
// @route   GET /api/lands/:id
exports.getLand = asyncHandler(async (req, res) => {
  const land = await Land.findById(req.params.id);
  
  if (!land) {
    res.status(404);
    throw new Error('Land property not found');
  }

  // Process image paths correctly for frontend use
  const processedLand = land.toObject();
  if (processedLand.images) {
    processedLand.images = processedLand.images.map(imagePath => {
      // Just return the filename, the frontend will construct the full URL
      return imagePath.replace(/\\/g, '/').split('/').pop();
    });
  }
  
  res.json(processedLand);
});

// @desc    Create land property
// @route   POST /api/lands
exports.createLand = asyncHandler(async (req, res) => {
  console.log('Received data:', req.body); // Debug log

  const {
    title,
    price,
    location,
    area,
    type,
    features,
    images,
    isAvailable
  } = req.body;

  // Clean the data
  const cleanValue = (value) => {
    // Remove extra quotes and trim
    if (typeof value === 'string') {
      return value.replace(/^["']|["']$/g, '').trim();
    }
    return value;
  };

  // Prepare the land data
  const landData = {
    title: cleanValue(title),
    price: typeof price === 'string' ? parseFloat(cleanValue(price)) : price,
    location: cleanValue(location),
    size: cleanValue(area?.toString()), // Convert area to string for size field
    type: cleanValue(type),
    features: Array.isArray(features) 
      ? features.map(cleanValue).filter(f => f) 
      : [], // Remove empty values and clean
    images: Array.isArray(images) 
      ? images.map(img => {
          // Store just the filename for consistency
          return cleanValue(img).split('/').pop();
        })
      : [],
    isAvailable: Boolean(isAvailable)
  };

  console.log('Processed data:', landData); // Debug log

  const land = await Land.create(landData);
  res.status(201).json({
    success: true,
    data: land
  });
});

// @desc    Update land property
// @route   PUT /api/lands/:id
exports.updateLand = asyncHandler(async (req, res) => {
  let land = await Land.findById(req.params.id);
  if (!land) {
    res.status(404);
    throw new Error('Land property not found');
  }

  // Clean price if it's being updated
  if (req.body.price) {
    req.body.price = cleanPrice(req.body.price);
  }

  // Process images if they're being updated
  if (req.body.images) {
    req.body.images = req.body.images.map(img => {
      // Store just the filename for consistency
      return img.replace(/^["']|["']$/g, '').split('/').pop();
    });
  }

  land = await Land.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    data: land
  });
});

// @desc    Delete land property
// @route   DELETE /api/lands/:id
exports.deleteLand = asyncHandler(async (req, res) => {
  const land = await Land.findById(req.params.id);
  if (!land) {
    res.status(404);
    throw new Error('Land property not found');
  }
  await land.deleteOne();
  res.json({
    success: true,
    message: 'Land property removed'
  });
});

// @desc    Search land properties
// @route   GET /api/lands/search
exports.searchLands = asyncHandler(async (req, res) => {
  const { minPrice, maxPrice, location, size } = req.query;
  let query = {};

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = cleanPrice(minPrice);
    if (maxPrice) query.price.$lte = cleanPrice(maxPrice);
  }

  if (location) {
    query.location = { $regex: location, $options: 'i' };
  }

  if (size) {
    query.size = { $regex: size, $options: 'i' };
  }

  const lands = await Land.find(query).sort('-createdAt');
  
  // Process the images paths for the frontend
  const processedLands = lands.map(land => {
    const processedLand = land.toObject();
    if (processedLand.images) {
      processedLand.images = processedLand.images.map(imagePath => {
        // Just return the filename for the frontend to construct the full URL
        return imagePath.replace(/\\/g, '/').split('/').pop();
      });
    }
    return processedLand;
  });
  
  res.json(processedLands);
});

// @desc    Fix image paths in database
// @route   GET /api/lands/fix-image-paths
exports.fixImagePaths = asyncHandler(async (req, res) => {
  const lands = await Land.find({});
  let updatedCount = 0;

  for (let land of lands) {
    if (land.images && land.images.length > 0) {
      const fixedImages = land.images.map(imagePath => {
        // Store just the filename for consistency
        return imagePath.replace(/\\/g, '/').split('/').pop();
      });

      await Land.findByIdAndUpdate(land._id, { images: fixedImages });
      updatedCount++;
    }
  }

  res.json({
    success: true,
    message: `Updated ${updatedCount} land records with fixed image paths`
  });
});

module.exports = exports;
const Organizer = require('../models/Organizer');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// @desc    Register a new organizer
// @route   POST /api/auth/organizer/register
// @access  Public
exports.registerOrganizer = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, company } = req.body;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    // Check if organizer already exists
    let organizer = await Organizer.findOne({ email });
    if (organizer) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Create organizer
    organizer = await Organizer.create({
      name,
      email,
      password,
      company
    });

    const token = generateToken(organizer._id, 'organizer');

    res.status(201).json({
      success: true,
      token,
      organizer: {
        id: organizer._id,
        name: organizer.name,
        email: organizer.email,
        company: organizer.company
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login organizer
// @route   POST /api/auth/organizer/login
// @access  Public
exports.loginOrganizer = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Check for organizer
    const organizer = await Organizer.findOne({ email }).select('+password');
    if (!organizer) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await organizer.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(organizer._id, 'organizer');

    res.status(200).json({
      success: true,
      token,
      organizer: {
        id: organizer._id,
        name: organizer.name,
        email: organizer.email,
        company: organizer.company
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current organizer profile
// @route   GET /api/auth/organizer/me
// @access  Private
exports.getOrganizerProfile = async (req, res) => {
  try {
    const organizer = await Organizer.findById(req.organizer.id);

    res.status(200).json({
      success: true,
      organizer
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update organizer profile
// @route   PUT /api/auth/organizer/profile
// @access  Private
exports.updateOrganizerProfile = async (req, res) => {
  try {
    const organizer = await Organizer.findByIdAndUpdate(req.organizer.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      organizer
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

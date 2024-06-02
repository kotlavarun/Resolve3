const express = require('express');
const { submitComplaint, getComplaints, respondToComplaint } = require('../controllers/complaintController');
const { protect, adminProtect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, submitComplaint);
router.get('/', adminProtect, getComplaints);
router.put('/respond', adminProtect, respondToComplaint);

module.exports = router;

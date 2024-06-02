const Complaint = require('../models/Complaint');
const User = require('../models/User');

exports.submitComplaint = async (req, res) => {
  const { name, number, issue, address } = req.body;
  const userId = req.user.id;

  try {
    const newComplaint = new Complaint({ name, number, issue, address, user: userId });
    await newComplaint.save();
    res.status(201).json({ msg: 'Complaint submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('user', 'name email');
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.respondToComplaint = async (req, res) => {
  const { complaintId, response } = req.body;

  try {
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) return res.status(404).json({ msg: 'Complaint not found' });

    complaint.response = response;
    complaint.status = 'Resolved';
    await complaint.save();

    res.json({ msg: 'Response submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

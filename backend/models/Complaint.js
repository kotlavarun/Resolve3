const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  issue: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  response: { type: String, default: '' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Complaint', complaintSchema);

// imports ======================================================================================

const mongoose = require("mongoose");

// Embeded Schema(s) ============================================================================

const applicationSchema = new mongoose.Schema({
  comapny: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  note: {
    type: String
  },
  postingLink:{
    type: String
  },
  status: {
    type: String,
    enum: ['interested', 'applied', 'interviewing', 'rejected', 'accepted'],
    required: true
  }
})

// Main Schema ====================================================================================

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  applications: [applicationSchema]
})

// model creation =================================================================================

const User = mongoose.model("User", userSchema);

// exports ========================================================================================

module.exports = User
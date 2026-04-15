import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({

  name: String,
  category: String,
  address: String,
  rating: String,
  phone: String,
  website: String,
  email: String,
  leadScore: String,
  
  jobId: Number,

  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("Lead", leadSchema);
import mongoose from 'mongoose';

const hackathonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  links: {
    type: [String],
  },
  images: {
    type: [String],
  },
  participants: {
    type: String, 
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  start_date: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Hackathon = mongoose.model('Hackathon', hackathonSchema);

export default Hackathon;
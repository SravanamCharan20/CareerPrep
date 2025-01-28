// models/Project.js
import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
  owner: String,
  repo_name: String,
  repo_link: String,
  description: String,
  stars: Number,
});

export default model('Mlproject', projectSchema);
const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
   description: String,
   body: {
    type: String,
    required: true
  },
  tags: [String],
  state: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  read_count: {
    type: Number,
    default: 0
  },
  reading_time: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
} , { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);

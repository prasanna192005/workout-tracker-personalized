const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  dayNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 6
  },
  weekNumber: {
    type: Number,
    required: true,
    min: 1
  },
  completed: {
    type: Boolean,
    default: true
  },
  completedExercises: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

// Create compound index to prevent duplicate entries for same day
progressSchema.index({ date: 1, dayNumber: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);

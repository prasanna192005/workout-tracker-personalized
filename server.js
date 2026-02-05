require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Progress = require('./models/Progress');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files (HTML, CSS, JS)

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// API Routes

// Get all progress
app.get('/api/progress', async (req, res) => {
    try {
        const progress = await Progress.find().sort({ date: -1 });
        res.json(progress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get progress for a specific week
app.get('/api/progress/week/:weekNumber', async (req, res) => {
    try {
        const weekNumber = parseInt(req.params.weekNumber);
        const progress = await Progress.find({ weekNumber }).sort({ dayNumber: 1 });
        res.json(progress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mark a day as complete
app.post('/api/progress', async (req, res) => {
    try {
        const { date, dayNumber, weekNumber } = req.body;

        // Check if already exists
        const existing = await Progress.findOne({
            date: new Date(date),
            dayNumber
        });

        if (existing) {
            return res.status(400).json({ error: 'Day already marked as complete' });
        }

        const progress = new Progress({
            date: new Date(date),
            dayNumber,
            weekNumber,
            completed: true
        });

        await progress.save();
        res.status(201).json(progress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Toggle completion status
app.patch('/api/progress/:id', async (req, res) => {
    try {
        const progress = await Progress.findById(req.params.id);
        if (!progress) {
            return res.status(404).json({ error: 'Progress not found' });
        }

        progress.completed = !progress.completed;
        await progress.save();
        res.json(progress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a progress entry (unmark)
app.delete('/api/progress/:id', async (req, res) => {
    try {
        const progress = await Progress.findByIdAndDelete(req.params.id);
        if (!progress) {
            return res.status(404).json({ error: 'Progress not found' });
        }
        res.json({ message: 'Progress deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Toggle exercise completion
app.post('/api/progress/exercise', async (req, res) => {
    try {
        const { dayNumber, weekNumber, exerciseTitle } = req.body;

        // Find or create progress for this day
        let progress = await Progress.findOne({ dayNumber, weekNumber });

        if (!progress) {
            // Create new progress entry
            progress = new Progress({
                date: new Date(),
                dayNumber,
                weekNumber,
                completed: false,
                completedExercises: [exerciseTitle]
            });
        } else {
            // Toggle exercise in array
            const index = progress.completedExercises.indexOf(exerciseTitle);
            if (index > -1) {
                progress.completedExercises.splice(index, 1);
            } else {
                progress.completedExercises.push(exerciseTitle);
            }
        }

        await progress.save();
        res.json(progress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get exercise completion status for a day
app.get('/api/progress/exercises/:dayNumber/:weekNumber', async (req, res) => {
    try {
        const dayNumber = parseInt(req.params.dayNumber);
        const weekNumber = parseInt(req.params.weekNumber);

        const progress = await Progress.findOne({ dayNumber, weekNumber });

        res.json({
            completedExercises: progress ? progress.completedExercises : []
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get statistics
app.get('/api/stats', async (req, res) => {
    try {
        const totalCompleted = await Progress.countDocuments({ completed: true });
        const thisWeek = await Progress.countDocuments({
            completed: true,
            createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        });

        res.json({
            totalCompleted,
            thisWeek
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

const connectToDatabase = require('./db');
const Progress = require('../models/Progress');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    await connectToDatabase();

    try {
        if (req.method === 'GET') {
            // Get all progress
            const progress = await Progress.find().sort({ date: -1 });
            return res.status(200).json(progress);
        }

        if (req.method === 'POST') {
            // Mark a day as complete
            const { date, dayNumber, weekNumber } = req.body;

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
            return res.status(201).json(progress);
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

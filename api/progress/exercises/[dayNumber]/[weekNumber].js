const connectToDatabase = require('../../db');
const Progress = require('../../../models/Progress');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    await connectToDatabase();

    const { dayNumber, weekNumber } = req.query;

    try {
        if (req.method === 'GET') {
            const progress = await Progress.findOne({
                dayNumber: parseInt(dayNumber),
                weekNumber: parseInt(weekNumber)
            });

            return res.status(200).json({
                completedExercises: progress ? progress.completedExercises : []
            });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

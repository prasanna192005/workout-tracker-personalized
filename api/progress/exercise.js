const connectToDatabase = require('../db');
const Progress = require('../../models/Progress');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
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
        if (req.method === 'POST') {
            // Toggle exercise completion
            const { dayNumber, weekNumber, exerciseTitle } = req.body;

            let progress = await Progress.findOne({ dayNumber, weekNumber });

            if (!progress) {
                progress = new Progress({
                    date: new Date(),
                    dayNumber,
                    weekNumber,
                    completed: false,
                    completedExercises: [exerciseTitle]
                });
            } else {
                const index = progress.completedExercises.indexOf(exerciseTitle);
                if (index > -1) {
                    progress.completedExercises.splice(index, 1);
                } else {
                    progress.completedExercises.push(exerciseTitle);
                }
            }

            await progress.save();
            return res.status(200).json(progress);
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

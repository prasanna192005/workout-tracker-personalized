const connectToDatabase = require('../db');
const Progress = require('../../models/Progress');

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

    const { id } = req.query;

    try {
        if (req.method === 'PATCH') {
            // Toggle completion status
            const progress = await Progress.findById(id);
            if (!progress) {
                return res.status(404).json({ error: 'Progress not found' });
            }

            progress.completed = !progress.completed;
            await progress.save();
            return res.status(200).json(progress);
        }

        if (req.method === 'DELETE') {
            // Delete progress entry
            const progress = await Progress.findByIdAndDelete(id);
            if (!progress) {
                return res.status(404).json({ error: 'Progress not found' });
            }
            return res.status(200).json({ message: 'Progress deleted successfully' });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

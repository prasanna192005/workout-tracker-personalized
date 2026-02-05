# 💪 Workout Tracker

A full-stack workout tracking application with MongoDB database, weekly calendar view, and progress tracking.

## Features

- **Home Screen** with weekly calendar view
- **6-Day Workout Program** (Chest+Triceps, Back+Biceps, Abs, Shoulders+Legs, Full Body, Core)
- **Progress Tracking** - Mark days as complete
- **Week Navigation** - Track multiple weeks
- **Statistics** - View completion stats
- **MongoDB Database** - Persistent data storage
- **Minimal Clean UI** - Simple and professional design

## Tech Stack

- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **API**: REST API

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up MongoDB

**Option A: Local MongoDB**
- Install MongoDB locally
- Make sure MongoDB is running on `mongodb://localhost:27017`

**Option B: MongoDB Atlas (Cloud)**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster
- Get your connection string
- Update `.env` file with your connection string

### 3. Configure Environment Variables

The `.env` file is already created with default values:

```
MONGODB_URI=mongodb://localhost:27017/workout-tracker
PORT=3000
```

If using MongoDB Atlas, update `MONGODB_URI` with your connection string.

### 4. Start the Server

```bash
npm start
```

The server will start on `http://localhost:3000`

### 5. Open the App

Open your browser and go to:
```
http://localhost:3000
```

You'll be redirected to the home screen automatically!

## Usage

### Home Screen
- View current week's workout days
- Click on any day to view workout details
- Click "Mark Complete" to track completion
- Use "Previous" and "Next" buttons to navigate weeks
- View stats: days completed this week and total

### Workout Page
- View all exercises for the selected day
- Click on any exercise to see the GIF in full screen
- Swipe left/right to navigate between exercises
- Click outside the modal or press × to close
- Use the back arrow (←) to return to home

## API Endpoints

- `GET /api/progress` - Get all workout progress
- `GET /api/progress/week/:weekNumber` - Get progress for a specific week
- `POST /api/progress` - Mark a day as complete
- `PATCH /api/progress/:id` - Toggle completion status
- `DELETE /api/progress/:id` - Unmark a day
- `GET /api/stats` - Get statistics

## File Structure

```
folder/
├── models/
│   └── Progress.js          # MongoDB schema
├── gifs/                    # Exercise GIF files
├── server.js                # Express server
├── home.html                # Home screen
├── workout.html             # Workout details page
├── index.html               # Redirect to home
├── package.json             # Dependencies
├── .env                     # Environment variables
└── README.md                # This file
```

## Development

For development with auto-reload:

```bash
npm run dev
```

(Requires nodemon - already included in devDependencies)

## Notes

- Make sure MongoDB is running before starting the server
- The app uses port 3000 by default (configurable in `.env`)
- Progress data persists in MongoDB
- Each week can have 6 days of workouts
- You can navigate through unlimited weeks

## Troubleshooting

**Server won't start:**
- Check if MongoDB is running
- Verify `.env` file has correct MongoDB URI
- Make sure port 3000 is not in use

**Can't mark days complete:**
- Check browser console for errors
- Verify server is running
- Check MongoDB connection

**GIFs not loading:**
- Make sure all GIF files are in the `gifs/` folder
- Check file names match the references in workout.html

## Future Enhancements

- User authentication
- Custom workout plans
- Exercise notes and feedback
- Progress charts and analytics
- Mobile app version

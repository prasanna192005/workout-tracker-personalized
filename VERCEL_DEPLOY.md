# Vercel Deployment Instructions

## Setup Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:
   - **Name**: `MONGODB_URI`
   - **Value**: `mongodb+srv://prasannapandharikar19_db_user:2IPLExghKImMwjHF@cluster0.wlfraan.mongodb.net/workout-tracker?retryWrites=true&w=majority&appName=Cluster0`
   - **Environment**: Production, Preview, Development (select all)

## Deploy

After adding environment variables, deploy using one of these methods:

### Method 1: Git Push (Recommended)
```bash
git add .
git commit -m "Convert to Vercel serverless"
git push origin main
```

Vercel will automatically deploy when you push to GitHub.

### Method 2: Vercel CLI
```bash
vercel --prod
```

## API Endpoints

After deployment, your API will be available at:
- `https://workouttrack19.vercel.app/api/progress`
- `https://workouttrack19.vercel.app/api/progress/[id]`
- `https://workouttrack19.vercel.app/api/progress/exercise`
- `https://workouttrack19.vercel.app/api/progress/exercises/[dayNumber]/[weekNumber]`
- `https://workouttrack19.vercel.app/api/stats`

## Testing

After deployment:
1. Visit `https://workouttrack19.vercel.app/`
2. You should see the home screen
3. Test marking days complete
4. Test exercise completion checkboxes

## Troubleshooting

If you get errors:
1. Check Vercel logs: `vercel logs`
2. Verify environment variables are set correctly
3. Make sure MongoDB connection string is correct

# Fair Meeting Roulette

A fair and balanced way to choose your next meeting facilitator. The longer someone hasn't been chosen, the higher their chances of being selected!

## Features

- **Fair Selection Algorithm**: Uses weighted random selection where recently chosen members have lower weights
- **Persistent Storage**: Supports both Supabase database and localStorage fallback
- **Real-time Updates**: Team management with instant UI updates
- **Responsive Design**: Works on desktop and mobile devices
- **Weighted Probability Display**: Shows each member's current selection probability

## Database Integration

This application supports Supabase database for persistent storage across devices and sessions.

### Supabase Setup

1. Create a new project at [Supabase](https://supabase.com)
2. Run the SQL schema from `supabase-schema.md` in your Supabase SQL Editor
3. Copy your project URL and anon key from Settings > API
4. Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Fallback Mode

If Supabase is not configured, the application automatically falls back to localStorage for data persistence.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. (Optional) Set up Supabase using the instructions above
4. Start the development server: `npm run dev`
5. Open http://localhost:5173 in your browser

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## How It Works

1. Add team members to the roster
2. Click "Spin the Wheel!" to select a facilitator
3. The algorithm considers each member's "weight" (chance of being selected)
4. Recently selected members get lower weights, making it fair over time
5. Weights gradually increase for non-selected members

The fair selection ensures everyone gets a turn while maintaining randomness!

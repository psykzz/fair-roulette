# Supabase Database Schema

## Tables

### team_members

Table to store team members for the Fair Roulette application.

```sql
CREATE TABLE team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  weight INTEGER NOT NULL DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for all users (for simplicity)
-- In production, you might want more restrictive policies
CREATE POLICY "Allow all operations for team_members" ON team_members
FOR ALL USING (true) WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_team_members_updated_at 
    BEFORE UPDATE ON team_members 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
```

## Setup Instructions

1. Create a new Supabase project at https://supabase.com
2. Go to the SQL Editor in your Supabase dashboard
3. Run the SQL commands above to create the table and policies
4. Copy your project URL and anon key from Settings > API
5. Create a `.env` file in the project root with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
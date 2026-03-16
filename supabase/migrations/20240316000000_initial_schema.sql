-- Initial schema for Logística Pro

-- Users table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  status TEXT NOT NULL DEFAULT 'Ativo',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fleet table
CREATE TABLE IF NOT EXISTS public.fleet (
  id TEXT PRIMARY KEY,
  model TEXT NOT NULL,
  plate TEXT NOT NULL,
  driver TEXT NOT NULL,
  status TEXT NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inventory table
CREATE TABLE IF NOT EXISTS public.inventory (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  qty INTEGER NOT NULL DEFAULT 0,
  unit TEXT NOT NULL,
  min_qty INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fleet ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

-- Policies
-- Profiles: Users can read all profiles, but only update their own
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Fleet: Viewable by everyone, modifiable by authenticated users
CREATE POLICY "Fleet is viewable by everyone" ON public.fleet
  FOR SELECT USING (true);

CREATE POLICY "Fleet is modifiable by authenticated users" ON public.fleet
  FOR ALL USING (auth.role() = 'authenticated');

-- Inventory: Viewable by everyone, modifiable by authenticated users
CREATE POLICY "Inventory is viewable by everyone" ON public.inventory
  FOR SELECT USING (true);

CREATE POLICY "Inventory is modifiable by authenticated users" ON public.inventory
  FOR ALL USING (auth.role() = 'authenticated');

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', NEW.email), NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Fix the foreign key relationship between reviews and profiles
-- Drop existing foreign key if it exists and recreate with proper reference
ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_user_id_fkey;

-- Add proper foreign key to profiles table
ALTER TABLE reviews 
  ADD CONSTRAINT reviews_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES profiles(id) 
  ON DELETE CASCADE;

-- Update RLS policies to allow joining with profiles
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON reviews;

CREATE POLICY "Reviews are viewable by everyone" 
  ON reviews FOR SELECT 
  USING (true);

-- Create an index for better query performance
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);

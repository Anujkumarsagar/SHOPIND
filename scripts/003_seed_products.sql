-- Seed products data
INSERT INTO products (name, description, price, original_price, discount_percentage, image_url, category, rating, reviews_count, is_new_arrival, is_top_selling, colors, sizes) VALUES
-- New Arrivals
('T-shirt with Tape Details', 'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.', 120, NULL, NULL, '/placeholder.svg?height=300&width=300', 'casual', 4.5, 120, true, false, ARRAY['Black', 'White', 'Gray'], ARRAY['Small', 'Medium', 'Large', 'X-Large']),
('Skinny Fit Jeans', 'Classic blue skinny fit jeans perfect for a modern casual look', 240, 260, 20, '/placeholder.svg?height=300&width=300', 'casual', 3.5, 95, true, false, ARRAY['Blue', 'Black'], ARRAY['Small', 'Medium', 'Large', 'X-Large']),
('Checkered Shirt', 'Stylish checkered shirt in red and blue pattern', 180, NULL, NULL, '/placeholder.svg?height=300&width=300', 'casual', 4.5, 87, true, false, ARRAY['Red', 'Blue', 'Green'], ARRAY['Small', 'Medium', 'Large', 'X-Large']),
('Sleeve Striped T-shirt', 'Vibrant orange t-shirt with contrasting black raglan sleeves', 130, 160, 30, '/placeholder.svg?height=300&width=300', 'casual', 4.5, 102, true, false, ARRAY['Orange', 'Red', 'Yellow'], ARRAY['Small', 'Medium', 'Large', 'X-Large']),

-- Top Selling
('Vertical Striped Shirt', 'Elegant vertical striped shirt in sage green', 212, 232, 20, '/placeholder.svg?height=300&width=300', 'formal', 5.0, 145, false, true, ARRAY['Green', 'Blue', 'Gray'], ARRAY['Small', 'Medium', 'Large', 'X-Large']),
('Courage Graphic T-shirt', 'Bold orange t-shirt with inspiring MRGE graphic print', 145, NULL, NULL, '/placeholder.svg?height=300&width=300', 'casual', 4.0, 89, false, true, ARRAY['Orange', 'White', 'Black'], ARRAY['Small', 'Medium', 'Large', 'X-Large']),
('Loose Fit Bermuda Shorts', 'Comfortable light blue denim bermuda shorts', 80, NULL, NULL, '/placeholder.svg?height=300&width=300', 'casual', 3.0, 67, false, true, ARRAY['Blue', 'Khaki', 'Gray'], ARRAY['Small', 'Medium', 'Large', 'X-Large']),
('Faded Skinny Jeans', 'Trendy faded black skinny jeans', 210, NULL, NULL, '/placeholder.svg?height=300&width=300', 'casual', 4.5, 123, false, true, ARRAY['Black', 'Gray', 'Blue'], ARRAY['Small', 'Medium', 'Large', 'X-Large']),

-- More products
('Gradient Graphic T-shirt', 'Artistic gradient t-shirt with abstract colorful design', 145, 242, 40, '/placeholder.svg?height=300&width=300', 'casual', 3.5, 78, false, false, ARRAY['White', 'Black'], ARRAY['Small', 'Medium', 'Large', 'X-Large']),
('Polo with Tipping Details', 'Classic teal polo shirt with contrast collar trim', 180, 242, 20, '/placeholder.svg?height=300&width=300', 'formal', 4.5, 156, false, false, ARRAY['Teal', 'Navy', 'White'], ARRAY['Small', 'Medium', 'Large', 'X-Large']),
('Black Striped T-shirt', 'Modern white t-shirt with vertical black pinstripes and raglan sleeves', 120, 160, 30, '/placeholder.svg?height=300&width=300', 'casual', 5.0, 201, false, false, ARRAY['White', 'Gray'], ARRAY['Small', 'Medium', 'Large', 'X-Large']),
('One Life Graphic T-shirt', 'Vintage olive green t-shirt with One Life typography', 260, 300, 40, '/placeholder.svg?height=300&width=300', 'casual', 4.5, 234, false, false, ARRAY['Green', 'Black', 'Gray'], ARRAY['Small', 'Medium', 'Large', 'X-Large']),
('Polo with Contrast Trims', 'Burgundy textured polo with elegant tipping details', 212, 242, 20, '/placeholder.svg?height=300&width=300', 'formal', 4.0, 167, false, false, ARRAY['Burgundy', 'Navy', 'Black'], ARRAY['Small', 'Medium', 'Large', 'X-Large']);

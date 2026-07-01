-- Cooking Gallery Site - 02_seed_categories.sql
-- Run this second in phpMyAdmin, after 01_schema.sql.

USE cooking_gallery_site;

INSERT INTO categories (id, name, slug) VALUES
(1, 'Breakfast', 'breakfast'),
(2, 'Lunch', 'lunch'),
(3, 'Dinner', 'dinner'),
(4, 'Dessert', 'dessert'),
(5, 'Traditional Food', 'traditional-food'),
(6, 'Drinks', 'drinks')
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    slug = VALUES(slug);

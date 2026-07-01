-- Cooking Gallery Site - 03_seed_demo_data.sql
-- Run this third in phpMyAdmin, after 01_schema.sql and 02_seed_categories.sql.
-- Demo logins:
--   admin / admin123
--   maya  / user123
--   budi  / user123 (pending, should not be able to log in)

USE cooking_gallery_site;

INSERT INTO users (id, username, email, password_hash, display_name, role, status) VALUES
(1, 'admin', 'admin@example.com', '$2y$10$ZRpMAndvgKniJdIxxoMmourSV1rkoktCtarEl7.omQabbcEYefypG', 'Admin Cooking Gallery', 'admin', 'approved'),
(2, 'maya', 'maya@example.com', '$2y$10$eIAaaULzraiCHJWOnA25XOuOxw59jJGrQtFdBhT9EGAUJtSVX3qLm', 'Maya Santoso', 'user', 'approved'),
(3, 'budi', 'budi@example.com', '$2y$10$eIAaaULzraiCHJWOnA25XOuOxw59jJGrQtFdBhT9EGAUJtSVX3qLm', 'Budi Pending', 'user', 'pending')
ON DUPLICATE KEY UPDATE
    email = VALUES(email),
    password_hash = VALUES(password_hash),
    display_name = VALUES(display_name),
    role = VALUES(role),
    status = VALUES(status);

INSERT INTO recipes
(id, user_id, category_id, title, slug, description, ingredients, cooking_type, difficulty, cooking_time_minutes, image, status, created_at, updated_at) VALUES
(1, 2, 1, 'Nasi Goreng Sarapan', 'nasi-goreng-sarapan', 'Nasi goreng cepat untuk pagi hari dengan telur dan daun bawang.', 'Nasi putih\nTelur\nBawang putih\nKecap manis\nDaun bawang', 'Tumis', 'easy', 20, 'nasi-goreng-sarapan.png', 'approved', '2026-06-01 08:00:00', NULL),
(2, 2, 4, 'Puding Cokelat Lembut', 'puding-cokelat-lembut', 'Dessert sederhana yang cocok untuk belajar membuat hidangan manis.', 'Susu cair\nCokelat bubuk\nAgar-agar\nGula\nGaram', 'Rebus', 'easy', 25, 'puding-cokelat-lembut.png', 'approved', '2026-06-02 10:00:00', NULL),
(3, 2, 5, 'Soto Ayam Rumahan', 'soto-ayam-rumahan', 'Soto ayam hangat dengan kuah kuning ringan.', 'Ayam\nSerai\nDaun jeruk\nKunyit\nSoun\nTelur rebus', 'Rebus', 'medium', 60, 'soto-ayam-rumahan.png', 'approved', '2026-06-03 12:00:00', NULL),
(4, 2, 6, 'Es Teh Lemon Madu', 'es-teh-lemon-madu', 'Minuman segar untuk menemani resep pedas.', 'Teh hitam\nLemon\nMadu\nEs batu', 'Seduh', 'easy', 10, 'es-teh-lemon-madu.png', 'approved', '2026-06-04 14:00:00', NULL),
(5, 2, 3, 'Burger Rumahan Sederhana', 'burger-rumahan-sederhana', 'Resep makan malam sederhana yang sedang menunggu approval admin.', 'Roti burger\nDaging burger\nKeju\nSelada\nTomat\nSaus tomat', 'Panggang', 'easy', 30, 'burger-rumahan-sederhana.png', 'pending', '2026-06-05 18:00:00', NULL)
ON DUPLICATE KEY UPDATE
    user_id = VALUES(user_id),
    category_id = VALUES(category_id),
    title = VALUES(title),
    slug = VALUES(slug),
    description = VALUES(description),
    ingredients = VALUES(ingredients),
    cooking_type = VALUES(cooking_type),
    difficulty = VALUES(difficulty),
    cooking_time_minutes = VALUES(cooking_time_minutes),
    image = VALUES(image),
    status = VALUES(status),
    updated_at = VALUES(updated_at);

INSERT INTO comments (id, recipe_id, user_id, body, status, created_at) VALUES
(1, 1, 1, 'Resep ini bagus untuk contoh homepage karena singkat dan familiar.', 'approved', '2026-06-06 09:00:00'),
(2, 2, 2, 'Pudingnya terlihat cocok untuk latihan form komentar.', 'approved', '2026-06-06 10:00:00'),
(3, 3, 2, 'Komentar ini masih menunggu approval admin.', 'pending', '2026-06-06 11:00:00')
ON DUPLICATE KEY UPDATE
    recipe_id = VALUES(recipe_id),
    user_id = VALUES(user_id),
    body = VALUES(body),
    status = VALUES(status);

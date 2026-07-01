<?php
require_once __DIR__ . '/../includes/bootstrap.php';

$auth = new Auth($databaseConnection);
$auth->requireAdmin();

$pageTitle = 'Admin Dashboard';
include __DIR__ . '/../includes/header.php';
?>

<section class="dashboard-header">
    <div>
        <p class="eyebrow">Admin Area</p>
        <h2>Admin Dashboard</h2>
        <p>Kelola approval user, resep, komentar, dan kategori.</p>
    </div>
</section>

<nav class="admin-nav">
    <a class="button button-neutral" href="<?= APP_URL ?>/admin/users.php">Users</a>
    <a class="button button-neutral" href="<?= APP_URL ?>/admin/categories.php">Categories</a>
    <a class="button button-neutral" href="<?= APP_URL ?>/admin/recipes.php">Recipes</a>
    <a class="button button-neutral" href="<?= APP_URL ?>/admin/comments.php">Comments</a>
</nav>

<?php include __DIR__ . '/../includes/footer.php'; ?>

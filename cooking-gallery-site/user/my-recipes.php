<?php
require_once __DIR__ . '/../includes/bootstrap.php';

$auth = new Auth($databaseConnection);
$auth->requireLogin();

$recipeObject = new Recipe($databaseConnection);
$recipes = $recipeObject->getByUser((int) $_SESSION['user_id']);

$pageTitle = 'My Recipes';
include __DIR__ . '/../includes/header.php';
?>

<h2>My Recipes</h2>
<?php if (isset($_GET['created'])): ?>
    <div class="alert">Resep berhasil dikirim dan menunggu approval admin.</div>
<?php endif; ?>

<?php if (!$recipes): ?>
    <div class="alert">Kamu belum menulis resep.</div>
<?php else: ?>
    <table class="admin-table">
        <thead>
            <tr>
                <th>Judul</th>
                <th>Kategori</th>
                <th>Status</th>
                <th>Waktu</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($recipes as $recipe): ?>
                <tr>
                    <td><?= escapeHtml($recipe['title']) ?></td>
                    <td><?= escapeHtml($recipe['category_name']) ?></td>
                    <td><span class="status-<?= escapeHtml($recipe['status']) ?>"><?= escapeHtml($recipe['status']) ?></span></td>
                    <td><?= (int) $recipe['cooking_time_minutes'] ?> menit</td>
                    <td><a class="button button-neutral" href="<?= APP_URL ?>/user/edit-recipe.php?id=<?= (int) $recipe['id'] ?>">Edit</a></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
<?php endif; ?>

<?php include __DIR__ . '/../includes/footer.php'; ?>

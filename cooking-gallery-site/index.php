<?php
require_once __DIR__ . '/includes/bootstrap.php';

$recipeObject = new Recipe($databaseConnection);
$recipes = $recipeObject->getLatestApproved(12);

$pageTitle = 'Home';
include __DIR__ . '/includes/header.php';
?>

<section class="hero">
    <div>
        <p class="eyebrow">Recipe sharing website</p>
        <h2>Cooking Gallery</h2>
        <p>Galeri resep sederhana dengan register, login, submit resep, komentar, dan admin approval.</p>
    </div>
    <a class="button button-primary" href="<?= APP_URL ?>/user/new-recipe.php">Tulis Resep</a>
</section>

<h2>Resep Terbaru</h2>

<?php if (!$recipes): ?>
    <div class="alert">Belum ada resep approved. Login sebagai admin dan approve resep terlebih dahulu.</div>
<?php endif; ?>

<section class="recipe-grid">
    <?php foreach ($recipes as $recipe): ?>
        <article class="recipe-card">
            <?php if ($recipe['image']): ?>
                <img class="recipe-card-image" src="<?= APP_URL ?>/uploads/<?= escapeHtml($recipe['image']) ?>" alt="<?= escapeHtml($recipe['title']) ?>">
            <?php endif; ?>
            <p class="recipe-meta"><?= escapeHtml($recipe['category_name']) ?> &bull; <?= (int) $recipe['cooking_time_minutes'] ?> menit</p>
            <h3><a href="<?= APP_URL ?>/recipe.php?id=<?= (int) $recipe['id'] ?>"><?= escapeHtml($recipe['title']) ?></a></h3>
            <p><?= escapeHtml($recipe['description']) ?></p>
            <p class="recipe-author">Oleh <?= escapeHtml($recipe['display_name']) ?></p>
        </article>
    <?php endforeach; ?>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>

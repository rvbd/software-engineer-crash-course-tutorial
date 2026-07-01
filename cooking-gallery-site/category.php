<?php
require_once __DIR__ . '/includes/bootstrap.php';

$categoryId = (int) ($_GET['id'] ?? 0);
$categoryObject = new Category($databaseConnection);
$recipeObject = new Recipe($databaseConnection);

$category = $categoryObject->findById($categoryId);
$recipes = $category ? $recipeObject->getApprovedByCategory($categoryId) : [];

$pageTitle = $category ? 'Kategori ' . $category['name'] : 'Kategori';
include __DIR__ . '/includes/header.php';
?>

<h2><?= $category ? escapeHtml($category['name']) : 'Kategori tidak ditemukan' ?></h2>

<?php if (!$category): ?>
    <div class="alert">Kategori tidak ditemukan.</div>
<?php elseif (!$recipes): ?>
    <div class="alert">Belum ada resep approved untuk kategori ini.</div>
<?php endif; ?>

<section class="recipe-grid">
    <?php foreach ($recipes as $recipe): ?>
        <article class="recipe-card">
            <?php if ($recipe['image']): ?>
                <img class="recipe-card-image" src="<?= APP_URL ?>/uploads/<?= escapeHtml($recipe['image']) ?>" alt="<?= escapeHtml($recipe['title']) ?>">
            <?php endif; ?>
            <p class="recipe-meta"><?= escapeHtml($recipe['category_name']) ?></p>
            <h3><a href="<?= APP_URL ?>/recipe.php?id=<?= (int) $recipe['id'] ?>"><?= escapeHtml($recipe['title']) ?></a></h3>
            <p><?= escapeHtml($recipe['description']) ?></p>
        </article>
    <?php endforeach; ?>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>

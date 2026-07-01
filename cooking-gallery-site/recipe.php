<?php
require_once __DIR__ . '/includes/bootstrap.php';

$recipeObject = new Recipe($databaseConnection);
$commentObject = new Comment($databaseConnection);
$auth = new Auth($databaseConnection);
$errors = [];

$recipeId = (int) ($_GET['id'] ?? 0);
$recipe = $recipeObject->findApprovedById($recipeId);

if (!$recipe) {
    http_response_code(404);
    $pageTitle = 'Resep Tidak Ditemukan';
    include __DIR__ . '/includes/header.php';
    echo '<div class="alert">Resep tidak ditemukan atau belum approved.</div>';
    include __DIR__ . '/includes/footer.php';
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $auth->requireLogin();
    $commentBody = trim($_POST['body'] ?? '');

    if (!Validator::required($commentBody)) {
        $errors[] = 'Komentar wajib diisi.';
    }

    if (!$errors) {
        $commentObject->create($recipeId, (int) $_SESSION['user_id'], $commentBody);
        redirectTo('/recipe.php?id=' . $recipeId . '&comment=pending');
    }
}

$comments = $commentObject->getApprovedByRecipe($recipeId);
$pageTitle = $recipe['title'];
include __DIR__ . '/includes/header.php';
?>

<?php if (isset($_GET['comment'])): ?>
    <div class="alert">Komentar sudah dikirim dan menunggu approval admin.</div>
<?php endif; ?>

<article class="recipe-detail">
    <?php if ($recipe['image']): ?>
        <img class="recipe-detail-image" src="<?= APP_URL ?>/uploads/<?= escapeHtml($recipe['image']) ?>" alt="<?= escapeHtml($recipe['title']) ?>">
    <?php endif; ?>
    <p class="recipe-meta"><?= escapeHtml($recipe['category_name']) ?> &bull; <?= escapeHtml($recipe['difficulty']) ?> &bull; <?= (int) $recipe['cooking_time_minutes'] ?> menit</p>
    <h2><?= escapeHtml($recipe['title']) ?></h2>
    <p><?= nl2br(escapeHtml($recipe['description'])) ?></p>

    <h3>Bahan</h3>
    <p><?= nl2br(escapeHtml($recipe['ingredients'])) ?></p>

    <p class="recipe-author">Ditulis oleh <?= escapeHtml($recipe['display_name']) ?></p>
</article>

<section class="comments-section">
    <h2>Komentar</h2>

    <?php foreach ($comments as $comment): ?>
        <article class="comment">
            <strong><?= escapeHtml($comment['display_name']) ?></strong>
            <p><?= nl2br(escapeHtml($comment['body'])) ?></p>
        </article>
    <?php endforeach; ?>

    <?php if (!$comments): ?>
        <p>Belum ada komentar approved.</p>
    <?php endif; ?>

    <?php if ($auth->check()): ?>
        <form method="post" class="content-form">
            <div class="form-group">
                <label for="body">Tulis komentar</label>
                <textarea id="body" name="body" rows="4"></textarea>
            </div>
            <button class="button button-primary" type="submit">Kirim Komentar</button>
        </form>
    <?php else: ?>
        <div class="alert">Login terlebih dahulu untuk menulis komentar.</div>
    <?php endif; ?>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>

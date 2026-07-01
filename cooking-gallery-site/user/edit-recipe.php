<?php
require_once __DIR__ . '/../includes/bootstrap.php';

$auth = new Auth($databaseConnection);
$auth->requireLogin();

$categoryObject = new Category($databaseConnection);
$recipeObject = new Recipe($databaseConnection);
$categories = $categoryObject->getAll();
$errors = [];

$recipeId = (int) ($_GET['id'] ?? 0);
$recipe = $recipeObject->findByIdForUser($recipeId, (int) $_SESSION['user_id']);

if (!$recipe) {
    http_response_code(404);
    $pageTitle = 'Resep Tidak Ditemukan';
    include __DIR__ . '/../includes/header.php';
    echo '<div class="alert">Resep tidak ditemukan atau bukan milik akun ini.</div>';
    include __DIR__ . '/../includes/footer.php';
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title'] ?? '');
    $categoryId = (int) ($_POST['category_id'] ?? 0);
    $description = trim($_POST['description'] ?? '');
    $ingredients = trim($_POST['ingredients'] ?? '');
    $cookingType = trim($_POST['cooking_type'] ?? '');
    $difficulty = $_POST['difficulty'] ?? 'easy';
    $cookingTimeMinutes = (int) ($_POST['cooking_time_minutes'] ?? 0);
    $imageFileName = $recipe['image'];

    if (!Validator::required($title)) {
        $errors[] = 'Judul wajib diisi.';
    }
    if ($categoryId <= 0) {
        $errors[] = 'Kategori wajib dipilih.';
    }
    if (!Validator::required($ingredients)) {
        $errors[] = 'Bahan wajib diisi.';
    }
    if (!Validator::inArray($difficulty, ['easy', 'medium', 'hard'])) {
        $errors[] = 'Difficulty tidak valid.';
    }
    if ($cookingTimeMinutes <= 0) {
        $errors[] = 'Cooking time harus lebih dari 0.';
    }

    if (!$errors) {
        $uploadedImageFileName = uploadRecipeImage($_FILES['image'] ?? [], $errors);

        if ($uploadedImageFileName) {
            $imageFileName = $uploadedImageFileName;
        }
    }

    if (!$errors) {
        $slug = strtolower(preg_replace('/[^a-z0-9]+/i', '-', $title));
        $slug = trim($slug, '-') . '-' . time();

        $recipeObject->updateByUser($recipeId, (int) $_SESSION['user_id'], [
            'category_id' => $categoryId,
            'title' => $title,
            'slug' => $slug,
            'description' => $description,
            'ingredients' => $ingredients,
            'cooking_type' => $cookingType,
            'difficulty' => $difficulty,
            'cooking_time_minutes' => $cookingTimeMinutes,
            'image' => $imageFileName,
        ]);

        redirectTo('/user/my-recipes.php?updated=pending');
    }
}

$pageTitle = 'Edit Resep';
include __DIR__ . '/../includes/header.php';
?>

<h2>Edit Resep</h2>
<p>Setiap perubahan akan mengembalikan resep ke status pending agar admin bisa review ulang.</p>

<?php if ($errors): ?>
    <div class="alert alert-danger">
        <?php foreach ($errors as $error): ?>
            <p><?= escapeHtml($error) ?></p>
        <?php endforeach; ?>
    </div>
<?php endif; ?>

<form method="post" class="content-form" enctype="multipart/form-data">
    <div class="form-group">
        <label for="title">Judul resep</label>
        <input id="title" type="text" name="title" value="<?= escapeHtml($_POST['title'] ?? $recipe['title']) ?>">
    </div>
    <div class="form-group">
        <label for="category_id">Kategori</label>
        <select id="category_id" name="category_id">
            <?php foreach ($categories as $category): ?>
                <?php $selectedCategoryId = (int) ($_POST['category_id'] ?? $recipe['category_id']); ?>
                <option value="<?= (int) $category['id'] ?>" <?= $selectedCategoryId === (int) $category['id'] ? 'selected' : '' ?>>
                    <?= escapeHtml($category['name']) ?>
                </option>
            <?php endforeach; ?>
        </select>
    </div>
    <div class="form-group">
        <label for="description">Deskripsi</label>
        <textarea id="description" name="description" rows="3"><?= escapeHtml($_POST['description'] ?? $recipe['description']) ?></textarea>
    </div>
    <div class="form-group">
        <label for="ingredients">Bahan</label>
        <textarea id="ingredients" name="ingredients" rows="5"><?= escapeHtml($_POST['ingredients'] ?? $recipe['ingredients']) ?></textarea>
    </div>
    <div class="form-group">
        <label for="image">Ganti gambar resep</label>
        <?php if ($recipe['image']): ?>
            <img class="current-recipe-image" src="<?= APP_URL ?>/uploads/<?= escapeHtml($recipe['image']) ?>" alt="<?= escapeHtml($recipe['title']) ?>">
        <?php endif; ?>
        <input id="image" type="file" name="image" accept=".jpg,.jpeg,.png,.webp">
        <p class="field-help">Kosongkan jika tidak ingin mengganti gambar. Upload baru juga membuat status kembali pending.</p>
    </div>
    <div class="form-grid">
        <div class="form-group">
            <label for="cooking_type">Jenis masakan</label>
            <input id="cooking_type" type="text" name="cooking_type" value="<?= escapeHtml($_POST['cooking_type'] ?? $recipe['cooking_type']) ?>">
        </div>
        <div class="form-group">
            <label for="difficulty">Difficulty</label>
            <?php $selectedDifficulty = $_POST['difficulty'] ?? $recipe['difficulty']; ?>
            <select id="difficulty" name="difficulty">
                <option value="easy" <?= $selectedDifficulty === 'easy' ? 'selected' : '' ?>>Easy</option>
                <option value="medium" <?= $selectedDifficulty === 'medium' ? 'selected' : '' ?>>Medium</option>
                <option value="hard" <?= $selectedDifficulty === 'hard' ? 'selected' : '' ?>>Hard</option>
            </select>
        </div>
        <div class="form-group">
            <label for="cooking_time_minutes">Menit</label>
            <input id="cooking_time_minutes" type="number" name="cooking_time_minutes" min="1" value="<?= escapeHtml($_POST['cooking_time_minutes'] ?? $recipe['cooking_time_minutes']) ?>">
        </div>
    </div>
    <button class="button button-primary" type="submit">Simpan dan Kirim Review</button>
</form>

<?php include __DIR__ . '/../includes/footer.php'; ?>

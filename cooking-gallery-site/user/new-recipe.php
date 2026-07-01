<?php
require_once __DIR__ . '/../includes/bootstrap.php';

$auth = new Auth($databaseConnection);
$auth->requireLogin();

$categoryObject = new Category($databaseConnection);
$recipeObject = new Recipe($databaseConnection);
$categories = $categoryObject->getAll();
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title'] ?? '');
    $categoryId = (int) ($_POST['category_id'] ?? 0);
    $description = trim($_POST['description'] ?? '');
    $ingredients = trim($_POST['ingredients'] ?? '');
    $cookingType = trim($_POST['cooking_type'] ?? '');
    $difficulty = $_POST['difficulty'] ?? 'easy';
    $cookingTimeMinutes = (int) ($_POST['cooking_time_minutes'] ?? 0);

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
        $imageFileName = uploadRecipeImage($_FILES['image'] ?? [], $errors);
    }

    if (!$errors) {
        $slug = strtolower(preg_replace('/[^a-z0-9]+/i', '-', $title));
        $slug = trim($slug, '-') . '-' . time();

        $recipeObject->create([
            'user_id' => (int) $_SESSION['user_id'],
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

        redirectTo('/user/my-recipes.php?created=pending');
    }
}

$pageTitle = 'Tulis Resep';
include __DIR__ . '/../includes/header.php';
?>

<h2>Tulis Resep Baru</h2>
<p>Resep baru akan berstatus pending sampai admin approve.</p>

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
        <input id="title" type="text" name="title" value="<?= escapeHtml($_POST['title'] ?? '') ?>">
    </div>
    <div class="form-group">
        <label for="category_id">Kategori</label>
        <select id="category_id" name="category_id">
            <option value="">Pilih kategori</option>
            <?php foreach ($categories as $category): ?>
                <option value="<?= (int) $category['id'] ?>"><?= escapeHtml($category['name']) ?></option>
            <?php endforeach; ?>
        </select>
    </div>
    <div class="form-group">
        <label for="description">Deskripsi</label>
        <textarea id="description" name="description" rows="3"><?= escapeHtml($_POST['description'] ?? '') ?></textarea>
    </div>
    <div class="form-group">
        <label for="ingredients">Bahan</label>
        <textarea id="ingredients" name="ingredients" rows="5"><?= escapeHtml($_POST['ingredients'] ?? '') ?></textarea>
    </div>
    <div class="form-group">
        <label for="image">Gambar resep</label>
        <input id="image" type="file" name="image" accept=".jpg,.jpeg,.png,.webp">
        <p class="field-help">Opsional. Format JPG, PNG, atau WEBP. Maksimal 2MB.</p>
    </div>
    <div class="form-grid">
        <div class="form-group">
            <label for="cooking_type">Jenis masakan</label>
            <input id="cooking_type" type="text" name="cooking_type" value="<?= escapeHtml($_POST['cooking_type'] ?? '') ?>">
        </div>
        <div class="form-group">
            <label for="difficulty">Difficulty</label>
            <select id="difficulty" name="difficulty">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
        </div>
        <div class="form-group">
            <label for="cooking_time_minutes">Menit</label>
            <input id="cooking_time_minutes" type="number" name="cooking_time_minutes" min="1" value="<?= escapeHtml($_POST['cooking_time_minutes'] ?? '') ?>">
        </div>
    </div>
    <button class="button button-primary" type="submit">Submit Resep</button>
</form>

<?php include __DIR__ . '/../includes/footer.php'; ?>

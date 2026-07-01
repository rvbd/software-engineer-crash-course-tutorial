<?php
require_once __DIR__ . '/../includes/bootstrap.php';

$auth = new Auth($databaseConnection);
$auth->requireAdmin();

$categoryObject = new Category($databaseConnection);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $categoryAction = $_POST['action'];
    $categoryId = (int) ($_POST['id'] ?? 0);
    $name = trim($_POST['name'] ?? '');
    $slug = strtolower(preg_replace('/[^a-z0-9]+/i', '-', $name));
    $slug = trim($slug, '-');

    if (Validator::required($name)) {
        if ($categoryAction === 'create') {
            $categoryObject->create($name, $slug);
        }
        if ($categoryAction === 'update') {
            $categoryObject->update($categoryId, $name, $slug);
        }
    }
    if ($categoryAction === 'delete') {
        try {
            $categoryObject->delete($categoryId);
        } catch (PDOException $databaseException) {
            redirectTo('/admin/categories.php?error=in-use');
        }
    }

    redirectTo('/admin/categories.php');
}

$categories = $categoryObject->getAll();

$pageTitle = 'Manage Categories';
include __DIR__ . '/../includes/header.php';
?>

<h2>Manage Categories</h2>

<?php if (isset($_GET['error'])): ?>
    <div class="alert alert-danger">Kategori masih dipakai oleh resep, jadi belum bisa dihapus.</div>
<?php endif; ?>

<form method="post" class="content-form compact-form">
    <div class="form-group">
        <label for="name">Kategori baru</label>
        <input id="name" type="text" name="name" placeholder="Nama kategori">
    </div>
    <button class="button button-primary" name="action" value="create">Tambah</button>
</form>

<table class="admin-table">
    <thead>
        <tr>
            <th>Nama</th>
            <th>Slug</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($categories as $category): ?>
            <tr>
                <td colspan="3">
                    <form method="post" class="inline-actions category-row">
                        <input type="hidden" name="id" value="<?= (int) $category['id'] ?>">
                        <input type="text" name="name" value="<?= escapeHtml($category['name']) ?>">
                        <span><?= escapeHtml($category['slug']) ?></span>
                        <button name="action" value="update">Update</button>
                        <button class="button-danger" name="action" value="delete">Delete</button>
                    </form>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>

<?php include __DIR__ . '/../includes/footer.php'; ?>

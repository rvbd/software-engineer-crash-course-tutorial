<?php
require_once __DIR__ . '/../includes/bootstrap.php';

$auth = new Auth($databaseConnection);
$auth->requireAdmin();

$recipeObject = new Recipe($databaseConnection);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $recipeId = (int) $_POST['id'];
    $recipeAction = $_POST['action'];

    if ($recipeAction === 'approve') {
        $recipeObject->updateStatus($recipeId, 'approved');
    }
    if ($recipeAction === 'reject') {
        $recipeObject->updateStatus($recipeId, 'rejected');
    }
    if ($recipeAction === 'delete') {
        $recipeObject->delete($recipeId);
    }

    redirectTo('/admin/recipes.php');
}

$recipes = $recipeObject->getAllForAdmin();

$pageTitle = 'Manage Recipes';
include __DIR__ . '/../includes/header.php';
?>

<h2>Manage Recipes</h2>
<table class="admin-table">
    <thead>
        <tr>
            <th>Judul</th>
            <th>User</th>
            <th>Kategori</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($recipes as $recipe): ?>
            <tr>
                <td><?= escapeHtml($recipe['title']) ?></td>
                <td><?= escapeHtml($recipe['username']) ?></td>
                <td><?= escapeHtml($recipe['category_name']) ?></td>
                <td><span class="status-<?= escapeHtml($recipe['status']) ?>"><?= escapeHtml($recipe['status']) ?></span></td>
                <td>
                    <form method="post" class="inline-actions">
                        <input type="hidden" name="id" value="<?= (int) $recipe['id'] ?>">
                        <button name="action" value="approve">Approve</button>
                        <button name="action" value="reject">Reject</button>
                        <button class="button-danger" name="action" value="delete">Delete</button>
                    </form>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>

<?php include __DIR__ . '/../includes/footer.php'; ?>

<?php
require_once __DIR__ . '/../includes/bootstrap.php';

$auth = new Auth($databaseConnection);
$auth->requireAdmin();

$commentObject = new Comment($databaseConnection);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $commentId = (int) $_POST['id'];
    $commentAction = $_POST['action'];

    if ($commentAction === 'approve') {
        $commentObject->updateStatus($commentId, 'approved');
    }
    if ($commentAction === 'reject') {
        $commentObject->updateStatus($commentId, 'rejected');
    }
    if ($commentAction === 'delete') {
        $commentObject->delete($commentId);
    }

    redirectTo('/admin/comments.php');
}

$comments = $commentObject->getAll();

$pageTitle = 'Manage Comments';
include __DIR__ . '/../includes/header.php';
?>

<h2>Manage Comments</h2>
<table class="admin-table">
    <thead>
        <tr>
            <th>Recipe</th>
            <th>User</th>
            <th>Komentar</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($comments as $comment): ?>
            <tr>
                <td><?= escapeHtml($comment['title']) ?></td>
                <td><?= escapeHtml($comment['username']) ?></td>
                <td><?= escapeHtml($comment['body']) ?></td>
                <td><span class="status-<?= escapeHtml($comment['status']) ?>"><?= escapeHtml($comment['status']) ?></span></td>
                <td>
                    <form method="post" class="inline-actions">
                        <input type="hidden" name="id" value="<?= (int) $comment['id'] ?>">
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

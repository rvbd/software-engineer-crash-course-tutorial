<?php
require_once __DIR__ . '/../includes/bootstrap.php';

$auth = new Auth($databaseConnection);
$auth->requireAdmin();

$userObject = new User($databaseConnection);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userId = (int) $_POST['id'];
    $userAction = $_POST['action'];

    if ($userId !== (int) $_SESSION['user_id']) {
        if ($userAction === 'approve') {
            $userObject->updateStatus($userId, 'approved');
        }
        if ($userAction === 'reject') {
            $userObject->updateStatus($userId, 'rejected');
        }
        if ($userAction === 'make_admin') {
            $userObject->updateRole($userId, 'admin');
        }
        if ($userAction === 'delete') {
            $userObject->delete($userId);
        }
    }

    redirectTo('/admin/users.php');
}

$users = $userObject->getAll();

$pageTitle = 'Manage Users';
include __DIR__ . '/../includes/header.php';
?>

<h2>Manage Users</h2>
<table class="admin-table">
    <thead>
        <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($users as $user): ?>
            <tr>
                <td><?= escapeHtml($user['username']) ?></td>
                <td><?= escapeHtml($user['email']) ?></td>
                <td><?= escapeHtml($user['role']) ?></td>
                <td><span class="status-<?= escapeHtml($user['status']) ?>"><?= escapeHtml($user['status']) ?></span></td>
                <td>
                    <form method="post" class="inline-actions">
                        <input type="hidden" name="id" value="<?= (int) $user['id'] ?>">
                        <button name="action" value="approve">Approve</button>
                        <button name="action" value="reject">Reject</button>
                        <button name="action" value="make_admin">Make Admin</button>
                        <button class="button-danger" name="action" value="delete">Delete</button>
                    </form>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>

<?php include __DIR__ . '/../includes/footer.php'; ?>

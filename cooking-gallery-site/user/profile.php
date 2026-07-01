<?php
require_once __DIR__ . '/../includes/bootstrap.php';

$auth = new Auth($databaseConnection);
$auth->requireLogin();

$userObject = new User($databaseConnection);
$currentUser = $userObject->findById((int) $_SESSION['user_id']);
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $displayName = trim($_POST['display_name'] ?? '');
    $email = trim($_POST['email'] ?? '');

    if (!Validator::required($displayName)) {
        $errors[] = 'Display name wajib diisi.';
    }
    if (!Validator::email($email)) {
        $errors[] = 'Email tidak valid.';
    }

    if (!$errors) {
        $userObject->updateProfile((int) $_SESSION['user_id'], $displayName, $email);
        $_SESSION['display_name'] = $displayName;
        redirectTo('/user/profile.php?updated=1');
    }
}

$pageTitle = 'Profil';
include __DIR__ . '/../includes/header.php';
?>

<h2>Profil</h2>

<?php if (isset($_GET['updated'])): ?>
    <div class="alert">Profil berhasil diperbarui.</div>
<?php endif; ?>

<?php if ($errors): ?>
    <div class="alert alert-danger">
        <?php foreach ($errors as $error): ?>
            <p><?= escapeHtml($error) ?></p>
        <?php endforeach; ?>
    </div>
<?php endif; ?>

<form method="post" class="content-form">
    <div class="form-group">
        <label for="display_name">Display name</label>
        <input id="display_name" type="text" name="display_name" value="<?= escapeHtml($currentUser['display_name'] ?? '') ?>">
    </div>
    <div class="form-group">
        <label for="email">Email</label>
        <input id="email" type="email" name="email" value="<?= escapeHtml($currentUser['email'] ?? '') ?>">
    </div>
    <button class="button button-primary" type="submit">Update Profil</button>
</form>

<?php include __DIR__ . '/../includes/footer.php'; ?>

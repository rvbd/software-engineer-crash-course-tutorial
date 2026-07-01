<?php
require_once __DIR__ . '/includes/bootstrap.php';

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!Validator::required($username)) {
        $errors[] = 'Username wajib diisi.';
    }
    if (!Validator::email($email)) {
        $errors[] = 'Email tidak valid.';
    }
    if (!Validator::minLength($password, 6)) {
        $errors[] = 'Password minimal 6 karakter.';
    }

    if (!$errors) {
        try {
            $userObject = new User($databaseConnection);
            $userObject->register($username, $email, $password);
            redirectTo('/login.php?registered=pending');
        } catch (PDOException $databaseException) {
            $errors[] = 'Username atau email sudah digunakan.';
        }
    }
}

$pageTitle = 'Register';
include __DIR__ . '/includes/header.php';
?>

<h2>Register</h2>
<p>Akun baru akan berstatus pending sampai admin approve.</p>

<?php if ($errors): ?>
    <div class="alert alert-danger">
        <?php foreach ($errors as $error): ?>
            <p><?= escapeHtml($error) ?></p>
        <?php endforeach; ?>
    </div>
<?php endif; ?>

<form method="post" class="content-form">
    <div class="form-group">
        <label for="username">Username</label>
        <input id="username" type="text" name="username" value="<?= escapeHtml($_POST['username'] ?? '') ?>">
    </div>
    <div class="form-group">
        <label for="email">Email</label>
        <input id="email" type="email" name="email" value="<?= escapeHtml($_POST['email'] ?? '') ?>">
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input id="password" type="password" name="password">
    </div>
    <button class="button button-primary" type="submit">Register</button>
</form>

<?php include __DIR__ . '/includes/footer.php'; ?>

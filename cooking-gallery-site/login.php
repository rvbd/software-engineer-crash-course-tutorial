<?php
require_once __DIR__ . '/includes/bootstrap.php';

$error = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $auth = new Auth($databaseConnection);
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($auth->login($username, $password)) {
        redirectTo('/user/dashboard.php');
    }

    $error = 'Username, password, atau status user belum benar.';
}

$pageTitle = 'Login';
include __DIR__ . '/includes/header.php';
?>

<h2>Login</h2>

<?php if (isset($_GET['registered'])): ?>
    <div class="alert">Akun berhasil dibuat dan menunggu approval admin.</div>
<?php endif; ?>

<?php if ($error): ?>
    <div class="alert alert-danger"><?= escapeHtml($error) ?></div>
<?php endif; ?>

<form method="post" class="content-form">
    <div class="form-group">
        <label for="username">Username</label>
        <input id="username" type="text" name="username">
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input id="password" type="password" name="password">
    </div>
    <button class="button button-primary" type="submit">Login</button>
</form>

<div class="demo-logins">
    <h3>Demo Login</h3>
    <p><strong>Admin:</strong> admin / admin123</p>
    <p><strong>User:</strong> maya / user123</p>
    <p><strong>Pending:</strong> budi / user123</p>
</div>

<?php include __DIR__ . '/includes/footer.php'; ?>

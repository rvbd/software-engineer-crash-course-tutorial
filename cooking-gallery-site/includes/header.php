<?php
$pageTitle = $pageTitle ?? APP_NAME;
$authForHeader = new Auth($databaseConnection);
$categoryObjectForHeader = new Category($databaseConnection);
$navigationCategories = $categoryObjectForHeader->getAll();
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= escapeHtml($pageTitle) ?> - <?= APP_NAME ?></title>
    <link rel="stylesheet" href="<?= APP_URL ?>/assets/css/style.css">
</head>
<body>
<header class="site-header">
    <div class="container">
        <h1 class="logo"><a href="<?= APP_URL ?>">Cooking Gallery</a></h1>
        <nav class="top-nav" aria-label="Main navigation">
            <a href="<?= APP_URL ?>">Home</a>
            <?php foreach (array_slice($navigationCategories, 0, 4) as $navigationCategory): ?>
                <a href="<?= APP_URL ?>/category.php?id=<?= (int) $navigationCategory['id'] ?>"><?= escapeHtml($navigationCategory['name']) ?></a>
            <?php endforeach; ?>
            <?php if ($authForHeader->check()): ?>
                <a href="<?= APP_URL ?>/user/dashboard.php">Dashboard</a>
                <?php if ($authForHeader->isAdmin()): ?>
                    <a href="<?= APP_URL ?>/admin/index.php">Admin</a>
                <?php endif; ?>
                <a href="<?= APP_URL ?>/logout.php">Logout</a>
            <?php else: ?>
                <a href="<?= APP_URL ?>/login.php">Login</a>
                <a href="<?= APP_URL ?>/register.php">Register</a>
            <?php endif; ?>
        </nav>
    </div>
</header>
<main class="site-main">
    <div class="container">

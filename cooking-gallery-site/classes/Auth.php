<?php

class Auth
{
    private PDO $databaseConnection;

    public function __construct(PDO $databaseConnection)
    {
        $this->databaseConnection = $databaseConnection;
    }

    public function login(string $username, string $password): bool
    {
        $loginUserStatement = $this->databaseConnection->prepare("
            SELECT * FROM users
            WHERE username = ? AND status = 'approved'
        ");
        $loginUserStatement->execute([$username]);
        $user = $loginUserStatement->fetch();

        if (!$user || !password_verify($password, $user['password_hash'])) {
            return false;
        }

        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['display_name'] = $user['display_name'];
        $_SESSION['role'] = $user['role'];

        return true;
    }

    public function check(): bool
    {
        return isset($_SESSION['user_id']);
    }

    public function logout(): void
    {
        $_SESSION = [];
        session_destroy();
    }

    public function isAdmin(): bool
    {
        return isset($_SESSION['role']) && $_SESSION['role'] === 'admin';
    }

    public function requireLogin(): void
    {
        if (!$this->check()) {
            redirectTo('/login.php');
        }
    }

    public function requireAdmin(): void
    {
        $this->requireLogin();

        if (!$this->isAdmin()) {
            redirectTo('/');
        }
    }
}

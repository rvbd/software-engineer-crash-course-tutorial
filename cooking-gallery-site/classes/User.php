<?php

class User
{
    private PDO $databaseConnection;

    public function __construct(PDO $databaseConnection)
    {
        $this->databaseConnection = $databaseConnection;
    }

    public function findByUsername(string $username): ?array
    {
        $userLookupStatement = $this->databaseConnection->prepare("SELECT * FROM users WHERE username = ?");
        $userLookupStatement->execute([$username]);
        $user = $userLookupStatement->fetch();

        return $user ?: null;
    }

    public function findById(int $userId): ?array
    {
        $userLookupStatement = $this->databaseConnection->prepare("SELECT * FROM users WHERE id = ?");
        $userLookupStatement->execute([$userId]);
        $user = $userLookupStatement->fetch();

        return $user ?: null;
    }

    public function register(string $username, string $email, string $password): bool
    {
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);

        $createUserStatement = $this->databaseConnection->prepare("
            INSERT INTO users (username, email, password_hash, display_name, status)
            VALUES (?, ?, ?, ?, 'pending')
        ");

        return $createUserStatement->execute([$username, $email, $passwordHash, $username]);
    }

    public function getAll(): array
    {
        return $this->databaseConnection
            ->query("SELECT * FROM users ORDER BY created_at DESC")
            ->fetchAll();
    }

    public function updateStatus(int $userId, string $status): bool
    {
        $updateUserStatusStatement = $this->databaseConnection->prepare("UPDATE users SET status = ? WHERE id = ?");
        return $updateUserStatusStatement->execute([$status, $userId]);
    }

    public function updateRole(int $userId, string $role): bool
    {
        $updateUserRoleStatement = $this->databaseConnection->prepare("UPDATE users SET role = ? WHERE id = ?");
        return $updateUserRoleStatement->execute([$role, $userId]);
    }

    public function updateProfile(int $userId, string $displayName, string $email): bool
    {
        $updateProfileStatement = $this->databaseConnection->prepare("UPDATE users SET display_name = ?, email = ? WHERE id = ?");
        return $updateProfileStatement->execute([$displayName, $email, $userId]);
    }

    public function delete(int $userId): bool
    {
        $deleteUserStatement = $this->databaseConnection->prepare("DELETE FROM users WHERE id = ?");
        return $deleteUserStatement->execute([$userId]);
    }
}

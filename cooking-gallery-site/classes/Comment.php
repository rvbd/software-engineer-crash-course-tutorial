<?php

class Comment
{
    private PDO $databaseConnection;

    public function __construct(PDO $databaseConnection)
    {
        $this->databaseConnection = $databaseConnection;
    }

    public function getApprovedByRecipe(int $recipeId): array
    {
        $approvedCommentsStatement = $this->databaseConnection->prepare("
            SELECT comments.*, users.display_name
            FROM comments
            JOIN users ON users.id = comments.user_id
            WHERE recipe_id = ? AND comments.status = 'approved'
            ORDER BY comments.created_at DESC
        ");
        $approvedCommentsStatement->execute([$recipeId]);

        return $approvedCommentsStatement->fetchAll();
    }

    public function create(int $recipeId, int $userId, string $commentBody): bool
    {
        $createCommentStatement = $this->databaseConnection->prepare("
            INSERT INTO comments (recipe_id, user_id, body, status)
            VALUES (?, ?, ?, 'pending')
        ");

        return $createCommentStatement->execute([$recipeId, $userId, $commentBody]);
    }

    public function getAll(): array
    {
        return $this->databaseConnection->query("
            SELECT comments.*, recipes.title, users.username
            FROM comments
            JOIN recipes ON recipes.id = comments.recipe_id
            JOIN users ON users.id = comments.user_id
            ORDER BY comments.created_at DESC
        ")->fetchAll();
    }

    public function updateStatus(int $commentId, string $status): bool
    {
        $updateCommentStatusStatement = $this->databaseConnection->prepare("UPDATE comments SET status = ? WHERE id = ?");
        return $updateCommentStatusStatement->execute([$status, $commentId]);
    }

    public function delete(int $commentId): bool
    {
        $deleteCommentStatement = $this->databaseConnection->prepare("DELETE FROM comments WHERE id = ?");
        return $deleteCommentStatement->execute([$commentId]);
    }
}

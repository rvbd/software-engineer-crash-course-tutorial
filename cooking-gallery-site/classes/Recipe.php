<?php

class Recipe
{
    private PDO $databaseConnection;

    public function __construct(PDO $databaseConnection)
    {
        $this->databaseConnection = $databaseConnection;
    }

    public function getLatestApproved(int $limit = 10): array
    {
        $approvedRecipesStatement = $this->databaseConnection->prepare("
            SELECT recipes.*, users.display_name, categories.name AS category_name
            FROM recipes
            JOIN users ON users.id = recipes.user_id
            JOIN categories ON categories.id = recipes.category_id
            WHERE recipes.status = 'approved'
            ORDER BY recipes.created_at DESC
            LIMIT ?
        ");
        $approvedRecipesStatement->bindValue(1, $limit, PDO::PARAM_INT);
        $approvedRecipesStatement->execute();

        return $approvedRecipesStatement->fetchAll();
    }

    public function findApprovedById(int $recipeId): ?array
    {
        $recipeDetailStatement = $this->databaseConnection->prepare("
            SELECT recipes.*, users.display_name, categories.name AS category_name
            FROM recipes
            JOIN users ON users.id = recipes.user_id
            JOIN categories ON categories.id = recipes.category_id
            WHERE recipes.id = ? AND recipes.status = 'approved'
        ");
        $recipeDetailStatement->execute([$recipeId]);
        $recipe = $recipeDetailStatement->fetch();

        return $recipe ?: null;
    }

    public function getApprovedByCategory(int $categoryId): array
    {
        $categoryRecipesStatement = $this->databaseConnection->prepare("
            SELECT recipes.*, users.display_name, categories.name AS category_name
            FROM recipes
            JOIN users ON users.id = recipes.user_id
            JOIN categories ON categories.id = recipes.category_id
            WHERE recipes.category_id = ? AND recipes.status = 'approved'
            ORDER BY recipes.created_at DESC
        ");
        $categoryRecipesStatement->execute([$categoryId]);

        return $categoryRecipesStatement->fetchAll();
    }

    public function create(array $data): bool
    {
        $createRecipeStatement = $this->databaseConnection->prepare("
            INSERT INTO recipes
            (user_id, category_id, title, slug, description, ingredients, cooking_type, difficulty, cooking_time_minutes, image, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
        ");

        return $createRecipeStatement->execute([
            $data['user_id'],
            $data['category_id'],
            $data['title'],
            $data['slug'],
            $data['description'],
            $data['ingredients'],
            $data['cooking_type'],
            $data['difficulty'],
            $data['cooking_time_minutes'],
            $data['image'],
        ]);
    }

    public function findByIdForUser(int $recipeId, int $userId): ?array
    {
        $userRecipeStatement = $this->databaseConnection->prepare("
            SELECT *
            FROM recipes
            WHERE id = ? AND user_id = ?
        ");
        $userRecipeStatement->execute([$recipeId, $userId]);
        $recipe = $userRecipeStatement->fetch();

        return $recipe ?: null;
    }

    public function updateByUser(int $recipeId, int $userId, array $data): bool
    {
        $updateRecipeStatement = $this->databaseConnection->prepare("
            UPDATE recipes
            SET category_id = ?,
                title = ?,
                slug = ?,
                description = ?,
                ingredients = ?,
                cooking_type = ?,
                difficulty = ?,
                cooking_time_minutes = ?,
                image = ?,
                status = 'pending',
                updated_at = NOW()
            WHERE id = ? AND user_id = ?
        ");

        return $updateRecipeStatement->execute([
            $data['category_id'],
            $data['title'],
            $data['slug'],
            $data['description'],
            $data['ingredients'],
            $data['cooking_type'],
            $data['difficulty'],
            $data['cooking_time_minutes'],
            $data['image'],
            $recipeId,
            $userId,
        ]);
    }

    public function updateStatus(int $recipeId, string $status): bool
    {
        $updateRecipeStatusStatement = $this->databaseConnection->prepare("UPDATE recipes SET status = ?, updated_at = NOW() WHERE id = ?");
        return $updateRecipeStatusStatement->execute([$status, $recipeId]);
    }

    public function getByUser(int $userId): array
    {
        $userRecipesStatement = $this->databaseConnection->prepare("
            SELECT recipes.*, categories.name AS category_name
            FROM recipes
            JOIN categories ON categories.id = recipes.category_id
            WHERE user_id = ?
            ORDER BY created_at DESC
        ");
        $userRecipesStatement->execute([$userId]);

        return $userRecipesStatement->fetchAll();
    }

    public function getAllForAdmin(): array
    {
        return $this->databaseConnection->query("
            SELECT recipes.*, users.username, categories.name AS category_name
            FROM recipes
            JOIN users ON users.id = recipes.user_id
            JOIN categories ON categories.id = recipes.category_id
            ORDER BY recipes.created_at DESC
        ")->fetchAll();
    }

    public function delete(int $recipeId): bool
    {
        $deleteRecipeStatement = $this->databaseConnection->prepare("DELETE FROM recipes WHERE id = ?");
        return $deleteRecipeStatement->execute([$recipeId]);
    }
}

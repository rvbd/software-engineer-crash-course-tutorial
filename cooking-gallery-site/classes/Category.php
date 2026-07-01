<?php

class Category
{
    private PDO $databaseConnection;

    public function __construct(PDO $databaseConnection)
    {
        $this->databaseConnection = $databaseConnection;
    }

    public function getAll(): array
    {
        $allCategoriesStatement = $this->databaseConnection->query("SELECT * FROM categories ORDER BY name ASC");
        return $allCategoriesStatement->fetchAll();
    }

    public function findById(int $categoryId): ?array
    {
        $categoryStatement = $this->databaseConnection->prepare("SELECT * FROM categories WHERE id = ?");
        $categoryStatement->execute([$categoryId]);
        $category = $categoryStatement->fetch();

        return $category ?: null;
    }

    public function create(string $name, string $slug): bool
    {
        $createCategoryStatement = $this->databaseConnection->prepare("INSERT INTO categories (name, slug) VALUES (?, ?)");
        return $createCategoryStatement->execute([$name, $slug]);
    }

    public function update(int $categoryId, string $name, string $slug): bool
    {
        $updateCategoryStatement = $this->databaseConnection->prepare("UPDATE categories SET name = ?, slug = ? WHERE id = ?");
        return $updateCategoryStatement->execute([$name, $slug, $categoryId]);
    }

    public function delete(int $categoryId): bool
    {
        $deleteCategoryStatement = $this->databaseConnection->prepare("DELETE FROM categories WHERE id = ?");
        return $deleteCategoryStatement->execute([$categoryId]);
    }
}

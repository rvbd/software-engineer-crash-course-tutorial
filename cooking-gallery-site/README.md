# Cooking Gallery Site

Runnable PHP/MySQL example site for screenshots and for validating the Cooking Gallery training slides.

## URL

Open the site through XAMPP:

```text
http://localhost/crash-course/cooking-gallery-site
```

## Database Setup

The schema is intentionally manual for teaching. Open phpMyAdmin and run the SQL files in this order:

1. `database/01_schema.sql`
2. `database/02_seed_categories.sql`
3. `database/03_seed_demo_data.sql`

Database name:

```text
cooking_gallery_site
```

## Demo Logins

```text
Admin:
username: admin
password: admin123

Approved user:
username: maya
password: user123

Pending user:
username: budi
password: user123
```

The pending user is included to test that unapproved users cannot log in.

## Recipe Editing and Images

Approved users can create recipes, edit their own recipes, and optionally upload a recipe image.

- Supported image formats: JPG, PNG, WEBP.
- Maximum image size: 2MB.
- New and edited recipes return to `pending` so admin can review them.
- Uploaded images are stored in `uploads/`.

## Teaching Note

This project does not auto-create database tables from PHP. Students should import SQL manually so they can see the schema and seed data in phpMyAdmin.

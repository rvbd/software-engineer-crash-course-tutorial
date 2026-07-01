# Cooking Gallery Slides

Reveal.js slides for **Cooking Gallery**, an Indonesian beginner tutorial about building a PHP + MySQL recipe website with OOP and basic security.

This repository contains the tutorial slides only. The slides are static HTML/CSS/JS and can be hosted on GitHub Pages.

The actual Cooking Gallery PHP/MySQL application must be run locally using XAMPP. GitHub Pages cannot run PHP or MySQL.

## Run Locally

Install dependencies:

```bash
npm install
```

Start a local dev server:

```bash
npm start
```

Then open the URL shown by Vite, usually:

```text
http://127.0.0.1:5173
```

You can also open `index.html` directly in a browser because the deck uses CDN assets for Reveal.js and Mermaid.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository.
2. Open the repository settings.
3. Go to **Pages**.
4. Choose the branch that contains `index.html`.
5. Save the setting.

GitHub Pages will host the static Reveal.js presentation.

## Important XAMPP Note

The slides teach students how to build a local PHP/MySQL project:

```text
C:\xampp\htdocs\cooking-gallery
```

That project should be opened through:

```text
http://localhost/cooking-gallery
```

Do not try to run PHP or MySQL on GitHub Pages. GitHub Pages is only for this presentation.

## Folder Structure

```text
cooking-gallery-slides/
├── index.html
├── README.md
├── package.json
└── assets/
    ├── css/
    │   └── theme.css
    ├── js/
    │   ├── footer.js
    │   └── slides.js
    └── images/
```

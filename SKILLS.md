# Cooking Gallery Slides Working Notes

## Slide Transition Convention

- Normal teaching slides use the deck default Reveal transition: `slide`.
- Topic-change slides use `data-transition="zoom"` so the audience feels a clear chapter shift.
- A slide counts as a topic-change slide when its `className` includes one of:
  - `hero-title`
  - `chapter`
  - `case-study-divider`
- The transition is assigned automatically in `cooking-gallery-slides/assets/js/slides.js`.
- If a future slide needs a custom transition, set `transition` on that slide object instead of hardcoding HTML attributes.

## Teaching Style Convention

- Explain new concepts through a simple story or everyday analogy before introducing the programming term.
- Use generated images for analogy visuals when the analogy benefits from a concrete picture.
- Use Mermaid for exact ERD/class/flow diagrams where readable labels and table names matter.
- Before a major new concept section, add a hero/chapter divider slide first, then continue with detail slides.
- Before showing real PHP class files, introduce PHP class anatomy first: `class`, properties, `__construct()`, methods, `$this`, and `new`.

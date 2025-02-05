---
pagination:
  data: collections.ingredients_drink
  size: 1
  alias: ingredient
  addAllPagesToCollections: true
permalink: "recipes/ingredients/drink/{{ ingredient | slugify }}/"
eleventyNavigation:
  parent: drink
eleventyComputed:
  title:  "{{ ingredient }}"
  eleventyNavigation:
    key: "{{ ingredient | slugify }}"
---

list of all recipes using {{ title }}

<!-- {{ collections.all | eleventyNavigation: "drink" | eleventyNavigationToMarkdown }} -->

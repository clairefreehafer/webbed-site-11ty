---
pagination:
  data: collections.ingredients_food
  size: 1
  alias: ingredient
  addAllPagesToCollections: true
permalink: "recipes/ingredients/food/{{ ingredient | slugify }}/"
eleventyNavigation:
  parent: food
eleventyComputed:
  title:  "{{ ingredient }}"
  eleventyNavigation:
    key: "{{ ingredient | slugify }}"
---

list of all recipes using {{ title }}

<!-- {{ collections.all | eleventyNavigation: "food" | eleventyNavigationToMarkdown }} -->

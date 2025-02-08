---
pagination:
  data: collections.ingredients
  size: 1
  alias: ingredient
  addAllPagesToCollections: true
permalink: "/recipes/ingredients/{{ ingredient | slugify }}.html"
eleventyComputed:
  title:  "recipes with {{ ingredient }}"
  eleventyNavigation:
    parent: "{{ ingredient.type[1] | slugify }}"
    key: "{{ ingredient.name | slugify }}"
    title: "{{ ingredient.name }}"
---

{{ title }}
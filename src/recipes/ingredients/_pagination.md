---
pagination:
  data: collections.ingredients
  size: 1
  alias: ingredient
  addAllPagesToCollections: true
permalink: "/recipes/ingredients/{{ ingredient.type[0] }}/{{ ingredient.type[1] }}/{{ ingredient.name | slugify }}/index.html"
eleventyComputed:
  title:  "{{ ingredient.name }}"
  eleventyNavigation:
    parent: "{{ ingredient.type[1] | slugify }}"
    key: "{{ ingredient.name | slugify }}"
---

{{ title }}
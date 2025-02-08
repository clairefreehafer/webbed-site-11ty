---
pagination:
  data: collections.ingredients
  size: 1
  alias: ingredient
  addAllPagesToCollections: true
permalink: "/recipes/ingredients/{{ ingredient | slugify }}/index.html"
showTitle: true
eleventyComputed:
  title:  "recipes with {{ ingredient }}"
  eleventyNavigation:
    parent: "{{ ingredient.type[1] | slugify }}"
    key: "{{ ingredient.name | slugify }}"
    title: "{{ ingredient.name }}"
---

{%- for recipes in collections[ingredient] %}
- [{{ recipes.data.title }}]({{ recipes.url }})
{% endfor -%}

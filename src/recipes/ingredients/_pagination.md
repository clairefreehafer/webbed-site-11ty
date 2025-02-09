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
---

{%- for recipes in collections[ingredient] %}
- [{{ recipes.data.title }}]({{ recipes.url }})
{% endfor -%}

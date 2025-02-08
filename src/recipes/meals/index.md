---
title: meal recipes
showTitle: true
---

{%- for recipe in collections.meals %}
- [{{ recipe.data.title }}]({{ recipe.data.page.url }})
{% endfor -%}
---
title: meal recipes
---

{%- for recipe in collections.meals %}
- [{{ recipe.data.title }}]({{ recipe.data.page.url }})
{% endfor -%}
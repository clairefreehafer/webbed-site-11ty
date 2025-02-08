---
title: meal recipes
showTitle: true
---

{%- for recipe in collections.meals reversed %}
- [{{ recipe.data.title }}]({{ recipe.data.page.url }})
{% endfor -%}
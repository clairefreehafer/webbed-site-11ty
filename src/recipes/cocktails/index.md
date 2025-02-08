---
title: cocktail recipes
showTitle: true
---

{%- for recipe in collections.cocktails %}
- [{{ recipe.data.title }}]({{ recipe.data.page.url }})
{% endfor -%}
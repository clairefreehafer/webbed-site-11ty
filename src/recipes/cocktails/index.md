---
title: cocktail recipes
---

{%- for recipe in collections.cocktails %}
- [{{ recipe.data.title }}]({{ recipe.data.page.url }})
{% endfor -%}
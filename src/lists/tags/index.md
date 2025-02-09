---
title: list tags
---

{%- for tag in collections.listItems %}
- [{{ tag }}](/lists/tags/{{ tag }})
{% endfor %}
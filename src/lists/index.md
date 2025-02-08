---
tags: root
title: lists
date: 1903-01-01
layout: default/default.webc
---

my collection of lists, a la the days of del.icio.us and listography.

{%- for list in collections.lists %}
- [{{ list.data.title }}]({{ list.data.page.url }})
{% endfor -%}

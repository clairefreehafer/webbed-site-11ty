---
pagination:
  data: collections.listItems
  size: 1
  alias: tag
  addAllPagesToCollections: true
permalink: "/lists/tags/{{ tag | slugify }}/index.html"
showTitle: true
layout: default/default.webc
eleventyComputed:
  title:  "lists with {{ tag }}"
---

{{ layout }}

{{ collections.books.length }}

{%- for list in collections[tag] %}
- [{{ list.data.title }}]({{ list.url }})
{% endfor -%}
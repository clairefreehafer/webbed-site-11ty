---
title: ingredients
eleventyNavigation:
  key: ingredients
  parent: recipes
---

### food

{{ collections.all | eleventyNavigation: "food" | eleventyNavigationToMarkdown }}

### drink

{{ collections.all | eleventyNavigation: "drink" | eleventyNavigationToMarkdown }}
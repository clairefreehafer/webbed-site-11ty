---
title: food ingredients
eleventyNavigation:
  key: food
  parent: ingredients
---

{{ page.inputPath }}

{{ collections.all | eleventyNavigation: "food" | eleventyNavigationToMarkdown }}

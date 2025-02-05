---
title: drink ingredients
eleventyNavigation:
  key: drink
  parent: ingredients
---

{{ page.inputPath }}

{{ collections.all | eleventyNavigation: "drink" | eleventyNavigationToMarkdown }}

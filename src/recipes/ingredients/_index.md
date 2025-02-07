---js
{
  pagination: {
    data: "collections.ingredients",
    size: 1,
    alias: "ingredientType",
    addAllPagesToCollections: true,
    before: function(paginationData, _fullData) {
      const ingredientTypeAdded = [];
      const ingredientTypePermalinks = [
        {
          permalink: "recipes/ingredients/food/index.html",
          key: "food",
          parent: "ingredients",
        }, {
          permalink: "recipes/ingredients/drink/index.html",
          key: "drink",
          parent: "ingredients"
        }
      ];

      for (const item of paginationData) {
        const permalink = `recipes/ingredients/${item.type.join("/")}/index.html`;
        const parent = item.type[0];
        const key = item.type[1];
        if (!ingredientTypeAdded.includes(item.type[1])) {
          ingredientTypePermalinks.push({
            permalink,
            parent,
            key
          });
          ingredientTypeAdded.push(item.type[1])
        }
      }
      console.log(ingredientTypePermalinks)
      return ingredientTypePermalinks;
    }
  },
  permalink: "{{ ingredientType.permalink }}",
  eleventyComputed: {
    title: "{{ ingredientType.key }}",
    eleventyNavigation: {
      parent: "{{ ingredientType.parent | slugify }}",
      key: "{{ ingredientType.key | slugify }}"
    }
  }
}
---

{{ permalink }}
function generateCollections(eleventyConfig) {
  eleventyConfig.addCollection("lists", (collectionsApi) => {
    const listsCollection = collectionsApi
      .getFilteredByGlob('src/lists/**/*.md')
      .filter((list) => !list.page.inputPath.includes("index"));
    console.log(`[11ty] Creating "lists" collection with ${listsCollection.length} item(s)`);
    return listsCollection;
  });

  eleventyConfig.addCollection("listItems", (collectionsApi) => {
    const lists = collectionsApi
      .getFilteredByGlob('src/lists/**/*.md')
      .filter((list) => !list.page.inputPath.includes("index"));
    const listItemsCollection = [];

    for (const list of lists) {
      const { listItems } = list.data;
      for (const listItem of listItems) {
        if (listItemsCollection.indexOf(listItem) === -1) {
          listItemsCollection.push(listItem);
        }
      }
    }

    console.log(`[11ty] Creating "listItems" collection with ${listItemsCollection.length} item(s)`);
    return listItemsCollection;
  });
}

export default function(eleventyConfig) {
  generateCollections(eleventyConfig);
}
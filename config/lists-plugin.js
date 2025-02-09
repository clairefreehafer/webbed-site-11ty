function generateCollections(eleventyConfig) {
  eleventyConfig.addCollection("lists", (collectionsApi) => {
    const listsCollection = collectionsApi
      .getFilteredByGlob('src/lists/**/*.md')
      .filter((list) => !list.page.inputPath.includes("index") && !list.page.inputPath.includes("tags"));
    console.log(`[11ty] Creating "lists" collection with ${listsCollection.length} item(s)`);
    return listsCollection;
  });

  eleventyConfig.addCollection("listItems", (collectionsApi) => {
    const lists = collectionsApi
      .getFilteredByGlob('src/lists/**/*.md')
      .filter((list) => !list.page.inputPath.includes("index"));
    const listItemsCollection = [];
    const collectionsToCreate = {};

    for (const list of lists) {
      const { listItems } = list.data;
      if (listItems) {
        // add to collections.listItems
        for (const listItem of listItems) {
          if (listItemsCollection.indexOf(listItem) === -1) {
            listItemsCollection.push(listItem);
          }
          // add page to list item collection
          if (collectionsToCreate[listItem]) {
            collectionsToCreate[listItem].push(list);
          } else {
            collectionsToCreate[listItem] = [list];
          }
        }
      }
    }

    // create collection for each list item
    for (const item in collectionsToCreate) {
      if (!eleventyConfig.getCollections()[item]) {
        console.log(`[11ty] Creating "${item}" collection with ${collectionsToCreate[item].length} item(s)`);
        eleventyConfig.addCollection(item, (_collectionsApi) => {
          return collectionsToCreate[item];
        });
      }
    }

    console.log(`[11ty] Creating "listItems" collection with ${listItemsCollection.length} item(s)`);
    return listItemsCollection;
  });
}

export default function(eleventyConfig) {
  generateCollections(eleventyConfig);
}
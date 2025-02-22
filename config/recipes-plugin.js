import ingredientTypesData from "../src/_data/recipes/ingredientTypes.json" with { type: "json" };

function generateCollections(eleventyConfig) {
  eleventyConfig.addCollection("ingredients", (collectionsApi) => {
    const collectionsToCreate = {
      meals: [],
      cocktails: [],
    };
    const ingredientsToAdd = [];
    const recipes = collectionsApi
      .getFilteredByGlob('src/recipes/**/*.md')
      .filter((recipe) => !recipe.page.inputPath.includes("index"));

    for (const recipe of recipes) {
      const { ingredients, page } = recipe.data;
      // add recipe to recipe type
      if (page.url.includes('meals')) {
        collectionsToCreate.meals.push(recipe);
      } else {
        collectionsToCreate.cocktails.push(recipe);
      }
      for (const ingredient of ingredients) {
        // add ingredient to collections.ingredients
        if (!ingredientsToAdd.includes(ingredient)) {
          ingredientsToAdd.push(ingredient);
        }
        // add page to ingredient collection
        if (collectionsToCreate[ingredient]) {
          collectionsToCreate[ingredient].push(recipe);
        } else {
          collectionsToCreate[ingredient] = [recipe];
        }
      }
    }


    for (const item in collectionsToCreate) {
      if (!eleventyConfig.getCollections()[item]) {
        // console.log(`[11ty] Creating "${item}" collection with ${collectionsToCreate[item].length} item(s)`);
        eleventyConfig.addCollection(item, (_collectionsApi) => {
          return collectionsToCreate[item];
        });
      }
    }

    return ingredientsToAdd;
  });
}

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function(eleventyConfig) {
  generateCollections(eleventyConfig);
}
import ingredientTypesData from "../src/_data/recipes/ingredientTypes.json" with { type: "json" };

const PATH_MAPPING = {
  food: "meals",
  drink: "cocktails",
};

const foodData = ingredientTypesData[0];
const drinkData = ingredientTypesData[1];

function generateIngredientArrays(collectionsApi) {
    const ingredientObjects = [];
    const ingredientsAdded = [];

    for (const ingredientType in PATH_MAPPING) {
      const recipes = collectionsApi
        .getFilteredByGlob(`src/recipes/${PATH_MAPPING[ingredientType]}/*.md`)
        .filter((recipe) => !recipe.page.inputPath.includes("index"));

        for (const recipe of recipes) {
          const { ingredients } = recipe.data;

          for (const ingredient of ingredients) {
            // check if we've processed the ingredient already or not.
            if (ingredientsAdded.indexOf(ingredient) === -1) {
              const foodSubType = foodData.items.find((item) => item.items.includes(ingredient))?.name;
              const drinkSubType = drinkData.items.find((item) => item.items.includes(ingredient))?.name;
              ingredientObjects.push({
                name: ingredient,
                type: [ingredientType, foodSubType ?? drinkSubType]
              });

              ingredientsAdded.push(ingredient);
            }
          }
        }
    }

    return ingredientObjects;
}

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function(eleventyConfig) {
  eleventyConfig.addCollection("ingredients", (collectionsApi) => {
    return generateIngredientArrays(collectionsApi);
  });
}
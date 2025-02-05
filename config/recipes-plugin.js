const PATH_MAPPING = {
  food: "meals",
  drink: "cocktails",
};

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
/** @param {"food" | "drink"} ingredientType */
function generateIngredientCollection(eleventyConfig, ingredientType) {
  eleventyConfig.addCollection(`ingredients_${ingredientType}`, (collectionsApi) => {
    const recipes = collectionsApi
      .getFilteredByGlob(`src/recipes/${PATH_MAPPING[ingredientType]}/*.md`)
      .filter((recipe) => !recipe.page.inputPath.includes("index"));

    const ingredientsOfType = [];

    for (const recipe of recipes) {
      const { ingredients } = recipe.data;

      for (const ingredient of ingredients) {
        if (ingredientsOfType.indexOf(ingredient) === -1) {
          ingredientsOfType.push(ingredient);
        }
      }
    }
    console.log(`[11ty] Adding ${ingredientsOfType.length} food ingredients.`);
    return ingredientsOfType;
  });
}

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function(eleventyConfig) {
  for (const ingredientType in PATH_MAPPING) {
    generateIngredientCollection(eleventyConfig, ingredientType);
  }
}
import * as sass from "sass";
import path from "node:path";
import { transform } from "lightningcss";

import pluginWebc from "@11ty/eleventy-plugin-webc";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import recipesPlugin from "./config/recipes-plugin.js";
import listsPlugin from "./config/lists-plugin.js";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setLayoutsDirectory("_layouts");

  eleventyConfig.addPlugin(pluginWebc, {
    components: "src/_components/**/*.webc",
  });
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(recipesPlugin);
  eleventyConfig.addPlugin(listsPlugin);

  eleventyConfig.addPassthroughCopy({ "src/_fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "src/_style/base.css": "css/base.css" });
  eleventyConfig.addPassthroughCopy({ "src/_js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/_images": "images" });
  eleventyConfig.addPassthroughCopy("src/favicon.ico");

  // eleventyConfig.addCollection("meals", (collectionsApi) => {
  //   const pagesToAdd = collectionsApi.getFilteredByGlob("src/recipes/meals/*.md");
  //   console.log(`[11ty] Adding ${pagesToAdd.length} page(s) to "meals" collection`);
  //   return pagesToAdd;
  // });


  // eleventyConfig.addFilter("recipesWithIngredient", (collection, ingredient) => {
  //   // if (!ingredient) return collection;
  //   return collection.filter((item) => {
  //     console.log('$$$$$', item)
  //     return item.data.ingredients.includes(ingredient)
  //   });
  // });

  // copied from https://github.com/5t3ph/eleventy-plugin-sass-lightningcss
  // with some tweaks to use a custom output path.
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: async function (inputContent, inputPath) {
      const parsed = path.parse(inputPath);
      if (parsed.name.startsWith("_")) {
        return;
      }

      // let targets = browserslistToTargets(browserslist(browserslistTargets));

      const result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || "."],
        sourceMap: false,
      });

      this.addDependencies(inputPath, result.loadedUrls);

      return async () => {
        let { code } = transform({
          code: Buffer.from(result.css),
          minify: true,
          sourceMap: false,
          // targets,
        });
        return code;
      };
    },
    compileOptions: {
      permalink: function(_contents, inputPath) {
        return (data) => {
          const parsed = path.parse(inputPath);
          if (parsed.name.startsWith("_")) {
            return false;
          }
          const filePathSplit = data.page.filePathStem.split('/');
          const parentFolderName = filePathSplit[filePathSplit.length - 2];
          return `css/${parentFolderName}.css`;
        }
      }
    }
  });
};

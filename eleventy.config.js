import pluginWebc from "@11ty/eleventy-plugin-webc";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import * as sass from "sass";
import path from "node:path";
import { transform } from "lightningcss";

export default async function(eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setLayoutsDirectory("_layouts");

  eleventyConfig.addPlugin(pluginWebc, {
    components: "src/_components/**/*.webc",
  });
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addPassthroughCopy({ "src/_fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "src/_style/base.css": "css/base.css" });
  eleventyConfig.addPassthroughCopy("src/favicon.ico");

  eleventyConfig.addCollection("meals", (collectionApi) => {
    const pagesToAdd = collectionApi.getFilteredByGlob("src/recipes/meals/*.md");
    console.log(`[11ty] Adding ${pagesToAdd.length} page(s) to "meals" collection`);
    return pagesToAdd;
  }
  );

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

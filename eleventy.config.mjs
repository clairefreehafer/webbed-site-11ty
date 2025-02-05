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
  eleventyConfig.addPassthroughCopy("favicon.ico");

  // copied from https://github.com/5t3ph/eleventy-plugin-sass-lightningcss
  // with some tweaks to use a custom output path.
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: async function (inputContent, inputPath) {
      let parsed = path.parse(inputPath);
      if (parsed.name.startsWith("_")) {
        return;
      }

      // let targets = browserslistToTargets(browserslist(browserslistTargets));

      let result = sass.compileString(inputContent, {
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
      permalink: function(contents, inputPath) {
        return (data) => {
          let parsed = path.parse(inputPath);
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

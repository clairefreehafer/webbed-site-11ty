import pluginWebc from "@11ty/eleventy-plugin-webc";
import sass from "sass";

export default function(eleventyConfig) {
  eleventyConfig.setLayoutsDirectory("_layouts");
	eleventyConfig.addPlugin(pluginWebc);

  eleventyConfig.addExtension("scss", {
		outputFileExtension: "css", // optional, default: "html"

		// `compile` is called once per .scss file in the input directory
		compile: async function (inputContent) {
			const result = sass.compileString(inputContent);

			// This is the render function, `data` is the full data cascade
			return async (_data) => {
				return result.css;
			};
		},
	});
};

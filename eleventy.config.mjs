import pluginWebc from "@11ty/eleventy-plugin-webc";
import eleventySass from "@11tyrocks/eleventy-plugin-sass-lightningcss";

export default async function(eleventyConfig) {
  eleventyConfig.setLayoutsDirectory("_layouts");

	eleventyConfig.addPlugin(pluginWebc);
	eleventyConfig.addPlugin(eleventySass);

	eleventyConfig.addPassthroughCopy("css/**/*.css");
	eleventyConfig.addPassthroughCopy("fonts/**");
};

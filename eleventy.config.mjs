import pluginWebc from "@11ty/eleventy-plugin-webc";
import eleventySass from "@11tyrocks/eleventy-plugin-sass-lightningcss";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

export default async function(eleventyConfig) {
  eleventyConfig.setLayoutsDirectory("_layouts");

	eleventyConfig.addPlugin(pluginWebc);
	eleventyConfig.addPlugin(eleventySass);
	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	eleventyConfig.addPassthroughCopy("css/**/*.css");
	eleventyConfig.addPassthroughCopy("fonts/**");
	eleventyConfig.addPassthroughCopy("favicon.ico");
};

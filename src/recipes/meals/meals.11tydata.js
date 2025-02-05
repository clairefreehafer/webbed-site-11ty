export default {
	eleventyComputed: {
		eleventyNavigation: {
			parent: (data) => data.page.fileSlug !== "meals" ? "meals" : "recipes"
		},
	},
};


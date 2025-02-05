export default {
	eleventyComputed: {
		eleventyNavigation: {
			parent: (data) => data.page.fileSlug !== "cocktails" ? "cocktails" : "recipes"
		},
	},
};


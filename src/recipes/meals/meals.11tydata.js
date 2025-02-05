export default {
	eleventyComputed: {
		eleventyNavigation: {
			// TODO: can probably abstract this and move up to recipes.11tydata somehow
			parent: (data) => data.page.fileSlug !== "meals" ? "meals" : "recipes"
		},
	},
};


export default {
	eleventyComputed: {
		eleventyNavigation: {
			key: (data) => data.page.fileSlug,
			parent: (data) => data.page.fileSlug !== 'recipes' ? 'recipes' : undefined
		},
	},
  layout: "default/base.webc"
};


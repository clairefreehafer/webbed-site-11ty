export default {
	eleventyComputed: {
		eleventyNavigation: {
			key: (data) => data.page.fileSlug,
			parent: (data) => data.page.fileSlug !== 'lists' ? 'lists' : undefined
		},
	},
  layout: "default/base.webc"
};


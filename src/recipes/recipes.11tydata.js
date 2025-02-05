export default {
	eleventyComputed: {
		eleventyNavigation: {
			key: (data) => data.page.fileSlug,
			title: (data) => data.title,
		},
	},
  layout: "default/base.webc"
};


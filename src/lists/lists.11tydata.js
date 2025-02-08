export default {
  eleventyComputed: {
		layout: (data) => !data.page.inputPath.includes('index') ? 'default/list.webc' : 'default/default.webc'
	},
	theme: "default"
};


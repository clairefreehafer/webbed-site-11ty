export default {
	eleventyComputed: {
		layout: (data) => !data.page.inputPath.includes('index') ? 'default/recipe.webc' : 'default/default.webc'
	}
};


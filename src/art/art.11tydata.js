export default {
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.page.fileSlug,
      title: (data) => data.title,
      // parent: (data) => {
      // 	console.log(data.page.inputPath);
      // 	const splitInputPath = data.page.inputPath.split('/');
      // 	const parentFolder = splitInputPath[splitInputPath.length - ];
      // 	console.log(parentFolder)
      // 	return parentFolder;
      // }
    },
  },
};


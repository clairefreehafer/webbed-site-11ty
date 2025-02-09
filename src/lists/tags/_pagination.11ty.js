export const data = {
  pagination: {
    data: "collections.listItems",
    size: 1,
    alias: "tag",
    addAllPagesToCollections: true,
  },
  permalink: function (data) {
		return `lists/tags/${this.slugify(data.tag)}/index.html`;
	},
  showTitle: true,
  layout: "default/default.webc",
  eleventyComputed: {
    title: (data) => `lists with ${data.tag}`,
  }
}

export function render(data) {
  return `
    <ul>
      ${data.collections.books.map((list) => `
        <li>
          <a href="${list.url}">${list.data.title}</a>
        </li>
      `)}
    </ul>
    <p>
      <a href="/lists/tags">all tags</a>
    </p>
  `
}
# remark-embed-tag

A remark plugin to render a html embed for markdown files.

This plugin can be used with [Astro](https://docs.astro.build/en/guides/markdown-content/#markdown-plugins), [Gatsby](https://www.gatsbyjs.com/tutorial/remark-plugin-tutorial/), [Docusaurus](https://docusaurus.io/docs/next/markdown-features/plugins) and all other frameworks that support [remark plugins](https://github.com/remarkjs/remark#plugins).

Write this in your markdown file:

```markdown
{% steam 1260810 %}
```

and it gets transformed to

```html
<iframe
  src="https://store.steampowered.com/widget/1260810/"
  frameborder="0"
  height="190"
></iframe>
```

## Install

```bash
npm install remark-embed-tag
```

## Usage

```javascript
import remark from "remark";
import embedTag from "remark-embed-tag";

remark()
  .use(embedTag)
  .process("Hello {% steam 1260810 %}", function (err, file) {
    if (err) throw err;
    console.log(String(file));
  });

// Output: Hello <iframe src="https://store.steampowered.com/widget/1260810/" frameborder="0" height="190"></iframe>
```

## Features

### Steam

```markdown
{% steam appid optional_desc %}
```

- `appid` (required): The Steam appid of the game.
- `optional_desc` (optional): The description of the game. If not provided, the game description pulled from Steam will be used.

Example:

```markdown
{% steam 1260810 "This is my proudest game" %}
```

## Credits

This embed-tag syntax is inspired by [Hexo's tag embed](https://github.com/hexojs/hexo-tag-embed). I used to be a Hexo user and I really liked the simplicity of the embed tag. Now, I am moving to Astro and I wanted to have the same feature. Hence, I created this plugin.

While coding, I referred to the following projects:

- [remark-hexo](https://github.com/bennycode/remark-hexo)
- [remark-oembed](https://github.com/sergioramos/remark-oembed)
- [hexo-tag-steamgame](https://github.com/HCLonely/hexo-tag-steamgame)

This package is bootstraped with [typescript-npm-package-starter](https://github.com/el3um4s/typescript-npm-package-starter)

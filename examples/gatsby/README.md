# example-gatsby

Created with:

```bash
npm init gatsby
cd my-gatsby-site
yarn
```

## How to use Flayyer

> Follow this guide: [docs.flayyer.com/guides/javascript/gatsbyjs](https://docs.flayyer.com/guides/javascript/gatsbyjs)

```bash
# Add Flayyer formatter and SEO stuff
yarn add @flayyer/flayyer gatsby-plugin-react-helmet react-helmet
```

Just add the plugin to the plugins array in your `gatsby-config.js`

```js
plugins: [`gatsby-plugin-react-helmet`],
```

Then on your pages use `react-helmet` to manipulate the contents of the `<head />`:

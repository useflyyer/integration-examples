# example-docusaurus

Created with:

```bash
npx @docusaurus/init@latest init my-docusaurus classic
cd my-docusaurus
```

## How to use Flayyer

> Follow this guide: [docs.flayyer.com/guides/javascript/docusaurus](https://docs.flayyer.com/guides/javascript/docusaurus)

```bash
yarn add @flayyer/docusaurus-preset
```

On your docusaurus.config.js add @flayyer/docusaurus-preset at the end of your preset array:

```js
{
  // ...
  presets: [
    // ...
    [
      "@flayyer/docusaurus-preset",
      {
        // Use this for the root "/"
        main: { tenant: "flayyer", deck: "flayyer-docs", template: "page" },
        // Use this flayyer for individual documentation pages
        docs: {
          tenant: "flayyer",
          deck: "flayyer-docs",
          template: "page",
          variables: {
            // Enable variable replacement
            title: "{{id}} - {{title}}",
            description: "{{description}}",
            static: "Plain hardcoded string",
          },
        },
        // Use this flayyer for individual blogpost pages
        blog: {
          tenant: "flayyer",
          deck: "flayyer-docs",
          template: "page",
          // Pick values form the context
          variables: ["title", "description"],
        },
      },
    ],
  ],
}
```


# example-next

Created with:

```bash
yarn create next-app my-app
cd my-app
```

## How to use Flayyer

> Follow this guide: [docs.flayyer.com/guides/javascript/nextjs](https://docs.flayyer.com/guides/javascript/nextjs)

```bash
# Add Flayyer formatter and SEO stuff
yarn add @flayyer/flayyer
```

We recommend create a default flayyer in the _app.js of you app, so every page has one by default. Note we are adding a `key="..."` prop to the `<meta />` tags we will overwrite.

```js
// pages/_app.js
import Head from 'next/head';
import { useRouter } from "next/router";
import Flayyer from "@flayyer/flayyer"

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const flayyer = new Flayyer({
    // ...
  });

  return (
    <>
      <Head>
        <title key="title">My page title</title>
        <meta key="og:image" property="og:image" content={flayyer.href()} />
        <meta key="twitter:image" name="twitter:image" content={flayyer.href()} />
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
```

Now you can overwrite it on any page, see the example at [pages/pokemon/[name].js](./pages/pokemon/[name].js).

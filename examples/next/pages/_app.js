import Head from 'next/head';
import { useRouter } from "next/router";
import { Flayyer } from "@flayyer/flayyer"

import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Default flayyer for every page.
  const flayyer = new Flayyer({
    tenant: "your-tenant-slug",
    deck: "my-project",
    template: "main",
    variables: {
      title: "Hello world!",
    },
    meta: {
      id: router.asPath, // for analytics
    },
  });

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <title key="title">My page title</title>
        <meta key="og:image" property="og:image" content={flayyer.href()} />
        <meta key="twitter:image" name="twitter:image" content={flayyer.href()} />
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

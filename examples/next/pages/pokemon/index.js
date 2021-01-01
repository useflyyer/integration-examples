import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Flayyer from "@flayyer/flayyer";

export default function PokemonIndex({ data, ...props }) {
  const router = useRouter();

  const results = data["results"];

  const flayyer = new Flayyer({
    tenant: "your-tenant-slug",
    deck: "my-project",
    template: "main",
    variables: {
      title: "Pokemon index",
    },
    meta: {
      id: router.asPath, // for analytics
    },
  });

  return (
    <>
      <Head>
        <title key="title">Pokemon index</title>
        <meta key="og:image" property="og:image" content={flayyer.href()} />
        <meta key="twitter:image" name="twitter:image" content={flayyer.href()} />
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      </Head>
      <main {...props}>
        <h1>
          Pokemon index
        </h1>
        <ul>
          {results.map(item => (
            <li key={item["name"]}>
              {item["name"]} <Link href={`/pokemon/${item["name"]}`}>view</Link>
            </li>
          ))}
        </ul>

        <p>
          <Link href="/">Go back to home</Link>
        </p>

        <hr />

        <p>
          Your overwrote the default at _app.js and the current flayyer URL is:
        </p>
        <pre>
          {flayyer.href()}
        </pre>
        <p>
          The generatedHTML has the following code:
        </p>
        <pre>
{`
<head>
  <meta property="og:image" content="${flayyer.href()}" />
  <meta name="twitter:image" content="${flayyer.href()}" />
  <meta name="twitter:card" content="summary_large_image" />
</head>
`}
        </pre>
      </main>
    </>
  )
}

export const getServerSideProps = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon", {
    headers: {
      ["Accept"]: "application/json",
    },
  });
  const data = await response.json();
  return { props: { data } };
}

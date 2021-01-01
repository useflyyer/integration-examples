import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Flayyer from "@flayyer/flayyer";

export default function PokemonShow({ data, ...props }) {
  const router = useRouter();

  const flayyer = new Flayyer({
    tenant: "your-tenant-slug",
    deck: "my-project",
    template: "main",
    variables: {
      title: data["name"],
    },
    meta: {
      id: router.asPath, // for analytics
    },
  });

  return (
    <>
      <Head>
        <title key="title">{data["name"]}</title>
        <meta key="og:image" property="og:image" content={flayyer.href()} />
        <meta key="twitter:image" name="twitter:image" content={flayyer.href()} />
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      </Head>
      <main {...props}>
        <h1>
          {data["name"]}
        </h1>

        <dl>
          <dt>Abilities:</dt>
          <dd>{data["abilities"].length}</dd>
          <dt>Base EXP:</dt>
          <dd>{data["base_experience"]}</dd>
          <dt>Height:</dt>
          <dd>{data["height"]}</dd>
        </dl>

        <img src={data["sprites"]["front_default"]} />

        <p>
          <Link href="/pokemon">Go back to list</Link>
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

export const getServerSideProps = async (context) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${context.params["name"]}`, {
    headers: {
      ["Accept"]: "application/json",
    },
  });
  const data = await response.json();
  return { props: { data } };
}

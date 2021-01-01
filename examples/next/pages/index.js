import Head from "next/head"
import Link from "next/link"

export default function IndexPage() {
  return (
    <main>
      <h1>Hello world!</h1>
      <p>
        The current flayyer was set by default at _app.js
      </p>
      <p>
        The following pages overwrites the default flayyer:
      </p>
      <p>
        <Link href="/pokemon">
          Pokemon index
        </Link>
      </p>
    </main>
  )
}

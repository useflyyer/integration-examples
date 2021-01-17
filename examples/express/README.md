# example-express

Created with:

```bash
yarn global add express-generator
express example-express
cd example-express
yarn install
```

## How to use Flayyer

> Follow this guide: [docs.flayyer.com/guides/javascript/expressjs](https://docs.flayyer.com/guides/javascript/expressjs)

```bash
# Add Flayyer formatter
yarn add @flayyer/flayyer
```

Then add Flayyer on your routers, controllers and handlers. Example:

```js
// routes/index.js

// Require `Flayyer` class constructor
const { Flayyer } = require("@flayyer/flayyer");

// Express stuff
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const flayyer = new Flayyer({
    tenant: "your-tenant-slug",
    deck: "my-project",
    template: "main",
    variables: {
      title: "Hello world!",
    },
  })
  // Pass `flayyer` variables to views.
  // In particular to `views/layout.jade`.
  res.render('index', { title: 'Express', flayyer: flayyer });
});
```

On your views you only need to render `<meta />` tags just like:

```jade
//- views/layout.jade

head
  meta(property='og:image', content='#{flayyer}')
  meta(property='twitter:image', content='#{flayyer}')
  meta(property='twitter:card', content='summary_large_image')
```

Note: rendering `<meta />` inside the `<body />` of your pages **will no have the desired effect**.

## Start server

```language
yarn start
```

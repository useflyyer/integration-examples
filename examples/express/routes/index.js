const Flayyer = require("@flayyer/flayyer").default;
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

module.exports = router;

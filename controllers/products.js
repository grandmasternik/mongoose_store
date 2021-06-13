// require and set up dependencies
const express = require("express");
const productsRouter = express.Router(); //an object that provides "router functionality"

const Products = require("../models/products");

// Index
productsRouter.get('/', async (req, res) => {
    Products.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        });
    });
});

// Seed
const productSeed = require('../models/productSeed');
productsRouter.get('/products/seed', (req, res) => {
    Product.deleteMany({}, (error, allProducts) => {});

    Product.create(productSeed, (error, data) => {
        res.redirect('/products');
    });
});

//New
productsRouter.get('/products/new', (req, res) => {
    res.render('new.ejs');
});

//DELETE
productsRouter.delete('/products/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/products');
    });
});

// Update
productsRouter.put('/products/:id', (req, res) => {
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    res.send(req.body);
});

// Create
productsRouter.post(`/`, (req, res) => {
    Products.create(req.body, function (error, createdProducts) {
      res.redirect(`/products`)
    });
  });

//EDIT
productsRouter.get('/products/:id/edit', (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        res.render('edit.ejs', {
            product: foundProduct
        });
    });
});

// Show Page
productsRouter.get(`/:id`, (req, res) => {
    Products.findById(req.params.id, function (error, products) {
      res.render(`show.ejs`, { products })
    })
  })

// export functionality
module.exports = productsRouter;
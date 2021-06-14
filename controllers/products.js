// require and set up dependencies
const express = require("express");
const productsRouter = express.Router(); //an object that provides "router functionality"
const Product = require("../models/products");


// Seed
const productSeed = require('../models/productSeed');

productsRouter.get('/seed', (req, res) => {
    Product.deleteMany({}, (error, allProducts) => {});
    Product.create(productSeed, (error, data) => {
        res.redirect('/products');
    });
});

// Index
productsRouter.get('/', (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        });
    });
});

// //New
productsRouter.get('/products/new', (req, res) => {
    res.render('new.ejs');
});

// //DELETE
// productsRouter.delete('/products/:id', (req, res) => {
//     Product.findByIdAndRemove(req.params.id, (err, data) => {
//         res.redirect('/products');
//     });
// });

// // Update
// productsRouter.put('/products/:id', (req, res) => {
//     if (req.body.readyToEat === 'on') {
//         req.body.readyToEat = true;
//     } else {
//         req.body.readyToEat = false;
//     }
//     res.send(req.body);
// });

// // Create
// productsRouter.post(`/`, (req, res) => {
//     Product.create(req.body, function (error, createdProduct) {
//       res.redirect(`/products`)
//     });
//   });

// //EDIT
// productsRouter.get('/products/:id/edit', (req, res) => {
//     Product.findById(req.params.id, (error, foundProduct) => {
//         res.render('edit.ejs', {
//             product: foundProduct
//         });
//     });
// });

// Show Page
productsRouter.get(`/:id`, (req, res) => {
    Product.findById(req.params.id, function (error, product) {
      res.render(`show.ejs`, { product })
    })
  })

// export functionality
module.exports = productsRouter;
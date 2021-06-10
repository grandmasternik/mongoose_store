require('dotenv').config();
// ===== Dependencies ==== //
// const methodOverride = require('method-override');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Product = require('./models/products.js');
const Seed = require('./models/productSeed.js');


//Middleware
// app.use(methodOverride('_method'));

//Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));

// ==== config mongoose ===== //
//===Database Connection====//
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});


// Database Connection Error/Success - optional but can be really helpful
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// ==== Controller ==== //
const productsController = require('./controllers/products.js');

//  ==== Web Server ===== //
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`express is listening on port: ${PORT}`));
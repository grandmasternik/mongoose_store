require('dotenv').config();
// ===== Dependencies ==== //
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
const seedData = require('./models/productSeed.js');
// const Seed = require('./models/productSeed.js');


//Middleware
app.use(methodOverride('_method'));

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
const productsController = require('./controllers/products');
app.use('/products', productsController);

//  ==== Web Server ===== //
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`express is listening on port: ${PORT}`));
require('dotenv').config();
// ===== Dependencies ==== //
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
const productSeed = require('./models/productSeed.js');
const productController = require(`./controllers/products`)
const port = process.env.PORT || 3000;



//Middleware
app.use(methodOverride('_method'));

//Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride(`_method`))
app.use(express.static(__dirname + `/public`));
app.use(`/products`, productController)

// ==== config mongoose ===== //
//===Database Connection====//
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});
{/* <a href="/products/new" class="btn btn-secondary">Add New Item</a> */}

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
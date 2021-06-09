require('dotenv').config();
// ===== Dependencies ==== //
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Product = require('./models/products.js');
// const PORT = 3000;

// ==== config mongoose ===== //
//===Database Connection====//
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});


// ==== Routes ==== //
// Index
app.get('/products', (req, res) => {
	res.render('index.ejs');
});


// New

// Create



// Create
app.post('/products', (req, res) => {
	if (req.body.completed === 'on') {
		//if checked, req.body.completed is set to 'on'
		req.body.completed = true;
	} else {
		//if not checked, req.body.completed is undefined
		req.body.completed = false;
	}
	Product.create(req.body, (error, createdProduct) => {
		res.redirect('/products');
	});
});

app.post('/products', (req, res) => {
	res.send(req.body);
});

// Update

// Delete

// Database Connection Error/Success - optional but can be really helpful
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

//  ==== Web Server ===== //
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`express is listening on port: ${PORT}`));
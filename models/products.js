const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    img: String,
    price: {
        type: Number,
        required: true,
        min: [0],
    },
    qty: {
        type: Number,
        required: true,
        min: [0, "Out of Stock"]
    }
});

// const Products = mongoose.model(`Products`, ProductsSchema)

module.exports = mongoose.model(`Product`, productSchema);


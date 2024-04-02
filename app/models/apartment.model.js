const mongoose = require('mongoose');


const locationSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true }
});


const sellerInfoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
});

const imageSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true }
});


const apartmentSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    },
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: locationSchema, required: true },
    beds: { type: Number, required: true },
    baths: { type: Number, required: true },
    square_feet: { type: Number, required: true },
    amenities: [{ type: String, required: true }],
    rates: {
        weekly: { type: Number, required: true },
        monthly: { type: Number, required: true }
    },
    seller_info: { type: sellerInfoSchema, required: true },
    images: [{ type: String, required: true }],
    is_featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Apartment = mongoose.model('Apartment', apartmentSchema);

module.exports = Apartment;

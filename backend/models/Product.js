import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    warranty_years: { type: Number, required: true },
    available: { type: Boolean, required: true }
});

export default mongoose.model('Product', productSchema);

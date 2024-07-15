import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../slices/productSlice';
import { TextField, Button, Box, Checkbox, FormControlLabel } from '@mui/material';

const ProductForm = ({ product, onClose }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [warrantyYears, setWarrantyYears] = useState('');
    const [available, setAvailable] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (product) {
            setName(product.name);
            setType(product.type);
            setPrice(product.price);
            setRating(product.rating);
            setWarrantyYears(product.warranty_years);
            setAvailable(product.available);
        }
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = { name, type, price, rating, warranty_years: warrantyYears, available };
        if (product) {
            dispatch(updateProduct({ id: product._id, product: newProduct }));
        } else {
            dispatch(createProduct(newProduct));
        }
        onClose();
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                margin="normal"
                required
                fullWidth
                label="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Prix"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Évaluation"
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Garantie (années)"
                type="number"
                value={warrantyYears}
                onChange={(e) => setWarrantyYears(e.target.value)}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={available}
                        onChange={(e) => setAvailable(e.target.checked)}
                    />
                }
                label="Disponible"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                {product ? 'Modifier Article' : 'Nouvel Article'}
            </Button>
        </Box>
    );
};

export default ProductForm;

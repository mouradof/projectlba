import Product from "../models/Product.js"

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createProduct = async (req, res) => {
    const product = new Product(req.body)
    try {
        const savedProduct = await product.save()
        res.status(201).json(savedProduct)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(updatedProduct)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.json({ message: "Product deleted" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

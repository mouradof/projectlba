import Product from "./models/Product.js"

const seedProducts = [
    { "name" : "AC1 Phone1", "type" : "phone", "price" : 200.05, "rating" : 3.8, "warranty_years" : 1, "available" : true },
    { "name" : "AC2 Phone2", "type" : "phone", "price" : 147.21, "rating" : 1, "warranty_years" : 3, "available" : false },
    { "name" : "AC3 Phone3", "type" : "phone", "price" : 150, "rating" : 2, "warranty_years" : 1, "available" : true },
    { "name" : "AC4 Phone4", "type" : "phone", "price" : 50.20, "rating" : 3, "warranty_years" : 2, "available" : true }
]

export const seedDatabase = async () => {
    try {
        const existingProducts = await Product.find()
        await Product.insertMany(seedProducts)
        console.log("Database seeded successfully")

    } catch (error) {
        console.error("Error seeding database:", error)
    }
}
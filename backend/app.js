import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { createServer } from "http"
import { WebSocketServer } from "ws"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import { seedDatabase } from "./seed.js" // Importer la fonction de seed

dotenv.config()
const app = express()
app.use(express.json())

app.use(cors({ origin: "http://localhost:3000" }))

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected")
        seedDatabase()
    })
    .catch(err => console.log(err))

const server = createServer(app)
const wss = new WebSocketServer({ server })

wss.on("connection", function connection(ws) {
    ws.on("message", function incoming(message) {
        console.log("received: %s", message)
        ws.send(`Hello, you sent -> ${message}`)
    })

    ws.send("Hi there, I am a WebSocket server")
})

app.use("/api/products", productRoutes)
app.use("/api/users", authRoutes)

const PORT = process.env.PORT || 5100
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

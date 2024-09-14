import express from "express";
import db from "./config/db";
import router from "./router";

// Connect to db
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log('Successfull conextion to db')
    } catch (error) {
        console.log('[CONNECTDB]', error)
    }
}

connectDB()

// create express instance
const server = express()

server.use('/api/products', router)

export default server
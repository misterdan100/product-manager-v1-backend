import express from "express";
import db from "./config/db";
import router from "./router";
import colors from 'colors'

// Connect to db
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.cyan('Successfull conextion to db'))
    } catch (error) {
        // console.log(colors.bgRed.white('[CONNECTDB]'), error)
    }
}

connectDB()

// create express instance
const server = express()

// Reac form data
server.use(express.json())

server.use('/api/products', router)

server.get('/api', (req, res) => {
    res.json({msg: 'From API'})
})

export default server
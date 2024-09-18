import express from "express";
import db from "./config/db";
import router from "./router";
import colors from 'colors'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import cors, { CorsOptions } from "cors";



// Connect to db
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.cyan('Successfull conextion to db'))
    } catch (error) {
        // console.log(colors.bgRed.white('[CONNECTDB]'), error)
        console.log(colors.bgRed.white('[CONNECTDB]'))
    }
}

connectDB()

// create express instance
const server = express()

// CORS
const allowedOrigins = [process.env.FRONTEND_URL]
const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        if(allowedOrigins.includes(origin)) {
            return callback(null, true)
        } else {
            return callback(new Error('CORS policy violation'), false)
        }
    }
}

server.use(cors(corsOptions))

// Reac form data
server.use(express.json())

server.use('/api/products', router)

// Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOptions))

export default server
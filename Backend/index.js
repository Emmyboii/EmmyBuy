const port = 5000
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import connectDb from './config/Dbconnection';
import path from 'path';
const app = express()
// const multer = require("multer")
// const cors = require("cors")
// const path = require("path")
// const connectDb = require("./config/Dbconnection")

require('dotenv').config()

app.use(express.json())

export default function handler(req, res) {
    res.status(200).json({ message: 'Hello, World!, Backend is running!' });
}

const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = ['https://emmyybuyy.netlify.app', 'https://emmybuyadmin.netlify.app'];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'token'],
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


connectDb()

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

//Creating upload Endpoint for images

app.use('/images', express.static('upload/images'))

const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `${baseUrl}/images/${req.file.filename}`
    });
});


const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')

app.use("/product", productRoutes)
app.use("/user", userRoutes)

app.listen(port, () => {
    console.log(`Backend server running on ${process.env.BASE_URL}`);
})
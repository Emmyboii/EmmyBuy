const port = 5000
const express = require("express")
const app = express()
const multer = require("multer")
const cors = require("cors")
const path = require("path")
const connectDb = require("./config/Dbconnection")

require('dotenv').config()

app.use(express.json())


app.use(cors({
    origin: ['https://emmyybuyy.netlify.app', 'https://emmybuyadmin.netlify.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Required if you're sending cookies or other credentials
    allowedHeaders: ['Content-Type', 'token'],
    optionsSuccessStatus: 204 // Status for successful OPTIONS preflight response
}));

app.options('*', cors()); // Respond to all preflight requests

connectDb()


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
    console.log(`Server Running on port ${port}`);
})
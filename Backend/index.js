const port = 5000
const express = require("express")
const app = express()
const multer = require("multer")
const cors = require("cors")
const path = require("path")
const connectDb = require("./config/Dbconnection")

require('dotenv').config()

app.use(express.json())

const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.ADMIN_URL,
];

// Configure CORS options
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // Allow cookies if needed
};

// Use CORS middleware
app.use(cors(corsOptions));

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
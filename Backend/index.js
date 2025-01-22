import express from "express";
import multer from "multer";
import cors from "cors";
import { connectDb } from "./config/Dbconnection.js";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [process.env.FRONTEND_URL, process.env.ADMIN_URL];
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

// Connect to the database
connectDb();

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer-Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: 'product-images', // Folder name in Cloudinary
        allowed_formats: ['jpeg', 'png', 'jpg', 'gif'], // Allowed image formats
    },
});

const upload = multer({ storage });

// API Routes
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Image upload route
app.post('/upload', upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: 'No file uploaded' });
    }

    res.json({
        success: 1,
        image_url: req.file.path, // Cloudinary URL
    });
});

// Routes
app.use("/product", productRoutes);
app.use("/user", userRoutes);

// Start server
app.listen(port, () => {
    console.log(`Backend server running on ${process.env.BASE_URL}`);
});
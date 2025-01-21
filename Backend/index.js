import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cors from 'cors';
import { connectDb } from "./config/Dbconnection.js";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

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

connectDb();

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, 'upload/images');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

app.use(cors());
app.use('/images', express.static(uploadDir));

const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;

// Upload route
app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: "No file uploaded" });
    }
    res.json({
        success: 1,
        image_url: `${baseUrl}/images/${req.file.filename}`,
    });
});

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ success: 0, message: "File not found" });
});

// Routes
app.use("/product", productRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
    console.log(`Backend server running on ${process.env.BASE_URL}`);
});

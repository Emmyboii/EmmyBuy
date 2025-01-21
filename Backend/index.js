import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'upload/images'));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files for images
app.use('/images', express.static(path.join(__dirname, 'upload/images')));

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

// 404 handler (should be last)
app.use((req, res, next) => {
    res.status(404).send('File not found');
});


// Routes
app.use("/product", productRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
    console.log(`Backend server running on ${process.env.BASE_URL}`);
});

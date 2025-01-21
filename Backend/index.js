import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import connectDb from "./config/Dbconnection.js";
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
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Serve static files for images
app.use('/images', express.static('upload/images'));

const baseUrl = `http://localhost:${port}`;

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `${baseUrl}/images/${req.file.filename}`
    });
});

// Routes
app.use("/product", productRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
});

const port = 5000
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const multer = require("multer")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const path = require("path")
const bcrypt = require("bcryptjs")
const connectDb = require("./config/Dbconnection")

app.use(express.json())
app.use(cors())
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

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})
const productRoutes = require('./routes/productRoutes')

app.use("/product", productRoutes)

app.listen(port, () => {
    console.log(`Server Running on port ${port}`);
})
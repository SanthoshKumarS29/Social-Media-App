import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from 'path';
import connectDB from "./config/DB.js";
import router from "./routes/MediaRoutes.js";
import { fileURLToPath } from 'url';


const app = express();
dotenv.config()

// middleware
app.use(express.json())
app.use(cors())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/posts', router);

const port = process.env.PORT;

app.listen(port, () => {
    console.log('serverRuning')
    connectDB()
})

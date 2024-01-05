import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './src/routes/index.js';

const app = express();
const port = process.env.PORT || 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectDb = () => {
    mongoose.set('strictQuery', true);
    mongoose
        .connect(process.env.MONGO_DB)
        .then(() => {
            console.log('Connected to DB');
        })
        .catch((err) => {
            console.log('Failed');
        });
};

connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', router);

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

const colors = require('colors');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/', router());

const server = http.createServer(app);

server.listen(port, () => console.log(`Server listening on port: ${port}`));

const MONGO_URI = "mongodb+srv://rehman123:rehman123@rehmancluster.dsp1u8f.mongodb.net/?retryWrites=true&w=majority";
const connectDB = async () => {
  try {

    const conn = await mongoose.connect(process.env.MONGO_URI || MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

connectDB();

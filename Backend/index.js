import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoute from './Router/authRoute.js';
import ListRoute from './Router/ListRoute.js';
import taskRoute from './Router/taskRoute.js';

dotenv.config(); 

const app = express();

const port = process.env.PORT || 3000;
const MONGOURL = process.env.MONGOURL;

const corsOptions = {
  origin: 'https://task-board-7e8t.vercel.app/', 
  methods: 'GET,POST,PUT,PATCH,DELETE',
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoute);
app.use('/list', ListRoute);
app.use('/task', taskRoute);

mongoose
  .connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5s
  })
  .then(() => {
    console.log('MongoDB Connected Successfully');
  })
  .catch((err) => {
    console.error('MongoDB Connection Error:', err.message);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from 'mongoose';

import config from './config.js';
import postRouter from "./routes/posts.js";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";

const { CONNECTION_URL, PORT } = config;

const app = express();

app.use(cors());

app.use(bodyParser.json({limit:'30mb', extended: false}));

app.use(bodyParser.urlencoded({limit: '30mb', extended: false}));

app.use('/posts', postRouter);

app.use('/', authRouter);

app.use('/users', usersRouter);



const dbConnect =  async () => {
    try{
       await mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true});
       app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))

    } catch (err) {
       console.log(err.message);
    }
    
}

dbConnect(); 

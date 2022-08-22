import 'dotenv/config';
import express from 'express';
import db from './config/db.js';
import bodyParser from 'body-parser';

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.json({msg: "api working"})
})


app.listen(PORT, (req,res) => console.log(`server started on ${PORT}`))

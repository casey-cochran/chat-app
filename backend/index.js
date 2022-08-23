import 'dotenv/config';
import express from 'express';
import db from './config/db.js';
import bodyParser from 'body-parser';
import userRouter from './routes/user.js'

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(bodyParser.json());


app.get('/', (req,res) => {
    res.json({msg: "api working"})
})

app.use('/user', userRouter);

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(PORT, (req,res) => console.log(`server started on ${PORT}`))

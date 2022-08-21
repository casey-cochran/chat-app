import express from 'express';
import 'dotenv/config'
import bodyParser from 'body-parser';

const app = express();



const PORT = process.env.PORT || 4000;

app.get('/', (req,res) => {
    res.json({msg: "api working"})
})


app.listen(PORT, (req,res) => console.log(`server started on ${PORT}`))

import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import db from './config/db.js';
import bodyParser from 'body-parser';
import userRouter from './routes/user.js'
import cors from 'cors';
import path from 'path';
import helmet from 'helmet'


const app = express();

const PORT = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(bodyParser.json());
app.use(csurf({cookie: true}));
app.use(cors());

app.use(helmet({
    contentSecurityPolicy: false
}))


if (process.env.NODE_ENV !== "production") {
    app.get('/another/test', (req, res) => {
    console.log('did this get hit')
    //need to find out why res.cookie is not setting a cookie on my front end?
      res.cookie("XSRF-TOKEN", req.csrfToken(), {domain: '.localhost:3000'});
      res.status(201).json({msg: "sucess with not in production"});
    });
  }

app.use('/user', userRouter);


if(process.env.NODE_ENV === 'production'){
    app.get('/', (req,res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(
            path.resolve(__dirname, '../frontend', 'build', 'index.html')
        )
    })
}

app.use(express.static(path.resolve('../frontend/build')));


app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)

    // handle CSRF token errors here
    res.status(403)
    res.send('form tampered with')
  })


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(PORT, (req,res) => console.log(`server started on ${PORT}`))

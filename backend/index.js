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
import http from 'http';
import {Server} from 'socket.io'


const app = express();
app.use(cors({origin: true, credentials: true}));
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http:localhost:3000',
        methods: ['GET', 'POST']
    }
});

//socket connection here, can do more with rooms here
io.on('connection', (socket) => {
    //When users join a room
    socket.on('joinRoom', ({user, room}) => {
        //TODO logic for join room
    })

    socket.on('chat', (msg) => socket.broadcast.emit('recieved', msg))
    console.log('a user connected')

    //send message when user disconnects
    socket.on('disconnect', () => {
        io.emit("message", "A user has left the chat")
    })
})



const PORT = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(bodyParser.json());

app.use(helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
}))

app.use(csurf({cookie: true}));

//allow csurf tokens during development
if (process.env.NODE_ENV !== "production") {
    app.get('/another/test', (req, res) => {
      res.cookie("XSRF-TOKEN", req.csrfToken());
      res.status(201).json({msg: "sucess with not in production"});
    });
  }



app.use('/user', userRouter);

//set csrf tokens during production
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
    //error handler for csurf from offical docs
    if (err.code !== 'EBADCSRFTOKEN') return next(err)
    // handle CSRF token errors here
    res.status(403)
    res.send('form tampered with')
  })

app.use((req, res, next) => {
    //error handler to capture all unhandled requests
    const err = new Error('Requested resource could not be found')
    err.title = 'Resource Not Found';
    err.errors = ['Requested resource could not be found'];
    err.status = 404;
    next(err)
});


app.use((err, req, res, next) => {
    //error handler to format errors as they are sent back to the front end
    //show stack if in development
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
  });

server.listen(PORT, () => console.log('listening on server 5000'))
// app.listen(PORT, (req,res) => console.log(`server started on ${PORT}`))

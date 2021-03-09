import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import https from 'https';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import multer from 'multer';
import { connect } from './utils/db';
import userRouter from './res/user/user.router';
import itemRouter from './res/item/item.router';
import { protect, reAuth, signin, signup } from './utils/auth';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import { logger } from './utils/logger';
import schoolRouter from './res/school/school.router';
import subjectRouter from './res/subject/subject.router';
import courseRouter from './res/course/course.router';
import taskRouter from './res/task/task.router';
import notificationRouter from './res/notification/notification.router';
import submissionRouter from './res/submission/submission.router';
import teacherRouter from './res/teacher/teacher.router';
import uuidv4 from 'uuid/v4';
import { Task } from './res/task/task.model';
import { match } from 'assert';
import studentRouter from './res/student/student.router';
import { Submission } from './res/submission/submission.model';
const imageToBase64 = require('image-to-base64');

var certificate = fs.readFileSync(`${__dirname}/sslcert/server.crt`, 'utf8');
var privateKey = fs.readFileSync(`${__dirname}/sslcert/server.key`, 'utf8');

const xsrfProtection = csrf({
  cookie: true,
  secure: true,
  sameSite: 'strict',
});
export const app = express();
const httpsServer = https.createServer(
  { key: privateKey, cert: certificate },
  app
);

app.disable('x-powered-by');
app.use(
  cors({
    origin: 'https://127.0.0.1:3000',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: [
      'Origin',
      'Content-Type',
      'X-Requested-With',
      'Accept',
      'x-xsrf-token',
    ],
    credentials: true,
  })
);

app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8');
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(morgan('dev'));
// app.use(logger);

app.get('/', xsrfProtection, (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.status(200).end();
});

app.post('/signup', signup);
app.post('/signin', signin);
app.use('/api', protect);
app.use('/api', reAuth);
app.use('/api/user', xsrfProtection, userRouter);
app.use('/api/item', xsrfProtection, itemRouter);
app.use('/api/school', schoolRouter);
app.use('/api/subject', subjectRouter);
app.use('/api/course', courseRouter);
app.use('/api/task', taskRouter);
app.use('/api/notification', notificationRouter);
app.use('/api/submission', submissionRouter);
app.use('/api/teacher', teacherRouter);
app.use('/api/student', studentRouter);

//****************** File Upload ******************************//////
// Setup Storage
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination where the files should be stored on disk
    cb(null, './src/images');
  },
  filename: (req, file, cb) => {
    // Set the file name on the file in the uploads folder
    cb(null, uuidv4() + new Date().toISOString() + file.originalname);
  },
});

const checkFileType = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

// Setup multer
const upload = multer({
  storage: fileStorageEngine,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: checkFileType,
  withPreview: true,
}); // { destination: "uploads/"}

// Setup the upload route

app.post('/multiple', upload.array('images', 3), (req, res) => {
  console.log('file details:', req.files);
  // let files = req.files.map((file) => file.filename);
  let filepath = req.files.map((file) => file.path);
  console.log('filepath:', filepath);
  res.send(filepath);
});

app.get('/openFile/:id', (req, res) => {
  console.log(req.params);
  Task.findOne({ _id: req.params.id }, function (err, task) {
    if (err) {
      console.error(err);
    } else {
      console.log('task: ', task);
      let reqPath = path.join(__dirname, '../');
      console.log('reqPath: ', reqPath);
      imageToBase64(reqPath + task.files[0]) // Path to the image  __dirname + '/images/'
        .then((response) => {
          // console.log(response);

          res.send(response); // "cGF0aC90by9maWxlLmpwZw=="ic
        })
        .catch((error) => {
          console.log(error); // Logs an error if there was one
        });
    }
  }).exec();
});

app.get('/openFileSubmission/:id', (req, res) => {
  console.log(req.params);
  Submission.findOne({ _id: req.params.id }, function (err, task) {
    if (err) {
      console.error(err);
    } else {
      console.log('task: ', task);
      let reqPath = path.join(__dirname, '../');
      console.log('reqPath: ', reqPath);
      imageToBase64(reqPath + task.files[0]) // Path to the image  __dirname + '/images/'
        .then((response) => {
          // console.log(response);

          res.send(response); // "cGF0aC90by9maWxlLmpwZw=="ic
        })
        .catch((error) => {
          console.log(error); // Logs an error if there was one
        });
    }
  }).exec();
});

app.post('/single', upload.single('image'), (req, res) => {
  console.log('file details:', req.file);
  console.log('file uploaded success');
});

app.post('/question', upload.single('image'), (req, res) => {
  console.log('question details:', req.file);
  console.log('question uploaded success');
  res.send(req.file.filename);
});

export const start = async () => {
  try {
    await connect();
    httpsServer.listen(process.env.PORT, () => {
      console.log(
        `listening on port ${process.env.PORT} : https://127.0.0.1:${process.env.PORT}`
      );
    });
  } catch (e) {
    console.error(e);
  }
};

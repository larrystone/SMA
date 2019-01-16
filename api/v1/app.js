import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { PORT } from './configs';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', (req, res) => res.status(200).json('Welcome to nothingness!'));

app.listen(PORT, () => console.log('Magic happening on PORT: ', PORT));

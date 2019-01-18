import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { PORT } from './configs';
import routes from './routes';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', routes);

app.use('*', (req, res) => res.status(404).json({ message: 'Requested path not configured' }));

app.listen(PORT, () => console.log('Magic happening on PORT: ', PORT));

export default app;

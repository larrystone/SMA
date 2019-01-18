import express from 'express';
import contacts from './contacts';
import messages from './messages';

const routes = express();

routes.use('/v1/contacts', contacts);
routes.use('/v1/messages', messages);

export default routes;

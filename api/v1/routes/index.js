import express from 'express';
import contacts from './contacts';
import messages from './messages';

const routes = express();

routes.use('/v1/contacts', contacts);
routes.use('/v1/messages', messages);
routes.use('/v1/docs', (req, res) => {
  res.redirect('https://documenter.getpostman.com/view/2732996/RzteSXRu');
});

export default routes;

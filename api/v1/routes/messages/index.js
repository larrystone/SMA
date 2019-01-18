import express from 'express';
import Messages from '../../controllers/messages';
import { Message } from '../../models'; //eslint-disable-line
import Resource from '../../middlewares/resource';
import { validateId } from '../../middlewares/validations';

const messages = express();
const messageResource = new Resource();

messages
  .route('/')
  .get(messageResource.getAll.bind({ model: Message }))
  .post(Messages.create);

messages
  .route('/:id')
  .all(validateId)
  .get(Messages.get)
  .delete(messageResource.get.bind({ model: Message, name: 'message' }),
    messageResource.delete.bind({ name: 'message' }));

export default messages;

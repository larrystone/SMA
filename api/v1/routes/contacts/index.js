import express from 'express';
import Contacts from '../../controllers/contacts';
import { Contact } from '../../models'; //eslint-disable-line
import Resource from '../../middlewares/resource';
import { validatePhone } from '../../middlewares/validations';

const contacts = express();
const contactResource = new Resource();

contacts
  .route('/')
  .get(contactResource.getAll.bind({ model: Contact }))
  .post(Contacts.create);

contacts
  .route('/:id')
  .all(validatePhone, contactResource.get.bind({ model: Contact, name: 'contact', key: 'phoneNumber' }))
  .get(Contacts.get)
  .put(Contacts.update)
  .delete(contactResource.delete.bind({ name: 'contact' }));

export default contacts;

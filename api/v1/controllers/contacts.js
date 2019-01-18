import { Contact } from '../models'; //eslint-disable-line
import sendResponse from '../utils/sendResponse';
import { validateContact } from '../utils/validator';

export default class Contacts {
  static async create({ body }, res) {
    const validData = validateContact(body);

    if (!validData) {
      return sendResponse(res, 422, { error: 'Invalid contact data provided' });
    }

    try {
      const { name, phoneNumber } = validData;
      const [data, created] = await Contact
        .findOrCreate({
          where: {
            phoneNumber,
          },
          defaults: { name },
        });
      return sendResponse(res, created ? 201 : 409,
        created ? { message: 'New contact created', data }
          : { error: 'Contact with this phone number already exist' });
    } catch (error) {
      return sendResponse(res, 500, { error });
    }
  }

  static async get({ contact }, res) {
    return sendResponse(res, 200, { message: 'Contact found', data: contact });
  }

  static async update({ contact, body, params }, res) {
    const validData = validateContact(body, contact);

    if (!validData) {
      return sendResponse(res, 422, { error: 'Invalid contact data provided' });
    }

    const { name, phoneNumber } = validData;
    const { id } = params;

    try {
      const [, [data]] = await Contact
        .update({ phoneNumber, name }, {
          where: {
            phoneNumber: id,
          },
          returning: true,
        });

      return sendResponse(res, 200, { message: 'Contact updated', data });
    } catch (error) {
      return sendResponse(res, 500, { error });
    }
  }
}

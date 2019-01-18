import { Op } from 'sequelize';
import { Message, Contact } from '../models'; //eslint-disable-line
import sendResponse from '../utils/sendResponse';
import { validateMessage } from '../utils/validator';

export default class Messages {
  static async create({ body }, res) {
    const validData = validateMessage(body);

    if (!validData) {
      return sendResponse(res, 422, { error: 'Invalid Message Data provided' });
    }

    try {
      const { content, senderId, receiverId } = validData;

      const contacts = await Contact.findAll({
        where: {
          [Op.or]: [
            { phoneNumber: senderId },
            { phoneNumber: receiverId },
          ],
        },
      });

      if (contacts.length === 0) {
        return sendResponse(res, 422, { error: 'Sender and receiver are not available' });
      } if (contacts.length < 2) {
        return sendResponse(res, 422, { error: 'Sender or receiver not available/valid' });
      }

      const data = await Message.create({
        content, senderId, receiverId,
      });

      return sendResponse(res, 201, { message: 'Message sent', data });
    } catch (error) {
      return sendResponse(res, 500, { error });
    }
  }

  static async get(req, res) {
    const { id } = req;

    try {
      const data = await Message.findOne({
        where: { id },
        attributes: {
          exclude: ['senderId', 'receiverId'],
        },
        include: [
          { model: Contact, as: 'sender', attributes: ['name', 'phoneNumber'] },
          { model: Contact, as: 'receiver', attributes: ['name', 'phoneNumber'] },
        ],
      });

      if (!data) {
        return sendResponse(res, 404, { error: 'Message not found' });
      }

      const updated = await data.update({
        status: 'read',
      });

      return sendResponse(res, 200, { message: 'Message found', data: updated });
    } catch (error) {
      return sendResponse(res, 500, { error });
    }
  }
}

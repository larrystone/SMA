import { checkPhoneNumber, checkNumber } from '../utils/validator';
import sendResponse from '../utils/sendResponse';

export const validatePhone = (req, res, next) => {
  const { id } = req.params;

  const validPhoneNumber = checkPhoneNumber(id);
  if (validPhoneNumber) {
    req.id = id;
    return next();
  }

  return sendResponse(res, 422, { error: 'Invalid Phone Number provided' });
};

export const validateId = (req, res, next) => {
  const { id } = req.params;

  const validId = checkNumber(id);
  if (validId) {
    req.id = validId;
    return next();
  }

  return sendResponse(res, 422, { error: 'Invalid Message Id provided' });
};

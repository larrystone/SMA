const trimWhiteSpaces = (param, value) => (param || '')
  .trim()
  .replace(/\s+/g, value || ' ');

export const checkNumber = value => Number.parseInt(value, 10);
export const checkPhoneNumber = value => /^([0-9-+]{7,11})$/.test(value);

export const validateContact = (contact) => {
  const { name, phoneNumber } = contact;

  const parsedName = trimWhiteSpaces(name);
  const parsedPhoneNumber = checkPhoneNumber(phoneNumber);

  if (parsedName.length < 2 || !parsedPhoneNumber) {
    return false;
  }

  return {
    ...contact,
    name: parsedName,
    phoneNumber,
  };
};

export const validateMessage = (message) => {
  const { content, senderId, receiverId } = message;

  const parsedContent = trimWhiteSpaces(content);
  const parsedSenderId = checkPhoneNumber(senderId);
  const parsedReceiverId = checkPhoneNumber(receiverId);

  if (parsedContent < 2 || !parsedSenderId || !parsedReceiverId) {
    return false;
  }

  return {
    ...message,
    content: parsedContent,
    senderId,
    receiverId,
  };
};

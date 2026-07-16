const validator = require('validator');

const validate = (data) => {
  const mandatoryField = ['fullName', 'emailId', 'password'];
  const IsAllowed = mandatoryField.every((k) => Object.keys(data).includes(k));

  if (!IsAllowed) {
    throw new Error("Some Field is missing");
  }

  if (!validator.isEmail(data.emailId))
    throw new Error("EmailId is Wrong");

  if (!validator.isStrongPassword(data.password))
    throw new Error("Weak Password");
};

module.exports = validate;
const emailValidator = require("deep-email-validator");
const emailCheck = require("email-check");

async function isEmailValid(email) {
  const { valid } = await emailValidator.validate({
    email,
    sender: email,
    validateRegex: true,
    validateMx: true,
    validateTypo: true,
    validateDisposable: true,
    validateSMTP: true,
  });
  return valid;
}

async function checkEmail(email) {
  try {
    return await isEmailValid(email).then(
      async (result) => result && (await emailCheck(email))
    );
  } catch (e) {
    return false;
  }
}

module.exports = checkEmail;

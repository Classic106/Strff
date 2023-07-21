const email_str = "[a-z0-9._%+-]{0,300}@[a-z0-9.-]{0,50}.[a-z]{3,4}";
const emailPattern = `^${email_str}$`;
const emailRegExp = new RegExp(emailPattern, "gm");
const email_with_status_RegExp = new RegExp(
  `(${emailPattern}|^${email_str}\\s(true|false)$)[\t\n]*`,
  "gm"
);

export { emailPattern, emailRegExp, email_with_status_RegExp };

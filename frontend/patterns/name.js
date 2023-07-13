const name_str = "[a-zA-Z0-9]{8,}";
const namePattern = `^${name_str}$`;
const nameRegExp = new RegExp(namePattern, "gm");

export { namePattern, nameRegExp };

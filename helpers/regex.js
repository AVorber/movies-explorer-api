const isEmail = /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const isURL = /^(https?):\/\/[^\s$.?#]*\.[^\s]{2,}$/m;

module.exports = { isEmail, isURL };

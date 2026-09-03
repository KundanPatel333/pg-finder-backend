const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet("23456789ABCDEFGHJKMNPQRSTUVWXYZ", 6);

const generateVisitCode = () => nanoid();

module.exports = generateVisitCode;
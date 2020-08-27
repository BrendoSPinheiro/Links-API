const bcrypt = require('bcryptjs');

exports.checkPassword = (password, userPassword) => bcrypt.compare(password, userPassword);

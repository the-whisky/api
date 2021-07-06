const bcrypt = require('bcrypt');

const saltRounds = 10;

const passwordEncrypt = async password => {
  return await bcrypt.hash(password, saltRounds);
};

const checkPassword = async (plainTextPassword, hashedPassword) => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

const pass = 'PizzaP@rty99';
const hashedPass = '$2b$10$XthRKA4R8eE7LP9Qbd6w4uLF4ZssgJ44JKTCnoEDFcSnCvy2QnC.W';

passwordEncrypt(pass).then(
  result => console.log('Hash:', result),
);

checkPassword(pass, hashedPass).then(
  result => console.log('Compare:', result),
);

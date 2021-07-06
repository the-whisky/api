require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateJWT = async user => {
  return await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
};

const validateJWT = async token => {
  return await jwt.verify(token, process.env.JWT_SECRET);
};


const user = {
  _id: '979-11-6224-380-0',
};
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3OS0xMS02MjI0LTM4MC0wIiwiaWF0IjoxNjI1NTM1NDAyfQ.yigzDjP-sW3EO-lGpqXdOlfPQIQ7ydPGpYSIvz_qEZs';

generateJWT(user).then(
  result => console.log('token:', result),
);

validateJWT(token).then(
  result => console.log('user:', result),
);

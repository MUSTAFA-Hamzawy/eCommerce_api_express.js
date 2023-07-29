const bcrypt = require('bcrypt');


const myPlaintextPassword = "open1234";


const hashedPassword = bcrypt.hashSync(myPlaintextPassword, 10);
const users = [
  {
    "fullName": "Mustafa Mahmoud",
    "email": "hamzawy1@gmail.com",
    "username": "hamzawy1",
    "phoneNumber": "+20123456781",
    "password": hashedPassword
  },
  {
    "fullName": "Mustafa Mahmoud",
    "email": "hamzawy2@gmail.com",
    "username": "hamzawy2",
    "phoneNumber": "+20123456782",
    "password": hashedPassword
  },
  {
    "fullName": "Mustafa Mahmoud",
    "email": "hamzawy3@gmail.com",
    "username": "hamzawy3",
    "phoneNumber": "+20123456783",
    "password": hashedPassword
  },
  {
    "fullName": "Mustafa Mahmoud",
    "email": "hamzawy4@gmail.com",
    "username": "hamzawy4",
    "phoneNumber": "+20123456784",
    "password": hashedPassword
  },
  {
    "fullName": "Adidas",
    "email": "hamzawy5@gmail.com",
    "username": "hamzawy5",
    "phoneNumber": "+20123456785",
    "password": hashedPassword
  },
];

module.exports = users;


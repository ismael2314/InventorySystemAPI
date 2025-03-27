const mysql = require("mysql2/promise"); // Important: use mysql2/promise
const jwt = require("jsonwebtoken");
const crypt = require("bcryptjs");
const bcrypt = require("crypto")

// Create a connection pool instead of a single connection
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  database: process.env.DATABASE,
  //connectionLimit: 10, // Adjust as needed
});

const tokenValidator = async (data) => {
  try {
    if (!data.token) { throw ("Incorrect token!");} // check if there is a token
    
    const decoded = jwt.verify(data?.token.split(" ")[1], process.env.KEY); // verify the token
    const location = bcrypt.createHash('sha256')
    location.update(data.header)
    const digest  =await location.digest("Hex")
    if (digest!==decoded.loginLocation){throw ("Unkown device");} // device control
    return {
      result: decoded,
      status: true,
    };
  } catch (e) {
    return {
      result: e,
      status: false
    };
  }
};

exports.Connection_Pool = pool;
exports.Token_validate  = tokenValidator;


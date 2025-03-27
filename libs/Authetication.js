const {Connection_Pool} = require("./Connection")
const jwt = require("jsonwebtoken");
const crypt = require("bcryptjs");
const bcrypt = require("crypto");

exports.User_Registration = async (data) => {
  try {
    var encPass = await crypt.hash(data.password, 10);
    const sql = `INSERT INTO users (userid, username, regby, userrole,regdate,password) VALUES (?,?,?,?,?,?)`;
    const values = [
      `user-${Math.random()}`,
      data.username,
      data.createdBy,
      data.role,
      new Date(),
      encPass,
    ];

    const [result] = await Connection_Pool.query(sql, values); // Use pool.query
    return {
      message: "User has been registered",
      code: 200,
      status: true,
    };
  } catch (err) {
    return {
      message: err,
      code: err.code,
      x: 34,
      status: false,
    };
  }
};


exports.User_Login = async (data) => {
    try {
      // login verifiers
      var sql = "SELECT * FROM users where username=?";
      var val = [data.username];
  
      const [result] = await Connection_Pool.query(sql, val);
      // verify password
      const passVerfiy = await crypt.compare(data.password, result[0].password);
  
      if (!passVerfiy) {
        return {
          message: "Authentication failed!",
          code: 401,
          status: false,
        };
      }
      const payload = {
        username: result[0].username,
        registrationDate: result[0].regdate,
        role: result[0].userrole,
        usertype: "",
        loginLocation: data.Location,
        LoggedInOn: data.time,
      };
      const token = jwt.sign(payload, process.env.KEY, { expiresIn: "15m" });
      return {
        message: "Authentication success!",
        token: token,
        code: 200,
        status: true,
      };
    } catch (e) {
      return {
        message: e.message,
        code: e.code,
        status: true,
      };
    }
  };
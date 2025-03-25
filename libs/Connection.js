const mysql = require("mysql2/promise"); // Important: use mysql2/promise
const jwt = require("jsonwebtoken");
const crypt = require("bcryptjs");
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
    if (!data.token) {
      return {
        data:"Autorization failed!",
        status:false
      }
    }
    const decoded = jwt.verify(data?.token.split(" ")[1], process.env.KEY);
    return {
      data: decoded,
      status: true,
    };
  } catch (e) {
    return {
      data: e.message,
      status: false
    };
  }
};

exports.userRegisration = async (data) => {
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

    const [result] = await pool.query(sql, values); // Use pool.query
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

exports.login = async (data) => {
  try {
    // login verifiers
    var sql = "SELECT * FROM users where username=?";
    var val = [data.username];

    const [result] = await pool.query(sql, val);
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

exports.userList = async (data) => {
  try {
    const filterUser = "SELECT * FROM user where userid=?";
    const user = "SELECT * FROM user";
    const val = [data.id];

    const [result] = data?.id
      ? await pool.query(filterUser, val)
      : await pool.query(user, val);
    return result;
  } catch (e) {
    return e.message;
  }
};

// based on users
exports.Orders = async function Orders(params) {
  try {
    const valid = tokenValidator(params);
    if (!(await valid).status) {
      return valid;
    }
    const sql = "SELECT * FROM orders";
    const [result] =await pool.query(sql);
    return {
      status: true,
      data:result
    };
  } catch (ex) {
    return {
      status: false,
      message:ex.message
    };
  }
};

exports.Products = async (params) => {
  try {
    const valid = await tokenValidator(params);
    if (valid.status) {
      return valid;
    }
    console.log()
    var sql = "SELECT * FROM product_catagory ";
    var [result] =await pool.query(sql);

    if(params.body!== undefined){
      var sql = "SELECT * FROM product_catagory";
      var val = [JSON.parse(params.body).productId]
      console.log(val)
      [result] =(await pool.query(sql)).find(e=>e.productId=val[0]);
      
    }
    return {
      status: true,
      data:result
    };
  } catch (ex) {
    return {
      status: false,
      message:ex.message
    };
  }
};

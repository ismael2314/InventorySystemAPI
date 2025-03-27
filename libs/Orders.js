const {Connection_Pool,Token_validate} = require("./Connection")

exports.Orders = async function Orders(params) {
    try {
      const valid = Token_validate(params);
      if (!(await valid).status) {
        return valid;
      }
      const sql = "SELECT * FROM orders";
      const [result] =await Connection_Pool.query(sql);
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
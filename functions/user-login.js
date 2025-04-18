const { User_Login } = require("../libs/Authetication.js");
const bcrypt = require("crypto")

exports.handler = async function (event, context) {
  const location = bcrypt.createHash('sha256')
  location.update(`${event.headers['user-agent']} * ${event.headers['client-ip']}`)
  
  var loginData = {
    username: JSON.parse(event.body).username,
    password: JSON.parse(event.body).password,
    Location: await location.digest('hex'),
    time:new Date()
  };
  console.log(loginData)
  const verify = await User_Login(loginData);
  if (!verify.status) {
    return {
      statusCode: 400,
      body: JSON.stringify(verify),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(verify),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

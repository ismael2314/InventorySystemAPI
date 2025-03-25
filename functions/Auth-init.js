const {userRegisration } = require("../libs/Connection.js");


exports.handler = async function (event,context) {

    if(!event.body){
        return{
            statusCode:500,
            body:JSON.stringify([{"data":"there is no data"}]),
            headers: {
                "Content-Type": "application/json",
                "X-Custom-Header": "My Custom Value",
                "Cache-Control": "max-age=3600" // Example: Cache for 1 hour
              }
        }
    }
    if(!(event.httpMethod==="POST")){
        return {
            statusCode:401,
            body:JSON.stringify([{"data":"Unautorized method"}])
        }
    }

    const user = {
        username:JSON.parse(event.body).username,
        role:JSON.parse(event.body).userrole,
        createdBy:JSON.parse(event.body).regBy,
        password:JSON.parse(event.body).password
    }
    var data = await userRegisration(user)

    console.log(data)
    if(!data.status){
        return {
            statusCode:400,
            body:JSON.stringify([data.message]),
            headers:{
                "Content-Type": "application/json",
              }
        }
    }
    return{
        statusCode:200,
        body:JSON.stringify([{"Data":data}]),
        headers: {
            "Content-Type": "application/json",
           // "Cache-Control": "max-age=3600" // Example: Cache for 1 hour
          }
    }
}
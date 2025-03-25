const { Products } = require("../libs/Connection.js");

exports.handler=async function (event,context) {
    const data = {
        token:event.headers.authorization,
        body:event.body
    }
    var products = await Products(data)
    if (!products.status){
        return{
            statusCode:401,
            body:JSON.stringify(products),
            headers:{
                "Content-Type":"application/json"
            }
        }
    }
    return{
        statusCode:200,
        body:JSON.stringify({message:products.data,status:products.status}),
        headers:{
            "Content-Type":"application/json"
        }
    }
}
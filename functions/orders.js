const { Orders } = require("../libs/Connection.js");

exports.handler=async function (event,context) {
    const data = {
        token:event.headers.authorization
    }
    var order = await Orders(data)
    if (!order.status){
        console.log(order)
        return{
            statusCode:401,
            body:JSON.stringify({
                message:order.data,
                status:order.status}),
            headers:{
                "Content-Type":"application/json"
            }
        }
    }
    return{
        statusCode:200,
        body:JSON.stringify({message:order.data,status:order.status}),
        headers:{
            "Content-Type":"application/json"
        }
    }
}
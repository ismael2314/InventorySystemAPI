const { List_Orders } = require("../libs/Orders.js");

exports.handler=async function (event,context) {
    const data = {
        token:event.headers.authorization,
        header:`${event.headers['user-agent']} * ${event.headers['client-ip']}`
    }
    var order = await List_Orders(data)
    if (!order.status){
        
        return{
            statusCode:401,
            body:JSON.stringify(order),
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
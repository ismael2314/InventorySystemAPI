const { Get_Products } = require("../libs/Products.js");

// return data if only the method is get and the token is valid
// check the token in the exported Products function

exports.handler=async function (event,context) {
    if(event.httpMethod!=="GET"){   
        return {
            statusCode:405,
            body:JSON.stringify({message:"Invalid method"}),
            headers:{
                "Content-Type":"application/json"
            }
        }
    }
    const data = {
        token:event.headers.authorization,
        body:event.body,
        header:`${event.headers['user-agent']} * ${event.headers['client-ip']}`
    }
    var products = await Get_Products(data)
    console.log(products)
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
        body:JSON.stringify(products),
        headers:{
            "Content-Type":"application/json"
        }
    }
}
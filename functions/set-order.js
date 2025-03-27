const { Add_Orders } = require("../libs/Orders.js");

exports.handler = async function (event,context){
    // try{
    if(event.httpMethod!=="POST"){   
        return {
            statusCode:405,
            body:JSON.stringify({message:"Invalid method"}),
            headers:{
                "Content-Type":"application/json"
            }
        }
    }
    const body  = JSON.parse(event.body)
    const data = {
        token:event.headers.authorization,
        header:`${event.headers['user-agent']} * ${event.headers['client-ip']}`,
        body:{
            OrderNumber:String(body.OrderNumber),
            ProductId:Number(body.ProductId),
            CustomerName:String(body.CustomerName),
            CustomerAddress:String(body.CustomerName),
            PaymentOptions:String(body.PaymentOptions),
            amountpaid:Number(body.amountpaid),
            isdescounted:Number(body.isdescounted),
            iscanceled:Number(body.isdescounted),
            deliveryOptions:String(body.deliveryOptions),
            OrderedOn	: new Date(body.OrderedOn),
            DeliverTime	: new Date(body.DeliverTime),
            DeliveredOn	: new Date(body.DeliverOn),
            recorededBy : context.clientContext.user.username
          }
        }
    const result =await Add_Orders(data);
    return{
        statusCode:200,
        body:JSON.stringify(result),
        headers:{
            "Content-Type":"application/json"
        }
    }
    // }catch(ex){
    //     return {
    //         statusCode:501,
    //         body:JSON.stringify({status:false,result:ex}),
    //         headers:{
    //             "Content-Type":"application/json"
    //         }
    //     }
    // }

}

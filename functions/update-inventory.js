const {Update_Products}  = require("../libs/Products.js")

exports.handler = async function (event,context){
  try{
    if(event.httpMethod!=="PUT"){   
      return {
          statusCode:405,
          body:JSON.stringify({message:"Invalid method"}),
          headers:{
              "Content-Type":"application/json"
          }
      }
  }
    const dataBody = JSON.parse(event.body);

    const data = {
      token:event.headers.authorization,
      header:`${event.headers['user-agent']} * ${event.headers['client-ip']}`,
      body:{
        productName:dataBody.productName
      , quatity:dataBody.quatity
      , sellingPrice:dataBody.sellingPrice
      , costPrice:dataBody.costPrice
      , catagory:dataBody.catagory
      , measureunit:dataBody.measureunit
      , maxstock:dataBody.maxstock
      , minstock:dataBody.minstock
      , barcode:dataBody.barcode
      , recordedby:context.clientContext.user.username
      , productId:dataBody.productId
      }
    }

    const result = await Update_Products(data);
  return {
    statusCode:200,
    body:JSON.stringify(result),
    headers:{
      "Content-Type":"appliaction/json"
    }
  }
  }catch(ex){
    console.log(ex)
    return {
      statusCode:501,
      body:JSON.stringify({message:ex,status:false}),
      headers:{
        "Content-Type":"appliaction/json"
      }
    }
  }
  
}
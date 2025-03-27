const { Insert_Products } = require("../libs/Products.js");

exports.handler = async function (request,response){
    
    try{
        if(request.httpMethod!=="POST"){   
            return {
                statusCode:405,
                body:JSON.stringify({message:"Invalid method"}),
                headers:{
                    "Content-Type":"application/json"
                }
            }
        }
        const dataBody = JSON.parse(request.body);
        
          const data = {
            token:request.headers.authorization,
            body:{
                productId:String(dataBody.productId),
                productname:String(dataBody.productname),
                productExDate:new Date(dataBody.productExDate),
                productStorage:String(dataBody.productStorage),
                quatity:Number(dataBody.quatity),
                sellingPrice:Number(dataBody.sellingPrice),
                costPrice:Number(dataBody.costPrice),
                catagory:Number(dataBody.catagory),
                measureunit:String(dataBody.measureunit),
                maxstock:Number(dataBody.maxstock),
                minstock:Number(dataBody.minstock),
                currentstock:Number(dataBody.currentstock),
                barcode:String(dataBody.barcode),
                recordedby:response.clientContext.user.username,
                token:response.clientContext.identity.token
              },
            header:`${request.headers['user-agent']} * ${request.headers['client-ip']}`
        }
        const insert = await Insert_Products(data)
        return {
            statusCode: 200,
            body: JSON.stringify(insert),
            headers: {
              "Content-Type": "application/json",
            }
          }
    }catch(ex){
        return {
            statusCode: 400,
            body: JSON.stringify({status:false,message:ex.message,}),
            headers: {
              "Content-Type": "application/json",
            }
          }
    }
    
}

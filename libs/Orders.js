const {Connection_Pool,Token_validate} = require("./Connection")

exports.List_Orders = async function ListOrders(params) {
  // all order list for the admin to see
    try {
      const valid = Token_validate(params);
      if (!(await valid).status) {
        return valid;
      }
      const sql = "SELECT * FROM orders";
      var [result] =await Connection_Pool.query(sql);
      console.log(params)
      if (params.body?.username){
        const sql = "SELECT * FROM orders WHERE `OrderNumber` = ?";
        const val = [params.body.username]
        
        [result] =await Connection_Pool.query(sql,val);
      }

      
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

exports.Add_Orders = async function AddOrders(params) {
    // all order list for the admin to see
     try {
        const valid = Token_validate(params);
        if (!(await valid).status) {
          return valid;
        }
        const body = params.body
        const Order = {
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
          recorededBy : String(body.recorededBy)
        }

          const sql = "INSERT INTO orders(`OrderNumber`,`productId`,`customerName`,`customerAddress`,`paymentOptions`,`amountPaid`,isdescounted,iscanceled,`deleiveryOptions`,OrderedOn	,DeliverTime	,DeliveredOn	,recorededBy)  VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
          const val = [
            Order.OrderNumber,
            Order.ProductId,
            Order.CustomerName,
            Order.CustomerAddress,
            Order.PaymentOptions,
            Order.amountpaid,
            Order.isdescounted,
            Order.iscanceled,
            Order.deliveryOptions,
            Order.OrderedOn	,
            Order.DeliverTime	,
            Order.DeliveredOn	,
            Order.recorededBy
          ]
          const [result] = await Connection_Pool.execute(sql,val)
        return result
      } catch (ex) {
        return ex
      }
};
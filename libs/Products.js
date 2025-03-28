const {Connection_Pool,Token_validate} = require("./Connection")

exports.Get_Products = async (params) => {
    try {
      const valid = await Token_validate(params);
      if (!valid.status) {
        return valid;
      }
      var sql = "SELECT * FROM product_catagory ";
      var [result] =await Connection_Pool.query(sql);
  
      if(params.body!== undefined && JSON.parse(params.body).productId !==undefined){
        const productid = JSON.parse(params.body).productId
        var sql = "SELECT * FROM product_catagory WHERE `productId`=?";
        var val = [productid];
  
        const [result] = await Connection_Pool.query(sql, val);
  
        return {
          status: true,
          data:result
        };
      }
      return {
        status: true,
        data:result
      };
    } catch (ex) {
      return {
        status: false,
        message:ex
      };
    }
  };


  exports.Insert_Products = async function setProducts(params) {
      
      try{
          const valid = await Token_validate(params);
          if (!valid.status) {return valid;}

        const Product = {
          ProductID:String(params.body.productId),
          ProductName:String(params.body.productname),
          ProductExDate:new Date(params.body.productExDate),
          ProductStorage:params.body.productStorage,
          quatity:Number(params.body.quatity),
          sellingPrice:Number(params.body.sellingPrice).toFixed(2),
          costPrice:Number(params.body.costPrice).toFixed(2),
          catagory:Number(params.body.catagory),
          measureunit:String(params.body.measureunit),
          maxstock:Number(params.body.maxstock),
          minstock:Number(params.body.minstock),
          currentstock:Number(params.body.currentstock),
          barcode:String(params.body.barcode),
          supplier:Number(params.body.supplier),
          recordedby:String(params.body.recordedby)
        }
        const sql = "INSERT INTO inventory (`productId`,`productName`,`productExDate`,`productStorage`,quatity,`sellingPrice`,`costPrice`,catagory,measureunit,maxstock,minstock,currentstock,barcode,recordeddate,recordedby,supplier) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        const val = [ Product.ProductID,
                      Product.ProductName,
                      Product.ProductExDate,
                      Product.ProductStorage,
                      Product.quatity,
                      Product.sellingPrice,
                      Product.costPrice,
                      Product.catagory,
                      Product.measureunit.toUpperCase(),
                      Product.maxstock,
                      Product.minstock,
                      Product.currentstock,
                      Product.barcode,
                      new Date(),
                      Product.recordedby,
                      Product.supplier
                    ]
  
        const [result] = await Connection_Pool.execute(sql,val)
        return result
      }catch(ex){
        return ex
      }
      
  }

  exports.Update_Products = async function updateProduct (params){

    try{

          const Product = {
              productName:String(params.body.productName)
            , quatity:Number(params.body.quatity)
            , sellingPrice:Number(params.body.sellingPrice).toFixed(2)
            , costPrice:Number(params.body.costPrice).toFixed(2)
            , catagory:Number(params.body.catagory)
            , measureunit:String(params.body.measureunit)
            , maxstock:Number(params.body.maxstock)
            , minstock:Number(params.body.minstock)
            , barcode:String(params.body.barcode)
            , recordedby:String(params.body.recordedby)
            , recordeddate:new Date()
            , productId:String(params.body.productId)
          }
         
          const valid = await Token_validate(params);
          if (!valid.status) {return valid;}
          const sql = "UPDATE inventory SET `productName`=? , quatity=?, `sellingPrice`=?, `costPrice`=? , `catagory`=? ,measureunit=?, maxstock=?,minstock=?,barcode=?,recordedby=?,recordeddate=? WHERE `productId`=? ";
          const val = [
            Product.productName
          , Product.quatity
          , Product.sellingPrice
          , Product.costPrice
          , Product.catagory
          , Product.measureunit.toUpperCase()
          , Product.maxstock
          , Product.minstock
          , Product.barcode
          , Product.recordedby
          , Product.recordeddate
          , Product.productId
          ]

          const [result] = await Connection_Pool.execute(sql,val)
          console.log(result)
          return result
        }catch(ex){
          console.log(ex)
            return ex
        }
  }
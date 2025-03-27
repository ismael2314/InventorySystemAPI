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
    console.log(params)
    const valid = await Token_validate(params);
      if (!valid.status) {
        return valid;
      }
      
      try{
        const Product = {
          ProductID:String(params.body.productId),
          ProductName:String(params.body.productname),
          ProductExDate:new Date(params.body.productExDate),
          ProductStorage:params.body.productStorage,
          quatity:Number(params.body.quatity),
          sellingPrice:Number(params.body.sellingPrice),
          costPrice:Number(params.body.costPrice),
          catagory:Number(params.body.catagory),
          measureunit:String(params.body.measureunit),
          maxstock:Number(params.body.maxstock),
          minstock:Number(params.body.minstock),
          currentstock:Number(params.body.currentstock),
          barcode:String(params.body.barcode),
          recordedby:String(params.body.recordedby)
        }
        const sql = "INSERT INTO inventory (`productId`,`productName`,`productExDate`,`productStorage`,quatity,`sellingPrice`,`costPrice`,catagory,measureunit,maxstock,minstock,currentstock,barcode,recordeddate,recordedby) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        const val = [ Product.ProductID,
                      Product.ProductName,
                      Product.ProductExDate,
                      Product.ProductStorage,
                      Product.quatity,
                      Product.sellingPrice,
                      Product.costPrice,
                      Product.catagory,
                      Product.measureunit,
                      Product.maxstock,
                      Product.minstock,
                      Product.currentstock,
                      Product.barcode,
                      new Date(),
                      Product.recordedby
                    ]
  
        const [result] = await Connection_Pool.execute(sql,val)
        return result
      }catch(ex){
        return ex
      }
      
  }
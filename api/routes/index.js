var express=require("express");
var router=express.Router();
var commerceSDK=require("commerce-sdk");
const {ClientConfig,helpers,Search,Product}=commerceSDK;
var toReturn;

const config = {
    headers: {},
    parameters: {
        clientId: '8bfe8327-a12a-4ca5-93a4-ada2ab99c6e1',
        organizationId: 'f_ecom_bcld_s02',
        shortCode: 'nhmagqf3',
        siteId: 'bikkembergs'
    }
}

//---------------SEARCH---------------//

router.get("/searchAPI",function(req,res,next){
    find(req.query.param);
    res.send(toReturn);
});

find = (param) =>{
    helpers.getShopperToken(config, { type: "guest" }).then(async (token) => {
        try{
            config.headers["authorization"] = token.getBearerHeader();
            const searchClient = new Search.ShopperSearch(config);
            const searchResults = await searchClient.productSearch({
              parameters:{
                q:param,
                limit: 50
              }         
            });
            if (searchResults.total) {
            } else {
                console.log("No results for search");
            }
            toReturn=searchResults;
        }catch (e){
            console.error(e);
            console.error(await e.response.text());
        }//internal-try-catch
    }).catch(async (e) => {
        console.error(e);
        console.error(await e.response.text());
    });//external-try-catch
}//find

//---------------DETAILS---------------//

router.get("/detailsAPI",function(req,res,next){
  details(req.query.id);
  res.send(toReturn) 
});

details = (id) =>{
  helpers.getShopperToken(config, { type: "guest" }).then(async (token) => {
      try{
          config.headers["authorization"] = token.getBearerHeader();
          const productClient = new Product.ShopperProducts(config);
          const productDetails = await productClient.getProduct({
              parameters:{
                  id: id
              }
          });
          toReturn=productDetails;
      }catch (e){
          console.error(e);
          console.error(await e.response.text());
      }//internal-try-catch
  }).catch(async (e) => {
      console.error(e);
      console.error(await e.response.text());
  });//external-try-catch
}//find

module.exports=router;

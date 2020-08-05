var express=require("express");
var router=express.Router();
var commerceSDK=require("commerce-sdk");
const makeFetch = require('make-fetch-happen');
const {ClientConfig,helpers,Search,Product,Checkout}=commerceSDK;
var toReturn;
const clientId = "8bfe8327-a12a-4ca5-93a4-ada2ab99c6e1";
const clientSecret = "HeadlessCommercePOC";
const realm = "bcld";
const instance = "s02";
const config = {
    headers: {},
    parameters: {
        clientId: '8bfe8327-a12a-4ca5-93a4-ada2ab99c6e1',
        organizationId: 'f_ecom_bcld_s02',
        shortCode: 'nhmagqf3',
        siteId: 'bikkembergs'
    }
}
var basketToken;
var basketId;

async function getAuthToken(scope){
  let credentials = `${clientId}:${clientSecret}`;
  let buff = Buffer.from(credentials);
  let base64data = buff.toString('base64');
  const req = {
      method: "post",
      body: `grant_type=client_credentials&scope=SALESFORCE_COMMERCE_API:${realm}_${instance} ${scope}`,
      headers: {"Authorization": `Basic ${base64data}`,
          "Content-Type": "application/x-www-form-urlencoded"}
  };
  const response = await makeFetch("https://account.demandware.com/dw/oauth2/access_token", req);
  let token;
  if (response.ok || response.status === 304) {
      const text = await response.text();
      const respJson = JSON.parse(text);
      token = respJson["access_token"];
  } else {
      console.log(`Error: ${response.status} ${response.statusText}`);
  }
  return token;
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
            console.log(toReturn);
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
  details(req.query.id)
  res.send(toReturn) 
});

details = (id) =>{
  helpers.getShopperToken(config, { type: "guest" }).then(async (token) => {
      try{
          config.headers["authorization"] = token.getBearerHeader();
          const productClient = new Product.ShopperProducts(config);
          const productDetails = await productClient.getProduct({
              parameters:{
                  id: id,
                  allImages: true
              }
          });
          toReturn=productDetails;
          console.log(toReturn);
      }catch (e){
          console.error(e);
          console.error(await e.response.text());
      }//internal-try-catch
  }).catch(async (e) => {
      console.error(e);
      console.error(await e.response.text());
  });//external-try-catch
}//details

//---------------CATEGORIES---------------//

router.get("/categoriesAPI",function(req,res,next){
  getCategories();
  res.send(toReturn) 
});

const getCategories = async () => {
  try{
    const token = await getAuthToken("sfcc.catalogs");
    if (!!!token)
        return;
    const productClient = new Product.Catalogs(config);
    const categoriesResult = await productClient.getCategoriesFromCatalog({
        parameters: {
            catalogId: "bkk-storefront-catalog",
            limit: 10
        },
        headers: { authorization: `Bearer ${token}` }
    })
    toReturn=categoriesResult;
    console.log(toReturn);
  }catch (e){
    console.error(e);
    console.error(await e.response.text());
    };
};//getCategories

//---------------CATEGORY-PRODUCTS---------------//

router.get("/categoryProductsAPI",function(req,res,next){
  getCategoryProducts(req.query.id);
  res.send(toReturn) 
});

const getCategoryProducts = async (id) => {
    try{
        const token = await getAuthToken("sfcc.catalogs");
        if (!!!token)
            return;
        const productClient = new Product.Catalogs(config);
        const categoriesResult = await productClient.searchProductsAssignedToCategory({
            parameters: {
                catalogId: "bkk-storefront-catalog",
                categoryId: id
            },
            headers: { authorization: `Bearer ${token}` },
            body: {
                query: {
                    onlineFlag: true
                }
            },
        })
        toReturn=categoriesResult;
        console.log(toReturn);
    }catch (e){
        console.error(e);
        console.error(await e.response.text());
    };
};//getCategoryProducts

//---------------CREATE-BASKET---------------//

createBasket = async() =>{
    basketToken = await helpers.getShopperToken(config, { type: "guest" });
      try{
          config.headers["authorization"] = basketToken.getBearerHeader();
          const shopperClient = new Checkout.ShopperBaskets(config);
          const searchResults = await shopperClient.createBasket({
                body: {},
          });
          basketId=searchResults["basketId"];
          const det = await shopperClient.updateCustomerForBasket({
                parameters: {
                    basketId: basketId
                },
                body: {
                    email: "example_customer@temp.com"
                }
          })
          toReturn = det;
      }catch (e){
          console.error(e);
          console.error(await e.response.text());
      }//internal-try-catch
}//createBasket

//---------------GET-BASKET---------------//

router.get("/getBasketAPI",function(req,res,next){
    getBasket();
    res.send(toReturn) 
});
  
getBasket = async() =>{
    if(typeof basketToken !== 'undefined' || typeof basketId !== 'undefined'){
        try{
            config.headers["authorization"] = basketToken.getBearerHeader();
            const shopperClient = new Checkout.ShopperBaskets(config);
            const searchResults = await shopperClient.getBasket({
                parameters: {
                    basketId: basketId
                }
            })
            toReturn=searchResults;
        }catch (e){
            createBasket();
        }//internal-try-catch
    }else{
        await createBasket();
    }
}//getBasket

//---------------ADD-ITEM-BASKET---------------//

router.get("/addItemToBasketAPI",function(req,res,next){
    addItemToBasket(req.query.item);
    res.send(toReturn) 
});
  
addItemToBasket = async(item) =>{
    try{
        config.headers["authorization"] = basketToken.getBearerHeader();
        const shopperClient = new Checkout.ShopperBaskets(config);
        const searchResults = await shopperClient.addItemToBasket({
            parameters: {
                basketId: basketId
            },
            body:[{
                productId: item,
                quantity: 1
            }]
        })
        toReturn=searchResults;
        console.log(toReturn);
    }catch (e){
        console.log(e);
    }//internal-try-catch
}//getBasket


module.exports=router;
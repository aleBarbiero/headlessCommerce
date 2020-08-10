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
        siteId: 'headlessCommerce'
    }
}
var basketToken;
var basketId;
var categoriesResult;
let categoryProductsResult
var productDetailsResult;
var searchResult;
var cartResponse;

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

async function findInCart(id){
    let itemId="temp";
    if(cartResponse["productItems"]){
        cartResponse["productItems"].map(item => {
            if(item.productId === id)
                itemId=item.itemId;
        })
    }
    return itemId;
}

//---------------SEARCH---------------//

router.get("/searchAPI",function(req,res,next){
    find(req.query.param).then(now => res.send(searchResult));
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
              },
              retrySettings:{
                  forever: true
              }         
            });
            if (searchResults.total) {
            } else {
                console.log("No results for search");
            }
            searchResult=searchResults;
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
  details(req.query.id).then(now => res.send(productDetailsResult))
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
              },
              retrySettings:{
                forever: true
            } 
          });
          productDetailsResult=productDetails;
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
  getCategories().then(now => res.send(categoriesResult)); 
});

const getCategories = async () => {
  try{
    const token = await getAuthToken("sfcc.catalogs");
    if (!!!token)
        return;
    const productClient = new Product.Catalogs(config);
    const categories = await productClient.getCategoriesFromCatalog({
        parameters: {
            catalogId: "headless-storefront-catalog",
            limit: 10
        },
        headers: { authorization: `Bearer ${token}` },
        retrySettings:{
            forever: true
        } 
    })
    categoriesResult=categories;
  }catch (e){
    console.error(e);
    console.error(await e.response.text());
    };
};//getCategories

//---------------CATEGORY-PRODUCTS---------------//

router.get("/categoryProductsAPI",function(req,res,next){
  getCategoryProducts(req.query.id, res).then(now => res.send(categoryProductsResult));
});

const getCategoryProducts = async (id,res) => {
    try{
        const token = await getAuthToken("sfcc.catalogs");
        if (!!!token)
            return;
        const productClient = new Product.Catalogs(config);
        const categoriesResult = await productClient.searchProductsAssignedToCategory({
            parameters: {
                catalogId: "headless-storefront-catalog",
                categoryId: id
            },
            retrySettings:{
                forever: true
            },
            headers: { authorization: `Bearer ${token}` },
            body: {
                query: {
                    termQuery: {
                        fields: [
                        "onlineFlag"
                        ],
                        operator: "is",
                        values: [
                        true
                        ]
                    }
                },
                select: "(**)"
            }
        })
        categoryProductsResult=categoriesResult;
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
                },
                retrySettings:{
                    forever: true
                } 
          })
          cartResponse=searchResults;
          toReturn = det;
      }catch (e){
          console.error(e);
          console.error(await e.response.text());
      }//internal-try-catch
}//createBasket

//---------------GET-BASKET---------------//

router.get("/getBasketAPI",function(req,res,next){
    getBasket().then(now => res.send(toReturn));
});
  
getBasket = async() =>{
    if(typeof basketToken !== 'undefined' || typeof basketId !== 'undefined'){
        try{
            config.headers["authorization"] = basketToken.getBearerHeader();
            const shopperClient = new Checkout.ShopperBaskets(config);
            const searchResults = await shopperClient.getBasket({
                parameters: {
                    basketId: basketId
                },
                retrySettings:{
                    forever: true
                } 
            })
            cartResponse=searchResults;
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
    addItemToBasket(req.query.item).then(now => res.send(toReturn)); 
});
  
addItemToBasket = async(item) =>{
    try{
        config.headers["authorization"] = basketToken.getBearerHeader();
        const shopperClient = new Checkout.ShopperBaskets(config);
        const searchResults = await shopperClient.addItemToBasket({
            parameters: {
                basketId: basketId
            },
            retrySettings:{
                forever: true
            },
            body:[{
                productId: item,
                quantity: 1
            }]
        })
        cartResponse=searchResults;
        toReturn=searchResults;
    }catch (e){
        console.log(e);
    }//internal-try-catch
}//getBasket

//---------------REMOVE-ITEM-BASKET---------------//

router.get("/removeItemToBasketAPI",function(req,res,next){
    removeItem(req.query.item).then(now => res.send(toReturn));
})

removeItem = async(item) => {
    try{
        let id=await findInCart(item);
        config.headers["authorization"] = basketToken.getBearerHeader();
        const shopperClient = new Checkout.ShopperBaskets(config);
        const itemResult = await shopperClient.removeItemFromBasket({
            parameters:{
                basketId: basketId,
                itemId: id
            },
            retrySettings:{
                forever: true
            }
        })
        cartResponse=itemResult;
        toReturn=itemResult;
    }catch (e){
        console.log(e);
    }//internal-try-catch
}//updateItem

//---------------UPDATE-ITEM-BASKET---------------//

router.get("/updateItemToBasketAPI",function(req,res,next){
    updateItem(req.query.item,req.query.tot).then(now => res.send(toReturn));
})

updateItem = async(item,tot) => {
    try{
        let id=await findInCart(item);
        config.headers["authorization"] = basketToken.getBearerHeader();
        const shopperClient = new Checkout.ShopperBaskets(config);
        const itemResult = await shopperClient.updateItemInBasket({
            parameters:{
                basketId: basketId,
                itemId: id
            },
            body:{
                productId: item,
                quantity: parseInt(tot)
            }
        })
        toReturn=itemResult;
    }catch (e){
        console.log(e);
    }//internal-try-catch
}//updateItem

//---------------CLEAR-BASKET---------------//

router.get("/clearBasketAPI",function(req,res,next){
    clearCart().then(now => res.send(toReturn));
})

clearCart = async() => {
    try{
        config.headers["authorization"] = basketToken.getBearerHeader();
        const shopperClient = new Checkout.ShopperBaskets(config);
        const basketResult = await shopperClient.deleteBasket({
            parameters:{
                basketId: basketId
            }
        })
        toReturn = await createBasket();
    }catch(e){
        console.log(e)
    }//internal-try-catch
}//clearCart

module.exports=router;
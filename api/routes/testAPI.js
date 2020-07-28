var express=require("express");
var router=express.Router();
var request=require("request");
var commerceSDK=require("commerce-sdk");
const {ClientConfig,helpers,Search}=commerceSDK;
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

helpers.getShopperToken(config, { type: "guest" }).then(async (token) => {

    try{
        // Add the token to the client configuration
        config.headers["authorization"] = token.getBearerHeader();
        // Create a new ShopperSearch API client
        const searchClient = new Search.ShopperSearch(config);
        // Search for dresses
        const searchResults = await searchClient.productSearch({
            parameters: {
                q: "shoes",
                limit: 5
            }
        });

        if (searchResults.total) {
            const firstResult = searchResults.hits[0];
            console.log(`${firstResult.productId} ${firstResult.productName}`);
        } else {
            console.log("No results for search");
        }

        toReturn=searchResults;

    }catch (e){
        console.error(e);
        console.error(await e.response.text());
    }

}).catch(async (e) => {
    console.error(e);
    console.error(await e.response.text());
});


router.get("/",function(req,res,next){
   res.send(toReturn) 
});

module.exports=router;
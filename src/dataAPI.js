var express = require('express')
var cors = require('cors')
var app = express()
const fetch = require('node-fetch');

app.use(cors())
app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

fetch(/*'https://ghibliapi.herokuapp.com/films'*/
    'https://nhmagqf3.api.commercecloud.salesforce.com/product/shopper-products/v1/organizations/f_ecom_bcld_s02/products')
    .then(res => res.json())
    .then((data) => {
        console.log(data);
    }).catch( e => {
        console.log(e);
    })

/*import * as CommerceSdk from "commerce-sdk";

const {ClientConfig,helpers,Search} = CommerceSdk;


const config = {
    headers: {},
    parameters: {
        clientId: "8bfe8327-a12a-4ca5-93a4-ada2ab99c6e1",
        organizationId: "f_ecom_bcld_s02",
        shortCode: "nhmagqf3",
        siteId: "headlessCommerce"
    }
}

export default({})

------------------

helpers.getShopperToken(config, {type: "guest"}).then(async (token) => {
    try{
        //Add token
        config.headers["authorization"]=token.getBearerHeader();
        //Create a search for client   
        const searchClient=new Search.ShopperSearch(config);
        //Search for specific product
        const searchResults = await searchClient.productSearch({
            parameters: {
                q: "dress",
                limit: 5
            }
        });

        if(searchResults.total){
            const firstResult=searchResults.hits[0];
            console.log(firstResult);
        }else{
            console.log("no results");
        }
    }catch(e){
        console.error(e);
        console.error(await e.response.text());
    }

}).catch(async (e) => {
    console.error(e);
    console.error(await e.response.text());
})*/

/*import {createClient} from 'contentful';

export default createClient({
    space: "r2d2aiydxgak",
    accessToken: "FbxauuhDwUtsIxsoZLgMe0bAv4TgzpgfvOcczQJl78o"
})*/
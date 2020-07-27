fetch(/*'https://ghibliapi.herokuapp.com/films'*/
    'https://nhmagqf3.api.commercecloud.salesforce.com/product/shopper-products/v1/organizations/f_ecom_bcld_s02/products')
    .then(res => res.json())
    .then((data) => {
        console.log(data);
    }).catch( e => {
        console.log(e);
    })

/*--------------------------------------

import {createClient} from 'contentful';

export default createClient({
    space: "r2d2aiydxgak",
    accessToken: "FbxauuhDwUtsIxsoZLgMe0bAv4TgzpgfvOcczQJl78o"
})*/
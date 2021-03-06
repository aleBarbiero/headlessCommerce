import React, { Component } from 'react';

const ProductContext = React.createContext();
const hostName = window.location.protocol + "//" + window.location.hostname + ":9000";
//const frontPort = process.env.NODE_ENV === "production" ? "" : ":3000";

export default class ProductProvider extends Component {

    constructor(){
        super();
        this.state={
            categories: [],
            products:[],
            sortedProducts: [],
            cart:[],
            cartTotal:0,
            onesToWatch: [],
            loading: true,
            cartLoading: true,
            type: "all",
            compatibility: "all",
            brand: "all",
            price: 0,
            minPrice: 0,
            maxPrice: 0,
            limit: 4,
            paypalLoading: false,
            logged: false,
            loginError: "",
            signinError:"",
            user: null,
            buyed: false,
            loginLoading: false,
            signinLoading: false,
            wishlist: []
        };
        this.setUp();
    }

     setUp(){
        /*categories*/
         this.getCategories()
        .then(res => this.setState({categories: res}))
        .then(res => {
            this.setState({categories: this.clean(this.state.categories)});
        })
        /*products*/
        .then(res => {
            let temp=this.state.categories;
            temp.map((item,index) => {
                return this.getProducts(item.id)
                .then(res => this.setState({products: this.state.products.concat(res)}))
                .then(res => {
                    if(index===temp.length-1){
                        let products=this.state.products;
                        let tempSorted=products.sort((a, b) => (a.price > b.price) ? 1 : -1);
                        let onesToWatch=[tempSorted[0], tempSorted[1], tempSorted[2]];
                        let minPrice=Math.min(...products.map(item => item.price));
                        let maxPrice=Math.max(...products.map(item => item.price));
                        let price=maxPrice;
                        this.setState({
                            products,
                            sortedProducts:products,
                            onesToWatch,
                            maxPrice,
                            minPrice,
                            price,
                            loading:false
                        })
                        this.getCart().then(res => {
                            if(res){
                                this.setState(() => {
                                    return {
                                        cart:res,
                                        cartLoading:false,
                                        buyed: false
                                    }
                                },() => this.addTotals());
                            }
                        })
                        .then(this.checkLogged())
                    }//if
                })
            });
        })
        /*end-products*/
    }//componentDidMount

    clean = (list) =>{
        return list.filter(function (el) {
            return el != null && el !== "";
          });
    }//clean

    //getCategories
    getCategories = () => {
        return fetch(`${hostName}/categoriesAPI`)
        .then(res => res.json())
        .then(categories => {
            let tempCat = categories["data"].map(item => {
                let id=item.id;
                let name=item.id;
                let category={id,name};
                if(category.id!=="root")
                    return category;
                else   
                    return null;
            })
            return tempCat;
        })
        .catch(error => window.location.reload(true))
    }//getCategories

    //getProducts
    getProducts = (category) => {
        return fetch(`${hostName}/categoryProductsAPI?id=${category}`)
        .then(res => res.json())
        .then(products => {
            let tempProd = products["hits"].map(item => {
                if(item.product.type.master){
                    let type=item.product.classificationCategory.categoryId;
                    let id=item.productId;
                    let name=item.productName.default;
                    let price=item.product.price;
                    let element=id;
                    let brand=item.product.brand;
                    let images=item.product.imageGroups[0].images.map(image => image.absUrl);
                    let inStock=item.product.inStock;
                    let extra=this.clean(item.product.longDescription.default.source.split('.'));
                    let desc=item.product.shortDescription.default.source;
                    let compatibility=[];
                    for(let i=0;i<item.product.variants.length;i++){
                        compatibility[i]={id: item.product.variants[i].productId, value: item.product.variants[i].variationValues.compatibility};
                    }
                    let inCartStatus=[];
                    compatibility.map((item,index) => {
                        return inCartStatus[index]={qty:0,inCart:false,total:0,inWish:false}
                    })
                    let product={id,type,name,price,element,brand,images,inStock,extra,desc,compatibility,inCartStatus};
                    return product;
                }
                return null;
            })
            return this.clean(tempProd);
        })
        .catch(error => window.location.reload(true))
    }//getProducts

    //getCart
    getCart = () => {
        return fetch(`${hostName}/getBasketAPI`)
        .then(res => res.json())
        .then(res => {
            let arr=[];
            if(res["productItems"]){
                let tempCart=res["productItems"].map(res => {
                    let cartProduct;
                    let price=res.basePrice;
                    let qty=res.quantity;
                    let name=res.productName;
                    let total=res.price;
                    let tempProducts=this.state.products;
                    let element,variationId,variation,images,id,brand;
                    tempProducts.map(product => {
                        product.compatibility.map((comp,index) => {
                            if(comp.id === res.productId){
                                id=comp.id;
                                element=product.element;
                                brand=product.brand;
                                variationId=index;
                                variation=comp.value;
                                images=product.images;
                                product.inCartStatus[index].qty=1;
                                product.inCartStatus[index].inCart=true;
                                product.inCartStatus[index].total=total;
                            }
                            return null;
                        })
                        return null;
                    })
                    cartProduct={element,variationId,variation,price,qty,name,total,images,id,brand};
                    return cartProduct;
                })
                return tempCart;
            }else
                return arr;
        })
        .catch(error => window.location.reload(false))
    }//getCart

    //checkLogged
    checkLogged = () => {
        return fetch(`${hostName}/loggedAPI`)
        .then(res => res.json())
        .then(res => this.setUser(res))
        .catch(res => this.setState({logged: false}))
    }

    //sort
    sort = event => {
        let {
            sortedProducts
        } = this.state;
        const value=event.target.value;
        if(value==="alpha")
            sortedProducts=sortedProducts.sort((a, b) => (a.name > b.name) ? 1 : -1);
        else if(value==="price")
            sortedProducts=sortedProducts.sort((a, b) => (a.price > b.price) ? 1 : -1);
        this.setState({sortedProducts:sortedProducts});
    }//sort

    //getProduct
    getProduct = (element) => {
        let tempProduct=[...this.state.products];
        const product=tempProduct.find(product => product.element === element);
        return product;
    }//getProduct

    //resetChanges
    resetChanges = event => {
        let{
            products
        } = this.state;
        this.setState({sortedProducts:products, limit: 4})
    }//resetChanges

    //setLimit
    setLimit = event => {
        this.setState({limit: this.state.limit + 4})
    }

    //handleChanges
    handleChanges = event => {
        const target=event.target;
        const value=target.type === 'checkbox' ? target.checked : target.value;
        const name=event.target.name;
        this.setState({[name]:value},this.filterProducts)
    }//handleChanges

    //addToCart
    addToCart = async(id,variation) => {
        let tempProducts=[...this.state.products];
        const index=tempProducts.indexOf(this.getProduct(id));
        const product=tempProducts[index];
        product.inCartStatus[variation].inCart=true;
        product.inCartStatus[variation].qty=1;
        product.inCartStatus[variation].total=product.price;
        fetch(`${hostName}/addItemToBasketAPI?item=${product.compatibility[variation].id}`)
        .catch(error => window.location.reload(true))
        let cartProduct={element: product.element,variation: product.compatibility[variation].value,variationId: variation,name: product.name, price:product.price,
            qty: product.inCartStatus[variation].qty,total: product.inCartStatus[variation].total,images: product.images,id:product.compatibility[variation].id,brand: product.brand}
        this.setState(() => {
            return{products: tempProducts, cart: [...this.state.cart,cartProduct],buyed: false}
        },
        () => {
            this.addTotals();
        })
    }

    //increment
    increment = async(id,variation) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.element === id && item.variationId === variation);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.qty++;
        product.total=product.qty*product.price;
        fetch(`${hostName}/updateItemToBasketAPI?item=${product.id}&tot=${product.qty}`)
        .catch(error => window.location.reload(true))
        this.setState(() => {
            return {
                cart:[...tempCart]
            }
        },() => {
            this.addTotals();
        })
    }

    //decrement
    decrement = async(id,variation) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.element === id && item.variationId === variation);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.qty--;
        fetch(`${hostName}/updateItemToBasketAPI?item=${product.id}&tot=${product.qty}`)
        .catch(error => window.location.reload(true))
        product.total=product.qty*product.price;
        this.setState(() => {
            return {
                cart:[...tempCart]
            }
        },() => {
            this.addTotals();
        })
    }

    //clearCart
    clearCart = () => {
        fetch(`${hostName}/clearBasketAPI`)
        this.setState(() => {
            return{
                cart:[]
            }
        }, () => {
            this.restoreValues();
        })
    }

    //removeItem
    removeItem = async(id,variation) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        const selectedCart = tempCart.find(item => item.element === id && item.variationId === variation);
        const indexCart=tempCart.indexOf(selectedCart);
        const item=tempCart[indexCart].id;
        fetch(`${hostName}/removeItemToBasketAPI?item=${item}`)
        .catch(error => window.location.reload(true))
        tempCart = tempCart.filter(item => item.element !== id || (item.element === id && item.variationId !== variation));
        const index = tempProducts.indexOf(this.getProduct(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCartStatus[variation].inCart=false;
        removedProduct.inCartStatus[variation].qty=0;
        removedProduct.inCartStatus[variation].total=0;
        this.setState(() => {
            return {
                cart:[...tempCart],
                products:[...tempProducts]
            }
        },() => {
            this.addTotals();
        })
    }

    //restore
    restoreValues = () => {
        let prods=[...this.state.products];
        prods.map(item => {
            item.inCartStatus.map(order => {
                order.qty=0;
                order.total=0;
                order.inCart=false;
                return order;
            })
            return item;
        })
        this.setState(() => {
            return {
                products: prods
            }
        })
    } 

    //addTotals
    addTotals = () => {
        let cartTotal=0;
        this.state.cart.map(item => {
            cartTotal+=item.total;
            return null;
        });
        this.setState(() => {
            return {
                cartTotal: cartTotal
            }
        })
    }

    filterProducts = () => {
        let{
            products,
            type,
            compatibility,
            price,
            brand
        } = this.state;
        let tempProducts=[...products];

        //capacity
        if(compatibility!=='all'){
            let tempFiltered=[];
            tempProducts.map(product => {
                product.compatibility.map((item) => {
                    if(item.value.toLowerCase() === compatibility.toLowerCase())
                        tempFiltered.push(product);
                    return null;
                })
                return null;
            })
            tempProducts=tempFiltered;
        }

        //type
        if(type!=='all')
            tempProducts=tempProducts.filter(product => product.type === type);
        
        //price
        price=parseInt(price);
        tempProducts=tempProducts.filter(product => product.price <= price);
        
        //brand
        if(brand!=='all')
                tempProducts=tempProducts.filter(product => product.brand === brand)

        this.setState({
            sortedProducts:tempProducts
        })
    }//filterProducts

    //buyItems
    buyItems = (paypal,client,shipping,payment) => {
        if(this.state.logged)
            client.customerNum = this.state.user.customerNum;
        if(!paypal){
            let stringClient,stringShipping;
            stringClient = JSON.stringify(client);
            stringShipping = JSON.stringify(shipping);
            fetch(`${hostName}/onDeliveryAPI?client=${stringClient}&shipping=${stringShipping}`)
            .then(now => fetch(`${hostName}/checkoutAPI`))
            .then(now => this.clearCart())
            .then(now => this.setState({buyed : true}))
            .catch(error => window.location.reload(true))
        }else{
            let stringClient,stringShipping,stringPayment;
            stringClient = JSON.stringify(client);
            stringShipping = JSON.stringify(shipping);
            stringPayment = JSON.stringify(payment);
            this.setState({paypalLoading:true})
            fetch(`${hostName}/payPalAPI?client=${stringClient}&shipping=${stringShipping}&payment=${stringPayment}`)
            .then(now => fetch(`${hostName}/checkoutAPI`))
            .then(now => this.clearCart())
            .then(now => this.setState({paypalLoading:false}))
            .then(now => this.setState({buyed : true}))
            .catch(error => window.location.reload(true))
        }
    }//buyItems

    //login
    login = (user,psw) => {
        this.setState({loginLoading: true})
        let credentials = `${user}:${psw}`;
        let buff = Buffer.from(credentials);
        let base64data = buff.toString('base64');
        fetch(`${hostName}/loginAPI?user=${base64data}`)
        .then(res => res.json())
        .then(res => this.setUser(res))
        .catch(res => this.setState({loginError:"Username or password invalid"}))
        .finally(res => this.setState({loginLoading: false}))
    }//login

    //logout
    logout = () => {
        fetch(`${hostName}/logoutAPI`)
        .then(this.setState({logged: false, user: null,wishlist: []}))
        .catch(error => this.setState({logged: false, user: null,wishlist: []}))
    }//logout

    //signin
    signin = (user,address) => {
        this.setState({signinLoading:true})
        let stringUser,stringAddress;
        stringUser = JSON.stringify(user);
        stringAddress = JSON.stringify(address);
        fetch(`${hostName}/signinAPI?user=${stringUser}&address=${stringAddress}`)
        .then(res => res.json())
        .then(now => {
            if(!(typeof(now.error) === "undefined"))
                this.setState({signinError: "Username not available"})
            else
                this.login(user.username,user.psw)
        })
        .catch(error => window.location.reload(true))
        .finally(res => this.setState({signinLoading:false}))
    }//signin

    //addToWishlist
    addToWishlist = async(id,variation) => {
        let tempProducts=[...this.state.products];
        const index=tempProducts.indexOf(this.getProduct(id));
        const product=tempProducts[index];
        product.inCartStatus[variation].inWish=true;
        let tempWish = [...this.state.wishlist,{product: product,variation: variation}];
        this.setState({
            wishlist: tempWish
        })
        fetch(`${hostName}/addToWishlistAPI?item=${product.compatibility[variation].id}&list=${this.state.wish}`)
        .then(res => res.json())
        .catch(now => this.setState({logged:false, user: null}));
    }//addToWishlist

    //removeFromWishlist
    removeFromWishlist = async(id,variation) => {
        let tempProducts=[...this.state.products];
        const index=tempProducts.indexOf(this.getProduct(id));
        const product=tempProducts[index];
        product.inCartStatus[variation].inWish=false;
        let tempWish = [...this.state.wishlist];
        tempWish = tempWish.filter(item => (item.product.id !== product.id || item.variation !== variation));
        this.setState({wishlist: tempWish})
        fetch(`${hostName}/removeFromWishlistAPI?item=${product.compatibility[variation].id}&list=${this.state.wish}`)
        .then(res => res.json())
        .catch(now => this.setState({logged:false, user: null}));
    }//removeFromWishlist

    //setUser
    setUser = (res) => {
        this.setState({
            loginError : "",
            signinError: "",
            logged:true,
            user:{
                name: res.user.firstName,
                surname: res.user.lastName,
                email: res.user.email,
                username: res.user.login,
                customerNum: res.user.customerNo,
                address: {
                    address: res.user.addresses[0].address1,
                    city: res.user.addresses[0].city,
                    country: res.user.addresses[0].countryCode,
                    state: res.user.addresses[0].stateCode,
                    number: res.user.addresses[0].suite,
                    cap: res.user.addresses[0].postalCode,
                }
            }
        });
        if(res.list && res.list.data){
            this.setState({
                wish: 
                    res.list.data.map(item => {
                    if(item.type === "wish_list"){
                        if(item.customerProductListItems){
                            let tempProducts=this.state.products;
                            item.customerProductListItems.map((wish) => {
                                tempProducts.map(product => {
                                    product.compatibility.map((comp,index) => {
                                        if(comp.id === wish.productId){
                                            product.inCartStatus[index].inWish=true;
                                            this.setState({wishlist: [...this.state.wishlist,{
                                                    product: product,
                                                    variation: index
                                                }]
                                            })
                                        }
                                        return null;
                                    })
                                    return null;
                                })
                                return null;
                            })
                        }
                    return item.id;
                    }   
                    return null;
                })[0]
            })
        }
    }//setUser

    render() {
        return (
            <ProductContext.Provider value={{...this.state,getProduct: this.getProduct,handleChanges: this.handleChanges,
                resetChanges:this.resetChanges,sort:this.sort, addToCart:this.addToCart, increment:this.increment,decrement:this.decrement,
                removeItem:this.removeItem,clearCart:this.clearCart,buyItems: this.buyItems,setLimit: this.setLimit,login: this.login,logout: this.logout, signin: this.signin,
                addToWishlist: this.addToWishlist, removeFromWishlist:this.removeFromWishlist}
            }>
                {this.props.children}
            </ProductContext.Provider>
        );
    }//render
}//ProductProvider

const ProductConsumer = ProductContext.Consumer;

export function withProductConsumer(Component){
    return function ConsumerWrapper(props){
        return(
            <ProductConsumer>
                {value => <Component {...props} context={value}/>}
            </ProductConsumer>
        )}
}//withProductConsumer

export{ProductProvider,ProductConsumer,ProductContext}
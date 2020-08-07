import React, { Component } from 'react';

const ProductContext= React.createContext();

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
            type: "all",
            compatibility: "all",
            brand: "all",
            price: 0,
            minPrice: 0,
            maxPrice: 0,
        };
    }

    async componentDidMount(){
        /*categories*/
        await this.getCategories()
        .then(res => this.setState({categories: res}))
        .then(res => {
            this.setState({categories: this.clean(this.state.categories)});
            console.log(this.state.categories)
        })
        /*products*/
        .then(res => {
            let temp=this.state.categories;
            temp.map((item,index) => {
                this.getProducts(item.id)
                .then(res => this.setState({products: this.state.products.concat(res)}))
                .then(res => {
                    if(index===temp.length-1){
                        let products=this.state.products;
                        console.log(products)
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
                                this.addTotals();
                                this.setState({cart:res});
                            }
                        })
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
        return fetch("http://localhost:9000/categoriesAPI")
        .then(res => res.json())
        .then(categories => {
            let tempCat = categories["data"].map(item => {
                let id=item.id;
                let name=item.id;
                let category={id,name};
                if(category.id!=="root")
                    return category;
            })
            return tempCat;
        })
    }//getCategories

    //getProducts
    getProducts = (category) => {
        return fetch(`http://localhost:9000/categoryProductsAPI?id=${category}`)
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
                        inCartStatus[index]={qty:0,inCart:false,total:0}
                    })
                    let product={id,type,name,price,element,brand,images,inStock,extra,desc,compatibility,inCartStatus};
                    return product;
                }
            })
            return this.clean(tempProd);
        })
    }//getProducts

    getCart = () => {
        return fetch("http://localhost:9000/getBasketAPI")
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
                    let element,variationId,variation,images;
                    tempProducts.map(product => {
                        product.compatibility.map((comp,index) => {
                            if(comp.id === res.productId){
                                element=product.element;
                                variationId=index;
                                variation=comp.value;
                                images=product.images;
                                product.inCartStatus[index].qty=1;
                                product.inCartStatus[index].inCart=true;
                                product.inCartStatus[index].total=total;
                            }
                        })
                    })
                    cartProduct={element,variationId,variation,price,qty,name,total,images};
                    return cartProduct;
                })
                return tempCart;
            }else
                return arr;
        })
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
        this.setState({sortedProducts:products})
    }//resetChanges

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
        fetch(`http://localhost:9000/addItemToBasketAPI?item=${product.compatibility[variation].id}`);
        product.inCartStatus[variation].inCart=true;
        product.inCartStatus[variation].qty=1;
        product.inCartStatus[variation].total=product.price;
        let cartProduct={element: product.element,variation: product.compatibility[variation].value,variationId: variation,name: product.name, price:product.price,
            qty: product.inCartStatus[variation].qty,total: product.inCartStatus[variation].total,images: product.images}
        this.setState(() => {
            return{products: tempProducts, cart: [...this.state.cart,cartProduct]}
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
            })
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
                })
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

    render() {
        return (
            <ProductContext.Provider value={{...this.state,getProduct: this.getProduct,handleChanges: this.handleChanges,
                resetChanges:this.resetChanges,sort:this.sort, addToCart:this.addToCart, increment:this.increment,decrement:this.decrement,
            removeItem:this.removeItem,clearCart:this.clearCart,getDetails: this.getDetails}}>
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
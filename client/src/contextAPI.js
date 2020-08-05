import React, { Component } from 'react';

const ProductContext= React.createContext();

export default class ProductProvider extends Component {

    state={
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

    setUp = async() => {
        try{
            let products=await this.getProducts();
            setTimeout(await this.getCart(),5000);
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
        }catch(error){
            console.log(error);
        }//try_catch
    }//setUp

    //getDetails
    getDetails = async(id) => {
        let res = await fetch(`http://localhost:9000/detailsAPI?id=${id}`)
        .then(res => res.json())
    }

    //getProducts
    getProducts = async() => {
        let products = await fetch("http://localhost:9000/searchAPI?param=shoes")
        .then(res => res.json())
        let tempProd = await products["hits"].map((item) => {
            let element=item.productId;
            let id=element;
            let name=item.productName;
            let brand="test";
            let compatibility=["test"];
            let type="shoes";
            let price=item.price;
            let extras=[]
            let inCart=false;
            let qty=0;
            let total=0;
            let images=[item.image.link,item.image.link,item.image.link];
            let product={id,element,name,price,brand,compatibility,type,images,extras,inCart,qty,total};
            return product;
        })
        return tempProd;
    }

    //getCart
    getCart = async() => {
        let res = await fetch("http://localhost:9000/getBasketAPI");
        let tempCart = await res.json();
        if(tempCart["productItems"])
            tempCart["productItems"].map(item => {
                let tempProducts=[...this.state.products];
                const index=tempProducts.indexOf(this.getProduct(item.productId));
                const product=tempProducts[index];
                product.inCart=true;
                product.qty=item.quantity;
                product.total=product.price*product.qty;
                this.setState(() => {
                    return{products: tempProducts, cart: [...this.state.cart,product]}
                },
                () => {
                    this.addTotals();
                })
                    })
    }

    //getCategories
    getCategories = async() => {
        let res = await fetch("http://localhost:9000/categoriesAPI");
        let categories = await res.json();
        let tempCat = await categories["data"].map(item => {
            let id=item.id;
            let name=item.name.default;
            let category={id,name};
            return category;
        })
        return tempCat;
    }//getCategories

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
    addToCart = async(id) => {
        await fetch(`http://localhost:9000/addItemToBasketAPI?item=${id}`)
        .then(res => res.json())
        .catch(err => err);
        let tempProducts=[...this.state.products];
        const index=tempProducts.indexOf(this.getProduct(id));
        const product=tempProducts[index];
        product.inCart=true;
        product.qty=1;
        product.total=product.price;
        this.setState(() => {
            return{products: tempProducts, cart: [...this.state.cart,product]}
        },
        () => {
            this.addTotals();
        })
    }

    //increment
    increment = async(id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.element === id);
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
    decrement = async(id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.element === id);
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
        let cart = [...this.state.cart];
        localStorage.setItem("cart",cart);
    }

    //removeItem
    removeItem = async(id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.element !== id);
        const index = tempProducts.indexOf(this.getProduct(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart=false;
        removedProduct.qty=0;
        removedProduct.total=0;
        this.setState(() => {
            return {
                cart:[...tempCart],
                products:[...tempProducts]
            }
        },() => {
            this.addTotals();
        })
        let cart = [...this.state.cart];
        localStorage.setItem("cart",cart);
    }

    //restore
    restoreValues = () => {
        let prods=[...this.state.products];
        prods.map(item => {
            item.qty=0;
            item.total=0;
            item.inCart=false;
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
        this.state.cart.map(item => (cartTotal += item.total));
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
        if(compatibility!=='all')
            tempProducts=tempProducts.filter(product => product.compatibility.includes(compatibility))

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
    
    componentDidMount(){
        this.setUp()
    }

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
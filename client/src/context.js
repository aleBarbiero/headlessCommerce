import React, { Component } from 'react';
import Client from './dataAPI';

const ProductContext= React.createContext();

export default class ProductProvider extends Component {

    state={
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

    //getData
    getData = async() =>{
        try{
            let response = await Client.getEntries({
                content_type: "photoStudio",
                order: "fields.price"
            });
            let products=this.formatData(response.items);
            let tempSorted=products.sort((a, b) => (a.price > b.price) ? 1 : -1);
            let onesToWatch=[tempSorted[0], tempSorted[1], tempSorted[2]];
            let minPrice=Math.min(...products.map(item => item.price));
            let maxPrice=Math.max(...products.map(item => item.price));
            let maxSize=Math.max(...products.map(item => item.size));
            let price=maxPrice;
            
            this.setState({
                products,
                sortedProducts:products,
                onesToWatch,
                loading:false,
                maxPrice,
                minPrice,
                maxSize,
                price
            });
        }catch(error){
            console.log(error);
        }//try_catch
    }//getData

    componentDidMount(){
        this.getData();
    }//componentDidMount

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

    formatData(items){
        let tempItems=items.map(item =>{
            let id=item.sys.id
            let images=item.fields.images.map(image => image.fields.file.url);
            let inCart=false;
            let qty=0;
            let total=0;
            let product={...item.fields,images,id,inCart,qty,total};
            return product;
        });
        return tempItems;
    }//formatData

    getProduct = (element) => {
        let tempProduct=[...this.state.products];
        const product=tempProduct.find(product => product.element === element);
        return product;
    }//getProduct

    resetChanges = event => {
        let{
            products
        } = this.state;
        this.setState({sortedProducts:products})
    }//resetChanges

    handleChanges = event => {
        const target=event.target;
        const value=target.type === 'checkbox' ? target.checked : target.value;
        const name=event.target.name;
        this.setState({[name]:value},this.filterProducts)
    }//handleChanges

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

    addToCart = id => {
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
        let cart = [...this.state.cart];
        localStorage.setItem("cart",cart);
    }//addToCart

    increment = id => {
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
        let cart = [...this.state.cart];
        localStorage.setItem("cart",cart);
    }

    decrement = id => {
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
        let cart = [...this.state.cart];
        localStorage.setItem("cart",cart);
    }

    removeItem = id => {
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

    addTotals = () => {
        let cartTotal=0;
        this.state.cart.map(item => (cartTotal += item.total));
        this.setState(() => {
            return {
                cartTotal: cartTotal
            }
        })
    }

    render() {
        return (
            <ProductContext.Provider value={{...this.state,getProduct: this.getProduct,handleChanges: this.handleChanges,
                resetChanges:this.resetChanges,sort:this.sort, addToCart:this.addToCart, increment:this.increment,decrement:this.decrement,
                removeItem:this.removeItem,clearCart:this.clearCart}}>
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
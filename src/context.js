import React, { Component } from 'react'
import items from './data'

const ProductContext= React.createContext();

export default class ProductProvider extends Component {

    state={
        products:[],
        sortedProducts: [],
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

    componentDidMount(){
        let products=this.formatData(items);
        let tempSorted=products.sort((a, b) => (a.price > b.price) ? 1 : -1)
        let onesToWatch=[tempSorted[0], tempSorted[1], tempSorted[2]];
        let maxPrice=Math.max(...products.map(item => item.price));
        let maxSize=Math.max(...products.map(item => item.size));
        let price=maxPrice;

        this.setState({
            products,
            sortedProducts:products,
            onesToWatch,
            loading:false,
            maxPrice,
            maxSize,
            price
        });
    }

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
    }

    formatData(items){
        let tempItems=items.map(item =>{
            let id=item.sys.id
            let images=item.fields.images.map(image => image.fields.file.url);
            let product={...item.fields,images,id};
            return product;
        });
        return tempItems;
    }

    getProduct = (element) => {
        let tempProduct=[...this.state.products];
        const product=tempProduct.find(product => product.element === element);
        return product;
    }

    resetChanges = event => {
        let{
            products
        } = this.state;
        this.setState({sortedProducts:products})
    }

    handleChanges = event => {
        const target=event.target;
        const value=target.type === 'checkbox' ? target.checked : target.value;
        const name=event.target.name;
        this.setState({[name]:value},this.filterProducts)
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
    }

    render() {
        return (
            <ProductContext.Provider value={{...this.state,getProduct: this.getProduct,handleChanges: this.handleChanges,resetChanges:this.resetChanges,sort:this.sort}}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export function withProductConsumer(Component){
    return function ConsumerWrapper(props){
        return(
            <ProductConsumer>
                {value => <Component {...props} context={value}/>}
            </ProductConsumer>
        )}
}

export{ProductProvider,ProductConsumer,ProductContext}
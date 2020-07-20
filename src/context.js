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
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    };

    //getData

    componentDidMount(){
        let products=this.formatData(items);
        let onesToWatch=products.filter(product => product.featured === true);
        let maxPrice = Math.max(...products.map(item => item.price));
        let maxSize = Math.max(...products.map(item => item.size));

        this.setState({
            products,
            sortedProducts:products,
            onesToWatch,
            loading:false,
            maxPrice,
            maxSize
        });
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
        const product = tempProduct.find(product => product.element === element);
        return product;
    }

    handleChanges = event => {
        const target=event.target;
        const value=event.type === 'checkbox' ? target.checked : target.value;
        const name=event.target.name;
        this.setState({[name]:value},this.filterProducts)
    }

    filterProducts = () => {
        let{
            products,
            type,
            capacity,
            price,
            minSize,
            maxSize,
            breakfast,
            pets
        } = this.state;
        let tempProducts=[...products];

        //capacity
        capacity=parseInt(capacity);
        tempProducts=tempProducts.filter(product => product.capacity >= capacity)

        //type
        if(type!=='all')
            tempProducts=tempProducts.filter(product => product.type === type);
        
        //price
        price=parseInt(price);
        tempProducts=tempProducts.filter(product => product.price <= price);        
        
        this.setState({
            sortedProducts:tempProducts
        })
    }

    render() {
        return (
            <ProductContext.Provider value={{...this.state,getProduct: this.getProduct,handleChanges: this.handleChanges}}>
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
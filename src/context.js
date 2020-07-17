import React, { Component } from 'react'
import items from './data'

const ProductContext= React.createContext();

//<ProductContext.Provider value={'hello'}
export default class ProductProvider extends Component {

    state={
        products:[],
        sortedProducts: [],
        onesToWatch: [],
        loading: true
    };

    //getData

    componentDidMount(){
        let products=this.formatData(items);
        let onesToWatch=products.filter(product => product.featured === true);
        this.setState({
            products,
            sortedProducts:products,
            onesToWatch,
            loading:false
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

    render() {
        return (
            <ProductContext.Provider value={{...this.state}}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export{ProductProvider,ProductConsumer,ProductContext}
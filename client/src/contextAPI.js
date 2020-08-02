import React, { Component } from 'react';

const ProductContext= React.createContext();

export default class ProductProvider extends Component {

    state={
        categories: [],
        products: []
    };

    setUp = async() => {
        let categories=this.getCategories();
    }

    //getCategories
    getCategories = async() => {
        let categories = await fetch("http://localhost:9000/categoriesAPI")
        .then(res => res.json())
        .catch(err => err);
        let tempCat = categories["data"].map(item => {
            let id=item.id;
            let name=item.name.default;
            let category={id,name};
            return category;
        })
        return tempCat;
    }//getCategories

    //getProducts
    getProducts = async() => {
        let products = categories.map(item => {
            let catProducts = await fetch(`http://localhost:9000/categoryProductsAPI?id=${item.id}`)
                                    .then(res => res.json())
                                    .catch(err => err);
            console.log(catProducts);
        })
    }

    componentDidMount(){
        this.setUp();
    }
    render() {
        return (
            <ProductContext.Provider value={{...this.state,getProduct: this.getProduct}}>
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
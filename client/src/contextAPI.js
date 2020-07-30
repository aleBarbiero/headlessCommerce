import React, { Component } from 'react';

const ProductContext= React.createContext();

export default class ProductProvider extends Component {

    state={
        apiToWatch: "",
        apiCat: "",
        toWatch,
        categories,
        products
    };

    //getData
    getData = async() =>{
        await fetch("http://localhost:9000/searchAPI?param=shoes")
        .then(res => res.json())
        .then(res => this.setState({apiToWatch: res}))
        .catch(err => err);
    }//getData

    componentDidMount(){
        this.getData();
    }//componentDidMount

    getProduct = (element) => {
        let tempProduct=[...this.state.products];
        const product=tempProduct.find(product => product.element === element);
        return product;
    }//getProduct

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
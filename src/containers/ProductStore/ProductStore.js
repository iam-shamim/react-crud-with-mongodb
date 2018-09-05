import React, { Component } from 'react';
import ProductForm from '../../components/ProductForm/ProductForm'
class ProductStore extends Component{
    productStore = (event) => {
        event.preventDefault();
        const productTitle = event.target.productTitle.value;
        const productDescription = event.target.productDescription.value;
        console.log(productTitle,productDescription);
    };
    render(){
        return(
            <div>
                <ProductForm onSubmitHandler={this.productStore}/>
            </div>
        );
    }
}
export default ProductStore;
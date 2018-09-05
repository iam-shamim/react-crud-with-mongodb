import React,{Component} from "react";

class ProductForm extends Component{
    render(){
        return(
            <form className="jumbotron" onSubmit={this.props.onSubmitHandler}>
                <div className="form-group">
                    <label htmlFor="productTitle">Product Title</label>
                    <input type="text" className="form-control" name="productTitle" id="productTitle" placeholder="Product Title" />
                </div>
                <div className="form-group">
                    <label htmlFor="productDescription">Product Description</label>
                    <textarea name="productDescription" className="form-control" id="productDescription" cols="30" rows="5"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="productImage">Product Image</label>
                    <input type="file" className="form-control" name="productImage" id="productImage"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}
export default ProductForm;
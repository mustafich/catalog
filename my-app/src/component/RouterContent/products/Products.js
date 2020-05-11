import React from "react"
import ProductItem from "../Product-item/ProductItem";
import {FetchProduct} from "../../../redux/actions/actions";
import {ProductEditId} from "../../../redux/actions/actions";
import {connect} from "react-redux";

import * as firebase from "firebase";
import Loading from "../../loading/loading";


 class Products extends React.Component {

     state={
         product:null
     }
     componentDidMount() {

         firebase.database().ref('product').on('value',(snapshot)=>{
             this.props.FetchProduct(snapshot.val())
         });
     }

     render() {
        return (
            <div className="Products">
                <h2>Продукты</h2>
                {this.props.product.length===0?<Loading/>:  <ProductItem FetchProduct={this.props.FetchProduct} ProductEditId={this.props.ProductEditId} product={this.props.product}/>}

            </div>
        )
    }

}

const mapStateToProps = (state) => {

    return {
        product:state.reducerProduct.product
    };
};

const mapDispatchToProps = dispatch => {
    return {
        FetchProduct: (product) => dispatch(FetchProduct(product)),
        ProductEditId: (productId) => dispatch(ProductEditId(productId)),

    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Products);

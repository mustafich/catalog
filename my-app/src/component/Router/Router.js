import React from 'react'
import {Route, Switch} from "react-router-dom";
import Registration from "../RouterContent/Registration/Registration";
import Login from "../RouterContent/Login/Login";
import HookVerification from "../HookVerification/HookVerification";
import Products from "../RouterContent/products/Products";
import Setting from "../RouterContent/setting/setting";
import ProductsAdd from "../RouterContent/ProductsAdd/ProductsAdd";
import {LoginFetch} from "../../redux/actions/actions";
import {connect} from "react-redux";
import ProductEdit from "../RouterContent/editProduct/editProduct";


const Router = ({LoginFetch,product,productEdit})=>{

    let lastIdProduct = product.map((e)=>{
        return e.productId
    })

    return (
        <>
            <Switch>
            <Route exact path="/registration" render={()=>{
                return <Registration/>
            }} />
            <Route exact path="/login" render={()=>{
                return <Login props={LoginFetch}/>
            }} />
            <Route exact path="/products" render={()=>{
                    return <HookVerification Component={Products} />
            }} />
                <Route path="/productsAdd" render={()=>{
                    return <HookVerification id={lastIdProduct[lastIdProduct.length - 1]} Component={ProductsAdd} />
                }} />
                <Route path="/setting" render={()=>{
                    return <HookVerification Component={Setting} />
                }} />
                <Route path="/editProduct" render={()=>{
                    return <HookVerification Component={ProductEdit} funcRedux={productEdit} />
                }} />
            </Switch>
        </>
    )
}

const mapStateToProps = (state) => {

    return {
        unification:state.reducerUser.unification,
        product:state.reducerProduct.product,
        productEdit:state.reducerProduct.productEdit,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        LoginFetch: (email) => dispatch(LoginFetch(email))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Router);


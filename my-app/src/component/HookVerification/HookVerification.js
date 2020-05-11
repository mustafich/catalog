import React from "react";
import {connect} from "react-redux";
import ErrorVerification from "../RouterContent/ErrorVerification/ErrorVerification";
import {LoginFetch} from "../../redux/actions/actions"

const HookVerification = ({Component,unification,LoginFetch,id,funcRedux})=>{

    return (
        <>
            {unification?<Component props={LoginFetch} funcRedux={funcRedux}  id={id}/>:<ErrorVerification/>}
        </>
    )
}
const mapStateToProps = (state) => {

    return {
        unification:state.reducerUser.unification

    };
};
const mapDispatchToProps = dispatch => {
    return {
        LoginFetch: (email) => dispatch(LoginFetch(email))
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(HookVerification);

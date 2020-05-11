import React from "react"
import "./css/index.css"
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import {SignOut} from "../../redux/actions/actions"
const TopMenu = ({unification,userEmail,SignOut}) => {

    const View=()=>{
            return (
                <div className="topMenu">
                    <div className="container">
                        <div className="topMenu-block">
                            <div className="topMenu-block_logo">
                                <h1>Cleveroad</h1>
                            </div>
                            <div className="topMenu-block_menu">
                                {unification?<div className="userTopInfo">
                                    <h2>{userEmail}</h2>
                                    <div onClick={()=>SignOut()} className="userTopInfo-close"><i className="fa fa-times"
                                                                          aria-hidden="true"></i></div>

                                </div>:<>
                                    <Route render={({history}) => (
                                        <div  onClick={() => {
                                            history.push(`/login`)}}>
                                            <p>Войти</p>
                                        </div>
                                    )}/>
                                    <Route render={({history}) => (
                                        <div  onClick={() => {
                                            history.push(`/registration`)}}>
                                            <p>Регистрация</p>
                                        </div>
                                    )}/>
                                </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
    return (
        <>
            <View/>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        userEmail:state.reducerUser.userEmail,
        unification:state.reducerUser.unification

    };
};
const mapDispatchToProps = dispatch => {
    return {
        SignOut: () => dispatch(SignOut())
    };
};



export default connect(mapStateToProps,mapDispatchToProps)(TopMenu);


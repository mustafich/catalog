import React, { useCallback} from "react";
import { withRouter } from "react-router";
import app from "./../../../base.js";




const Login = ({ history,props}) => {
    debugger
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                props(email.value)

                history.push("/products");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    return (
        <>
            <h2>Вход</h2>
            <div className="form">
                <form onSubmit={handleLogin}>
                    <div className="form-block">
                        <div className="form-block_box">
                            <div className="form-block_box__text">
                                <p>E-Mail:</p>
                                <div className="form-block_box__input">
                                    <div className="form-block_box__input___img">
                                        <i className="fa fa-user" aria-hidden="true"></i>
                                    </div>
                                    <input name="email" type="email" placeholder="Email" />
                                </div>
                            </div>
                        </div>
                        <div className="form-block_box">
                            <div className="form-block_box__text">
                                <p>Пороль:</p>
                                <div className="form-block_box__input">
                                    <div className="form-block_box__input___img">
                                        <i className="fa fa-lock" aria-hidden="true"></i>
                                    </div>
                                    <input name="password" type="password" placeholder="Password" />
                                </div>
                            </div>
                        </div>
                        <button type="submit">Войти</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default withRouter(Login);

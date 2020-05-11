import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./../../../base";
import "./css/index.css"
const Registration = ({ history }) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;

        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history]);

    return (
        <>
            <h2>Регистриция</h2>
            <div className="form">
                <form onSubmit={handleSignUp}>
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
                        <button type="submit">Зарегистрировать</button>
                    </div>
                </form>
            </div>
        </>

    );
};

export default withRouter(Registration);

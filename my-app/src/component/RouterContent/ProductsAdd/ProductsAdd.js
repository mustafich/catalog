import React from "react"
import DataaPicker from "../DatePicker/DatePicker";
import * as firebase from "firebase";
import {withRouter} from "react-router";
import MyUploader from "../uploader/uploader";

class ProductsAdd extends React.Component {
    state = {
        form: {
            name: "",
            descriptions: "",
            cost: "",
            discount: "",
            photo: "",
            date: "",
        },
        formValidate: {
            name: "suspense",
            descriptions: "suspense",
            cost: "suspense",
            discount: "ok",
            photo: "suspense",
            date: "ok",
        },
        globalverification: true,
        onBlur: "name",
        errorEmail: {
            name: null,
            message: null,
        },
        errorPassword: {
            name: null,
            message: null,
        }
    }


    getDate = (date) => {

        this.setState({
            form: {
                ...this.state.form,
                date: date
            }
        })

    }
    getImg = (photo) => {
        this.setState({
            form: {
                ...this.state.form,
                photo: photo
            }
        })
        if (photo.length < 9) {
            this.setState({
                formValidate: {
                    ...this.state.formValidate,
                    "photo": "error"
                }
            });
        } else {
            this.setState({

                formValidate: {
                    ...this.state.formValidate,
                    "photo": "ok"
                }
            });
        }
    }
    handleChange = () => (event) => {
        let reCost = /^(\d{1,8}(\.\d{1,2})?)$/;
        let reDiscount = /^(\d{1,8}(\.\d{1,2})?)$/;
        switch (event.target.id) {
            case 'name':
                this.setState({
                    form: {
                        ...this.state.form,
                        [event.target.id]: event.target.value
                    }
                });
                if (event.target.value.length <= 20 || event.target.value.length >= 60) {
                    this.setState({
                        formValidate: {
                            ...this.state.formValidate,
                            [event.target.id]: "error"
                        }
                    });
                } else {
                    this.setState({

                        formValidate: {
                            ...this.state.formValidate,
                            [event.target.id]: "ok"
                        }
                    });
                }
                break
            case 'descriptions':
                this.setState({
                    form: {
                        ...this.state.form,
                        descriptions: event.target.value
                    }
                })
                if (event.target.value.length > 200) {
                    this.setState({
                        formValidate: {
                            ...this.state.formValidate,
                            [event.target.id]: "error"
                        }
                    });
                } else {
                    this.setState({
                        formValidate: {
                            ...this.state.formValidate,
                            [event.target.id]: "ok"
                        }
                    });
                }
                break

            case 'cost':
                this.setState({
                    form: {
                        ...this.state.form,
                        cost: event.target.value
                    }
                })

                if (reCost.test(event.target.value) === false) {
                    this.setState({
                        formValidate: {
                            ...this.state.formValidate,
                            [event.target.id]: "error"
                        }
                    });
                } else {
                    this.setState({

                        formValidate: {
                            ...this.state.formValidate,
                            [event.target.id]: "ok"
                        }
                    });
                }
                break
            case 'discount':
                this.setState({
                    form: {
                        ...this.state.form,
                        discount: event.target.value
                    }
                })
                if (event.target.value < 9 || event.target.value > 91 || reCost.test(event.target.value) === false) {
                    this.setState({
                        formValidate: {
                            ...this.state.formValidate,
                            [event.target.id]: "error"
                        }
                    });
                } else {
                    this.setState({

                        formValidate: {
                            ...this.state.formValidate,
                            [event.target.id]: "ok"
                        }
                    });
                }
                break
            case 'photo':
                this.setState({
                    form: {
                        ...this.state.form,
                        photo: event.target.value
                    }
                })
                if (event.target.value < 9) {
                    this.setState({
                        formValidate: {
                            ...this.state.formValidate,
                            [event.target.id]: "error"
                        }
                    });
                } else {
                    this.setState({

                        formValidate: {
                            ...this.state.formValidate,
                            [event.target.id]: "ok"
                        }
                    });
                }
                break
        }

    }

    async buttonSend() {

        let lastId = this.props.id + 1
        let arrArguments = []
        for (var key in this.state.formValidate) {
            arrArguments.push(this.state.formValidate[key])
        }

        if (arrArguments.every((e) => {
            return e === "ok"
        }) === true) {

            function writeAddData(state, url) {

                firebase.database().ref('product/' + lastId).set({
                    productId: lastId,
                    descriptions: state.form.descriptions,
                    name: state.form.name,
                    photo: state.form.photo,
                    price: state.form.cost,
                    discount: state.form.discount,
                    date: state.form.date,
                }).then(function () {
                    url.push("/products");
                })
                    .catch(function (error) {

                    });
            }

            writeAddData(this.state, this.props.history)
            this.setState({
                ...this.state,
                globalverification: true
            })


        } else {
            this.setState({
                ...this.state,
                globalverification: false
            })
        }
    }

    renderValue(type) {
        if (this.state.formValidate[type] === "suspense") {
            return (
                <div className="form-block_box__input">
                    <div className="form-block_box__input___img">
                        <i className="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <input
                        autoFocus
                        id={type}
                        name={type}
                        value={this.state.form[type]}
                        onChange={this.handleChange()}
                    />
                </div>
            )
        } else if (this.state.formValidate[type] === "error") {
            return (
                <div className="form-block_box__input verificationNo">
                    <div className="form-block_box__input___img">
                        <i className="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <input
                        autoFocus
                        className="verificationNo"
                        id={type}
                        name={type}
                        value={this.state.form[type]}
                        onChange={this.handleChange()}
                    />

                    <div className="form-block_box__input___verification">
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </div>

                </div>

            )

        } else if (this.state.formValidate[type] === "ok") {

            return (
                <>
                    <div className="form-block_box__input verificationOk">
                        <div className="form-block_box__input___img ">
                            <i className="fa fa-user" aria-hidden="true"></i>
                        </div>
                        <input
                            autoFocus
                            className={"verificationOk"}
                            id={type}
                            name={type}
                            value={this.state.form[type]}
                            onChange={this.handleChange()}
                        />
                        <div className="form-block_box__input___verification">
                            <i className="fa fa-check" aria-hidden="true"></i>
                        </div>
                    </div>

                </>
            )
        }
    }


    render() {
        return (
            <>
                <h2>Добавление товара</h2>
                <div className="form">
                    <form>
                        <div className="form-block">
                            <div className="form-block_box">
                                <div className="form-block_box__text">
                                    <p>Название товара</p>
                                </div>
                                {this.renderValue("name")}
                            </div>
                            <div className="form-block_box">
                                <div className="form-block_box__text">
                                    <p>Описание товара</p>
                                </div>
                                {this.renderValue("descriptions")}
                            </div>
                            <div className="form-block_box">
                                <div className="form-block_box__text">
                                    <p>Фотография</p>
                                </div>
                                {/*{this.renderValue("photo")}*/}
                                <MyUploader getImg={this.getImg}/>
                                {/*<input*/}
                                {/*    autoFocus*/}
                                {/*    id="photo"*/}
                                {/*    name="photo"*/}
                                {/*    type="file"*/}
                                {/*    onChange={this.handleChange("photo")}*/}
                                {/*/>*/}
                                {/*{this.renderValue("file")}*/}
                            </div>
                            <div className="form-block_box">
                                <div className="form-block_box__text">
                                    <p>Цена</p>
                                </div>
                                {this.renderValue("cost")}
                            </div>
                            <div className="form-block_box">
                                <div className="form-block_box__text">
                                    <p>Скидка</p>
                                </div>
                                {this.renderValue("discount")}
                            </div>

                            <div className="form-block_box">
                                <div className="form-block_box__text">
                                    <p>Дата окончания скидки</p>
                                    <DataaPicker getDate={this.getDate}/>
                                </div>
                            </div>
                            <div className="button_addEdit" onClick={() => this.buttonSend()}>Добавить товар</div>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}


export default withRouter(ProductsAdd);
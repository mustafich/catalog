import React from "react"
import DataaPicker from "../DatePicker/DatePicker";
import { withRouter } from "react-router";
import * as firebase from "firebase";



class ProductEdit extends React.Component {
    state = {
        form: {
            name: "",
            descriptions: "",
            cost: "",
            discount: "",
            photo: "",
            date: "",
            id: "",

        },
        formValidate: {
            name: "ok",
            descriptions: "ok",
            cost: "ok",
            discount: "ok",
            photo: "ok",
            date: "ok",
            id: "ok",
        },
        globalverification: true,
        onBlur: "name",
        errorEmail:{
            name:null,
            message:null,
        },
        errorPassword:{
            name:null,
            message:null,
        }
    }


componentDidMount() {
        debugger
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                id:this.props.funcRedux.productId,
                name:this.props.funcRedux.name,
                descriptions:this.props.funcRedux.descriptions,
                cost:this.props.funcRedux.price,
                discount:this.props.funcRedux.discount,
                photo:this.props.funcRedux.photo,
                date:this.props.funcRedux.date,
            }
        })

}
    componentWillReceiveProps(nextProps){
        debugger
    }
    getDate = (date)=> {

        this.setState({
            form: {
                ...this.state.form,
                date: date
            }
        })

    }
    getImg = (img)=> {

        this.setState({
            form: {
                ...this.state.form,
                img: img
            }
        })
    }
    handleChange = () => (event) => {
        let reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let reCost = /^(\d{1,8}(\.\d{1,2})?)$/;

        debugger
        switch (event.target.id) {
            case 'name':
                this.setState({
                    form: {
                        ...this.state.form,
                        [event.target.id]: event.target.value
                    }
                });
                debugger
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
                    if(event.target.value==="") {
                        this.setState({
                            formValidate: {
                                ...this.state.formValidate,
                                [event.target.id]: "ok"
                            }
                        });
                    }
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
                if (event.target.value < 9||event.target.value > 91) {
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
        debugger
        let lastId =this.state.form.id+1
        let id =this.state.form.id
        let arrArguments = []
        for (var key in this.state.formValidate) {
            arrArguments.push(this.state.formValidate[key])
        }
        if (arrArguments.every((e) => {return e === "ok"}) === true) {

            function writeAddData(state,id,urlPush) {
                debugger
                let url = `product/${id}`
                firebase.database().ref(url).set({
                    productId:id,
                    descriptions: state.form.descriptions,
                    name: state.form.name,
                    photo: state.form.photo,
                    price :state.form.cost,
                    discount :state.form.discount,
                    date : state.form.date,
                }).then(function() {
                    urlPush.push("/products");
                })
                    .catch(function(error) {

                    });
            }
            writeAddData(this.state,id,this.props.history)


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
                <h2>Редактировать товар</h2>
                <div className="form">
                    <form>
                        <div className="form-block">
                            <div className="form-block_box">
                                <div className="form-block_box__text">
                                    <p>Название товара;</p>
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
                                {this.renderValue("photo")}
                                {/*<MyUploader getImg={this.getImg} />*/}
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
                                    <DataaPicker editTime={this.state.form.date} getDate={this.getDate}/>
                                </div>
                            </div>
                            <div  className="button_addEdit" onClick={() => this.buttonSend()}>Обновить</div>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}


export default withRouter(ProductEdit);
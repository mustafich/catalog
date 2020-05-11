import React from "react"
import Timer from "../../Timer/Timer";
import "./css/index.css"
import {Route} from "react-router-dom";
import * as firebase from "firebase";
const ProductItem = ({product, ProductEditId, FetchProduct}) => {
    const View = product.map(e => {
        let timeNow = new Date().toLocaleDateString("ru-RU")
        let timeDicount = e.date
        const reverse = customDate => Date.parse(customDate.split('.').reverse().join('.'))
        const date1 = reverse(timeNow)
        const date2 = reverse(timeDicount)
        let dayDic = Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24))
        if (e.date === "" || e.discount === "") {
            dayDic = 0
        }
        return (
            <div key={e.productId} className="ProductItem-block_box">
                <div className="ProductItem-block_box__butt">
                    <Route render={({history}) => (
                        <div className="ProductItem-block_box__butt___edit" onClick={() => {
                            ProductEditId(e.productId)
                            history.push(`/editProduct`)
                        }}>
                            <i className="fa fa-pencil-square-o"
                               aria-hidden="true"></i>
                        </div>
                    )}/>
                    <div onClick={() => {
                        function writeAddData(productId) {
                            let url = `product/${productId}`
                            firebase.database().ref(url).remove()
                                .then(function () {
                                    firebase.database().ref('product').on('value', (snapshot) => {
                                        FetchProduct(snapshot.val())
                                    });
                                })
                                .catch(function (error) {

                                });
                        }
                        writeAddData(e.productId)
                    }} className="ProductItem-block_box__butt___delete"><i className="fa fa-trash"
                                                                           aria-hidden="true"></i></div>
                </div>
                <div className="ProductItem-block_box__img">
                    {/*<img src={e.photo} alt=""/>*/}
                    <img src={e.photo} alt=""/>

                </div>
                <div className="ProductItem-block_box__name">
                    <p>{e.name}</p>
                </div>
                <div className="ProductItem-block_box__descriptions">
                    <p>{e.descriptions}</p>
                </div>
                <div className="ProductItem-block_box__price">
                    <p className="ProductItem-block_box__price___totalCost">Цена:{(dayDic > 0) ?
                        <s>{e.price}</s> : e.price}</p>
                    <p className="ProductItem-block_box__price___discountPrice">{((dayDic > 0) ? +e.price - (+e.price * +e.discount / 100) : null)}</p>
                </div>
                <div className="ProductItem-block_box__discountDay">
                    {(dayDic > 0) ? <Timer time={dayDic} id={e.productId}/> : null}
                </div>
            </div>
        )
    })
    return (
        <div className="ProductItem">
            <div className="ProductItem-block">
                {View}
                <div className="ProductItem-block_box">
                    <Route render={({history}) => (
                        <div className="ProductItem-block_box__add" onClick={() => {
                            history.push(`/productsAdd`)
                        }}>
                            <p>Добавить товар</p>
                        </div>
                    )}/>
                </div>
            </div>
        </div>

    )
}
export default ProductItem
import React from "react"
import {Link} from "react-router-dom";

import "./css/index.css"
const NavigationMenu = () => {
    return (
            <div className="NavigationMenu">
                <ul>
                        <Link to="/products/">Товары</Link>
                        <Link to="/productsAdd/">Добавить Товар</Link>
                        <Link to="/setting/">НАСТРОЙКИ</Link>
                </ul>
            </div>

    )
}

export default NavigationMenu
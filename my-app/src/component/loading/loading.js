import React from "react"
import loadingSvg from "./Spin-1s-200px.svg"
import "./css/index.css"
const Loading = ()=>{
    return (
        <div className="loading">
            <div className="loading-block">
                <img src={loadingSvg} alt="loading"/>
            </div>

        </div>
    )
}
export default Loading
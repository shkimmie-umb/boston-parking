import React from 'react'
import { BsFillInfoCircleFill } from "react-icons/bs"
// import logo from './logo/favicon.png'

export default function NavBar(props) {
    const {state, setState} = props

    const changeInfoBarState = () =>{
        setState({
            meter: state.meter,
            snow_garage: state.snow_garage,
            street_sweeping: state.street_sweeping,
            leaving_scene: state.leaving_scene,
            vandalism: state.vandalism,
            closeInfoBar: !state.closeInfoBar
        })
    }

    // const logo = require("./logo/favicon.png");

    return (
        <div className="navbar">
        {/* <img src = {logo} alt ="Logo"/> */}
        <h1>Boston Parking</h1>
        <div className="navbar-links">
            <a href = 'https://shkimmie-umb.github.io/CS697_portfolio/' target="_blank" rel="noopener noreferrer"> SangHyuk Portfolio</a>
            <a href = 'https://github.com/shkimmie-umb/boston-parking' target="_blank" rel="noopener noreferrer"> Code</a>
            <a href = 'https://data.boston.gov/dataset/?q=parking' target="_blank" rel="noopener noreferrer"> Data</a>
        </div>

        <div className = 'info-icon'>
           <BsFillInfoCircleFill onClick = {changeInfoBarState} size={25} opacity = '0.5'/>
        </div>

        </div>

    )
}

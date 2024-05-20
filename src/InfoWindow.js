import React, {useState} from "react";
import { FaAngleDoubleDown,  FaAngleDoubleUp, FaWindowClose} from 'react-icons/fa'

export default function InfoWindow(props) {

    const {state, setState} = props

    const [arrow, setArrow] = useState({
        revealInfo: false
    })

    const UpAndDown = () => {
        if(arrow.revealInfo) return 'block'
        else return 'none'
    }

    const closeInfoBar = () => {
        if(state.closeInfoBar) return 'block'
        else return 'none'
    }

    const changeInfoArrowState = () =>{
            setArrow({
            revealInfo: !arrow.revealInfo
        })
    }

    const changeInfoBarState = () =>{
        setState({
            meter: state.meter,
            snow_garage: state.snow_garage,
            street_sweeping: state.street_sweeping,
            leaving_scene: state.leaving_scene,
            vandalism: state.vandalism,
            closeInfoBar: false
        })
    }

  return (
    <div className = "info-window" style = {{display : closeInfoBar()}}>
        <div className = 'info-window-container' style = {{display : UpAndDown()}}>
            <p>
                Welcome!
                <br></br>
                <br></br>
                Use this map to find your safe parking spots!
                <br></br>
                Hours and locations on this map are subject to change.
            </p>
        </div>
        <div className = "info-navbar-container" onClick = {changeInfoArrowState}>
            <div className="info-navbar">
                <h4>Find Boston Parking Information</h4>
                <div>
                    {arrow.revealInfo ? <FaAngleDoubleDown/> : <FaAngleDoubleUp/>}
                </div>

                <div className = "info-window-close-bttn" onClick = {changeInfoBarState}>
                    <FaWindowClose opacity = "0.5"/>
                </div>
            </div>
        </div>
    </div>
  );
}
import React from 'react'
import {Marker} from 'react-map-gl'
// import groceryIcon from './images/grocery.svg'
// import greenIcon from './images/green.svg'
// import soupIcon from './images/soup.svg'
// import grabIcon from './images/grab.svg'
// import foodPantryIcon from './images/foodpantry.svg'
import meterIcon from './images/parkingmeter.svg'

export default function ParkingCard(props){
    const {spot, setSelectedSpot, getCord, state} = props

    const getIcon = (type) => {
        let icon;
        // if(type === "Grocery") icon = groceryIcon
        // if(type === "GrabAndGo") icon = grabIcon
        // if(type === "Greenmarket") icon = greenIcon
        // if(type === "SoupKitchen") icon = soupIcon
        // if(type === "FoodPantry") icon = foodPantryIcon
        if(type === "meter") icon = meterIcon
        return icon
    }

    const hideOrShow = (type, cost, status) => {
        status = JSON.parse(status)
        if(state.status && !status) return 'none'
        if(!state[type]) return "none"
        if(cost === 'FREE' && !state.free) return 'none'
        if(cost === '$' && !state.$) return 'none'
        if(cost === '$$' && !state.$$) return 'none'
        if(cost === '$$$' && !state.$$$) return 'none'
        else return "block"
    }
    return(
        <Marker
            latitude = {spot.LATITUDE} 
            longitude = {spot.LONGITUDE}>
            <button 
              // style = {{display: hideOrShow(spot.type, spot.cost, spot.status)}}
              className = "marker-btn" onClick = {e => {
                e.preventDefault()
                setSelectedSpot(spot)
              }}>
              <img src = {getIcon(spot.TYPE)} alt ="Parking Icon"/>
            </button>
          </Marker>
    )
}
import React from 'react'
import {Marker} from 'react-map-gl'
// import groceryIcon from './images/grocery.svg'
// import greenIcon from './images/green.svg'
// import soupIcon from './images/soup.svg'
// import grabIcon from './images/grab.svg'
// import foodPantryIcon from './images/foodpantry.svg'
import meterIcon from './images/parkingmeter.svg'

export default function ParkingMarkerCard(props){
    const {spot, setSelectedSpot, state} = props

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

    const hideOrShow = (type) => {
        if(type === 'meter' && !state.meter) return 'none'
        if(type === 'snow_garage' && !state.snow_garage) return 'none'
        if(type === 'street_sweeping' && !state.street_sweeping) return 'none'
        if(type === 'leaving_scene' && !state.leaving_scene) return 'none'
        if(type === 'vandalism' && !state.vandalism) return 'none'
        else return "block"
    }
    return(
        <Marker
            latitude = {spot.LATITUDE} 
            longitude = {spot.LONGITUDE}>
            <button 
              style = {{display: hideOrShow(spot.TYPE)}}
              className = "marker-btn" onClick = {e => {
                e.preventDefault()
                setSelectedSpot(spot)
              }}>
              <img src = {getIcon(spot.TYPE)} alt ="Parking Icon"/>
            </button>
          </Marker>
    )
}
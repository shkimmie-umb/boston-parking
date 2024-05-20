import React from 'react'
import {Marker} from 'react-map-gl'
// import groceryIcon from './images/grocery.svg'
// import greenIcon from './images/green.svg'
// import soupIcon from './images/soup.svg'
// import grabIcon from './images/grab.svg'
// import foodPantryIcon from './images/foodpantry.svg'
import meterIcon from './images/parkingmeter.svg'
import snowGarageIcon from './images/snowgarage.svg'
import hitandrunIcon from './images/leavingscene.svg'
import vandalismIcon from './images/vandalism.svg'

export default function GarageMarkerCard(props){
    const {garage, setSelectedGarage, state} = props

    const getIcon = (type) => {
        let icon;
        // if(type === "Grocery") icon = groceryIcon
        // if(type === "GrabAndGo") icon = grabIcon
        // if(type === "Greenmarket") icon = greenIcon
        // if(type === "SoupKitchen") icon = soupIcon
        // if(type === "FoodPantry") icon = foodPantryIcon
        if(type === "meter") icon = meterIcon
        if(type === "snow_garage") icon = snowGarageIcon
        if(type === "leaving_scene") icon = hitandrunIcon
        if(type === "vandalism") icon = vandalismIcon
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
            latitude = {garage.latitude} 
            longitude = {garage.longitude}>
            <button 
              style = {{display: hideOrShow(garage.TYPE)}}
              className = "marker-btn" onClick = {e => {
                // e.preventDefault()
                setSelectedGarage(garage)
              }}>
              <img src = {getIcon(garage.TYPE)} alt ="Parking Icon"/>
            </button>
          </Marker>
    )
}
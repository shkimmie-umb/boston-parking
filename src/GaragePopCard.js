import React from 'react'
import {Popup} from 'react-map-gl'

export default function GaragePopCard(props){
    const {selectedGarage, setSelectedGarage} = props
    const gmapaddress = `https://www.google.com/maps/search/?api=1&query=${selectedGarage.latitude},${selectedGarage.longitude}`
    return(
        <Popup
            latitude = {selectedGarage.latitude}
            longitude = {selectedGarage.longitude}
            closeOnClick={false}
            onClose = {()=> setSelectedGarage(null)}
            >
            <div className = "pop-container">
            <div className = 'pop-header'>{selectedGarage.Name}</div>
              <br></br>
            <div className = 'pop-spaces'>{selectedGarage.Spaces + " spaces available"}</div>
              <br></br>
            <div className = 'pop-description'>{"Comments: " + selectedGarage.Comments}</div>
              <br></br>
            <div className = 'pop-phone'>{"Phone: " + selectedGarage.Phone}</div>
              <br></br>
            <div className = 'pop-address'>Location: <br></br> <a href = {`${gmapaddress}`} target="_blank"rel="noopener noreferrer" >{selectedGarage.Address}, Boston, MA</a></div>
              <br></br>
            <div className = 'pop-cost'>Cost: {selectedGarage.Fee}</div>
            </div>
          </Popup>
    )
}
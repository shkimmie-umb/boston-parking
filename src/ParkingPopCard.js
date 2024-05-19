import React from 'react'
import {Popup} from 'react-map-gl'

export default function ParkingPopCard(props){
    const {selectedSpot, setSelectedSpot} = props
    const gmapaddress = `https://www.google.com/maps/search/?api=1&query=${selectedSpot.LATITUDE},${selectedSpot.LONGITUDE}`
    return(
        <Popup
            latitude = {selectedSpot.LATITUDE}
            longitude = {selectedSpot.LONGITUDE}
            closeOnClick={false}
            onClose = {()=> setSelectedSpot(null)}
            >
            <div className = "pop-container">
            <div className = 'pop-header'>{selectedSpot.STREET + " meters"}</div>
              <br></br>
            <div className = 'pop-description'>{selectedSpot.COUNTS + " meters available"}</div>
              <br></br>
            <div className = 'pop-parkinghours'>{"Parking Hours: " + selectedSpot.PAY_POLICY}</div>
              <br></br>
            <div className = 'pop-freeparkinghours'>{"Free Parking Hours: " + selectedSpot.PARK_NO_PAY}</div>
              <br></br>
            <div className = 'pop-address'>Location: <br></br> <a href = {`${gmapaddress}`} target="_blank"rel="noopener noreferrer" >{selectedSpot.STREET} Boston, MA</a></div>
              <br></br>
            <div className = 'pop-cost'>Cost: {"$"+selectedSpot.BASE_RATE + " Per 15 mins"}</div>
            </div>
          </Popup>
    )
}
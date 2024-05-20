import React from 'react'
import {Popup} from 'react-map-gl'

export default function HitandrunPopCard(props){
    const {selectedHitandrun, setSelectedHitandrun} = props
    const gmapaddress = `https://www.google.com/maps/search/?api=1&query=${selectedHitandrun.latitude},${selectedHitandrun.longitude}`
    return(
        <Popup
            latitude = {selectedHitandrun.latitude}
            longitude = {selectedHitandrun.longitude}
            closeOnClick={false}
            onClose = {()=> setSelectedHitandrun(null)}
            >
            <div className = "pop-container">
            <div className = 'pop-header'>{"#"+selectedHitandrun.INCIDENT_NUMBER}</div>
              <br></br>
            <div className = 'pop-incident'>{selectedHitandrun.OCCURRED_ON_DATE}</div>
              <br></br>
            <div className = 'pop-description'>{selectedHitandrun.OFFENSE_DESCRIPTION}</div>
              <br></br>
            <div className = 'pop-address'>Location: <br></br> <a href = {`${gmapaddress}`} target="_blank"rel="noopener noreferrer" >{selectedHitandrun.STREET}, Boston, MA</a></div>
              <br></br>
            <div className = 'pop-type'>Incident type: {selectedHitandrun.TYPE}</div>
            </div>
          </Popup>
    )
}
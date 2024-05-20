import React, {useState, useEffect,  useCallback, useRef} from 'react'
import ReactMapGL from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import { useForm } from "react-hook-form";
import foodData from "./food-map-data.json"
import parkingData from "./meter.json"
import garageData from "./snowgarage.json"
import hitandrunData from "./leavingscene.json"
import vandalismData from "./vandalism.json"
import CheckboxMenu from './Checkbox'
import NavBar from './NavBar'
import PopCard from './PopCard'
import ParkingPopCard from './ParkingPopCard'
import GaragePopCard from './GaragePopCard'
import HitandrunPopCard from './HitandrunPopCard'
import MapControls from './MapControls'
import MarkerCard from './MarkerCard'
import ParkingMarkerCard from './ParkingMarkerCard'
import GarageMarkerCard from './GarageMarkerCard'
import HitandrunMarkerCard from './HitandrunMarkerCard'
import InfoWindow from './InfoWindow'

import './App.css';
import 'react-dropdown/style.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'

const App = () => {

  //Setting up viewport and geocoder
  const [viewport, setViewport] = useState({
    // latitude: 40.7128,
    // longitude: -74.0060152,
    latitude: 42.343639,
    longitude: -71.094861,
    zoom: 14,
  });

  const mapRef = useRef();

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );
  
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };
      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    []
  );

  const params = {
    country: "us"
  }

  //Menu Components
  // const [state, setState] = useState({
  //   free: true,
  //   $: true,
  //   $$: true,
  //   $$$: true,
  //   status: false,
  //   Greenmarket: true,
  //   Grocery: true,
  //   GrabAndGo: true,
  //   FoodPantry: true,
  //   SoupKitchen: true,
  //   closeInfoBar: false
  // })
  const [state, setState] = useState({
    meter: true,
    snow_garage: true,
    street_sweeping: true,
    leaving_scene: true,
    vandalism: true
  })


  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     free: true,
  //     $: true,
  //     $$: true,
  //     $$$: true,
  //     status: false,
  //     Greenmarket: true,
  //     Grocery: true,
  //     GrabAndGo: true,
  //     FoodPantry: true,
  //     SoupKitchen: true
  //   }
  // });
  const { register, handleSubmit } = useForm({
    defaultValues: {
      meter: true,
      snow_garage: true,
      street_sweeping: true,
      leaving_scene: true,
      vandalism: true
    }
  });


  // const onSubmit = data => {
  //   setState({
  //     free: data.free,
  //     $: data.$,
  //     $$: data.$$,
  //     $$$: data.$$$,
  //     status: data.status,
  //     Greenmarket: data.Greenmarket,
  //     Grocery: data.Grocery,
  //     GrabAndGo: data.GrabAndGo,
  //     FoodPantry: data.FoodPantry,
  //     SoupKitchen: data.SoupKitchen
  //   })
  // };
  const onSubmit = data => {
    setState({
      meter: data.meter,
      snow_garage: data.snow_garage,
      street_sweeping: data.street_sweeping,
      leaving_scene: data.leaving_scene,
      vandalism: data.vandalism
    })
  };


  //Markers
  const [selectedFood, setSelectedFood] = useState(null)
  const [selectedSpot, setSelectedSpot] = useState(null)
  const [selectedGarage, setSelectedGarage] = useState(null)
  const [selectedHitandrun, setSelectedHitandrun] = useState(null)
  const [selectedVandalism, setSelectedVandalism] = useState(null)
  
  useEffect(() => {
      const listner = (e) => {
        if(e.key === "Escape") setSelectedFood(null)
      }

      window.addEventListener("keydown", listner)

      return () => {
        window.removeEventListener('keydown', listner)
      }
  }, [])

  const getCord = (str) =>{
    return JSON.parse(str)
  }

  return (
    <div className = 'app' style={{ height: "100vh" }}>
      <NavBar state = {state} setState = {setState}/>

      <ReactMapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        mapStyle = "mapbox://styles/mapbox/streets-v12"
        mapboxApiAccessToken="pk.eyJ1Ijoic2hraW1taWUiLCJhIjoiY2x3NzljaXFkMWNlZjJqcGZ6dTcwbTI4biJ9.mrf2iqSuC7WR32PqdQh1eA"
      >

        {/* {foodData.map((food, index) => (
          <MarkerCard 
            key = {index}
            food = {food}
            setSelectedFood = {setSelectedFood}
            getCord = {getCord}
            state = {state}
          />
        ))} */}

        {/* {selectedFood ? (
          <PopCard 
            getCord = {getCord} 
            setSelectedFood ={setSelectedFood} 
            selectedFood = {selectedFood}
          />
        ) : null} */}

        {/* Meter icons */}
        {parkingData.map((spot, index) => (
          <ParkingMarkerCard 
            key = {index}
            spot = {spot}
            setSelectedSpot = {setSelectedSpot}
            state = {state}
          />
        ))}
        {/* Meter popup */}
        {selectedSpot ? (
          <ParkingPopCard 
            setSelectedSpot ={setSelectedSpot} 
            selectedSpot = {selectedSpot}
          />
        ) : null}

        {/* Garage icons */}
        {/* {garageData.map((garage, index) => (
          <GarageMarkerCard 
            key = {index}
            garage = {garage}
            setSelectedGarage = {setSelectedGarage}
            state = {state}
          />
        ))} */}
        {/* Garage popup */}
        {/* {selectedGarage ? (
          <GaragePopCard 
            setSelectedGarage ={setSelectedGarage} 
            selectedGarage = {selectedGarage}
          />
        ) : null} */}

        {/* Hitandrun icons */}
        {hitandrunData.map((hitandrun, index) => (
          <HitandrunMarkerCard 
            key = {index}
            hitandrun = {hitandrun}
            setSelectedHitandrun = {setSelectedHitandrun}
            state = {state}
          />
        ))}
        {/* Hitandrun popup */}
        {selectedHitandrun ? (
          <HitandrunPopCard 
            setSelectedHitandrun ={setSelectedHitandrun} 
            selectedHitandrun = {selectedHitandrun}
          />
        ) : null}

        {/* Vandalism icons */}
        {vandalismData.map((vandalism, index) => (
          <HitandrunMarkerCard 
            key = {index}
            hitandrun = {vandalism}
            setSelectedHitandrun = {setSelectedVandalism}
            state = {state}
          />
        ))}
        {/* Vandalism popup */}
        {selectedVandalism ? (
          <HitandrunPopCard 
            setSelectedHitandrun ={setSelectedVandalism} 
            selectedHitandrun = {selectedVandalism}
          />
        ) : null}


        

        <div className = 'left-side'>
          <MapControls setViewport = {setViewport} 
            handleViewportChange = {handleViewportChange}
            mapRef = {mapRef}
          />

           <CheckboxMenu
          setState = {setState}
          register = {register} 
          handleSubmit = {handleSubmit} 
          onSubmit = {onSubmit}/>
        </div>

        <InfoWindow state = {state} setState = {setState}/>

          <Geocoder
            mapRef={mapRef}
            onViewportChange={handleGeocoderViewportChange}
            mapboxApiAccessToken="pk.eyJ1Ijoic2hraW1taWUiLCJhIjoiY2x3NzljaXFkMWNlZjJqcGZ6dTcwbTI4biJ9.mrf2iqSuC7WR32PqdQh1eA"
            position= "top-right"
            hideOnSelect={true}
            queryParams={params}
          />


      </ReactMapGL>
    </div>
  );
};

export default App

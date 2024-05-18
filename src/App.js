import React, {useState, useEffect,  useCallback, useRef} from 'react'
import ReactMapGL from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import { useForm } from "react-hook-form";
import foodData from "./food-map-data.json"
import parkingData from "./meter.json"
import CheckboxMenu from './Checkbox'
import NavBar from './NavBar'
import PopCard from './PopCard'
import MapControls from './MapControls'
import MarkerCard from './MarkerCard'
import ParkingCard from './ParkingCard'
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
  const [state, setState] = useState({
    free: true,
    $: true,
    $$: true,
    $$$: true,
    status: false,
    Greenmarket: true,
    Grocery: true,
    GrabAndGo: true,
    FoodPantry: true,
    SoupKitchen: true,
    closeInfoBar: false
  })

  const { register, handleSubmit } = useForm({
    defaultValues: {
      free: true,
      $: true,
      $$: true,
      $$$: true,
      status: false,
      Greenmarket: true,
      Grocery: true,
      GrabAndGo: true,
      FoodPantry: true,
      SoupKitchen: true
    }
  });

  const onSubmit = data => {
    setState({
      free: data.free,
      $: data.$,
      $$: data.$$,
      $$$: data.$$$,
      status: data.status,
      Greenmarket: data.Greenmarket,
      Grocery: data.Grocery,
      GrabAndGo: data.GrabAndGo,
      FoodPantry: data.FoodPantry,
      SoupKitchen: data.SoupKitchen
    })
  };

  //Markers
  const [selectedFood, setSelectedFood, selectedSpot, setSelectedSpot] = useState(null)
  
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

        {foodData.map((food, index) => (
          <MarkerCard 
            key = {index}
            food = {food}
            setSelectedFood = {setSelectedFood}
            getCord = {getCord}
            state = {state}
          />
        ))}

        {parkingData.map((spot, index) => (
          <ParkingCard 
            key = {index}
            spot = {spot}
            setSelectedSpot = {setSelectedSpot}
            state = {state}
          />
        ))}


        {selectedFood ? (
          <PopCard 
            getCord = {getCord} 
            setSelectedFood ={setSelectedFood} 
            selectedFood = {selectedFood}
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

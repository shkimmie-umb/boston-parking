import React, {useState} from "react";
// import groceryIcon from './images/grocery.svg'
// import greenIcon from './images/green.svg'
// import soupIcon from './images/soup.svg'
// import grabIcon from './images/grab.svg'
// import foodPantryIcon from './images/foodpantry.svg'
import parkingMeterIcon from './images/parkingmeter.svg'
import snowGarageIcon from './images/snowgarage.svg'
import streetSweepingIcon from './images/streetcleaning.svg'
import hitAndRunIcon from './images/leavingscene.svg'
import vandalismIcon from './images/vandalism.svg'
import { FaAngleDoubleDown,  FaAngleDoubleUp} from 'react-icons/fa'

export default function CheckboxMenu(props) {

    const {register, handleSubmit, onSubmit} = props

    const [state, setState] = useState({
        revealFilter: true,
    })

    const changeMeterState = () =>{
        setState({
            meter: !state.meter,
            revealFilter: state.revealFilter
        })
    }

    const UpAndDown = () => {
        if(state.revealFilter) return 'block'
        else return 'none'
    }

    const changeArrowState = () =>{
        setState({
            revealFilter: !state.revealFilter
        })
    }



  return (
    <div className = "checkbox">
        <div className = "checkbox-navbar-container" onClick = {changeArrowState}>
            <div className="checkbox-navbar">
                <h4>Filter</h4>
                <div onClick = {changeArrowState}>
                    {state.revealFilter ? <FaAngleDoubleUp/> : <FaAngleDoubleDown/>}
                </div>
            </div>
        </div>

        <div className = 'checkbox-input-container' style = {{display : UpAndDown()}}>
        <form onSubmit={handleSubmit(onSubmit)} className ='checkbox-form'>
            <div className = 'check'>
                <input type = 'checkbox' name ='meter' ref={register}/>
                <label className = 'menu'> Meters</label >
                <img src = {parkingMeterIcon} alt ="Parking Meter Icon"/>
            </div>

            <div className = 'check'>
                <input type = 'checkbox' name ='snow_garage' ref={register}/>
                <label className = 'menu'> Garages</label >
                <img src = {snowGarageIcon} alt ="Snow Garage Icon"/>
            </div>

            <div className = 'check'>
                <input type = 'checkbox' name ='street_sweeping' ref={register}/>
                <label className = 'menu'> St. Cleaning</label >
                <img src = {streetSweepingIcon} alt ="Street Sweeping Icon"/>
            </div>

            <div className = 'check'>
                <input type = 'checkbox' name ='leaving_scene' ref={register}/>
                <label className = 'menu'> Hit and Run</label >
                <img src = {hitAndRunIcon} alt ="Hit and Run Icon"/>
            </div>

            <div className = 'check'>
                <input type = 'checkbox' name ='vandalism' ref={register}/>
                <label className = 'menu'> Vandalism</label >
                <img src = {vandalismIcon} alt ="Vandalism Icon"/>
            </div>
            {/* <div className = 'check'>
                <input type = 'checkbox' name ='free' ref={register}/>
                <label className = 'menu'> Free</label >
            </div>

            <div className = 'check'>
                <input type = 'checkbox' name ='$' ref={register}/>
                <label className = 'menu'> $ (Inexpensive)</label>
            </div>

            <div className = 'check'>
                <input type = 'checkbox' name ='$$' ref={register}/>
                <label className = 'menu'> $$ (Moderate) </label>
            </div>

            <div className = 'check'>
                <input type = 'checkbox' name ='$$$' ref={register}/>
                <label className = 'menu'> $$$ (Expensive) </label>
            </div>

            <div className = 'check'>
                <input type = 'checkbox' name ='status' ref={register}/>  
                <label className = 'menu'> In Business</label>
            </div>

            <div className = 'check'>
                <input type = 'checkbox' name ='Greenmarket' ref={register}/>
                <label className = 'menu'> Greenmarket </label>
                <img src = {greenIcon} alt ="Food Icon"/>
            </div>

            <div className = 'check'>
                <input type = 'checkbox' name ='Grocery' ref={register}/>
                <label className = 'menu'>Grocery Store </label>
                <img src = {groceryIcon} alt ="Food Icon"/>
            </div>

            <div className = 'check'>
                <input type = 'checkbox' name = 'GrabAndGo' ref={register}/>
                <label className = 'menu'> Grab & Go Meals </label>
                <img src = {grabIcon} alt ="Food Icon"/>
            </div>

            <div className = 'check'>
                <input type = 'checkbox' name = 'FoodPantry' ref={register}/>
                <label className = 'menu'> Food Pantry</label>
                <img src = {foodPantryIcon} alt ="Food Icon"/>
            </div>

            <div className = 'check'>
                <input type = 'checkbox' name ='SoupKitchen' ref={register}/>
                <label className = 'menu'>Soup Kitchen</label>
                <img src = {soupIcon} alt ="Food Icon"/>
            </div> */}
            
            <div className= 'check-submit'>
                <button type="submit">Submit</button>
            </div>
        </form>
        
        </div>
    </div>
  );
}

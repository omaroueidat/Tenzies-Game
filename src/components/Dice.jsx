import React from "react"

function Dice(props) {

    




    const div_color = {backgroundColor: props.pressed ? "#59E391" : "#FFFFFF"}

    
    return(
        <div className="main--dice" onClick={props.onHold} style={div_color}>{props.random}</div>
    )
}


export default Dice;
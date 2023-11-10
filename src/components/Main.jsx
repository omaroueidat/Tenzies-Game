import React from "react"
import Dice from "./Dice"
import Confetti from "react-confetti"
import { nanoid } from "nanoid"

function Main() {

    const [die,setDie] = React.useState(genarateDie())

    const [tenzies, setTenzies] = React.useState(false)


    React.useEffect(() =>{
        const allHeld = die.every(dice => dice.isHeld)

        const firstValue = die[0].value

        const allEqual = die.every(dice => dice.value === firstValue)
        if (allHeld && allEqual)
            setTenzies(true)
    }, [die])

    function genarateDie(){
        const random_numbers = []

        //loop to fill the random_numnbers array with random numbers
        for (var i=0;i<10;i++)
            random_numbers.push({
                value: generateRandom() ,
                isHeld: false,
                id: nanoid()
            })
        return random_numbers
    }


    const dices = die.map(dice => {
        return(
        <Dice
            random={dice.value}
            pressed={dice.isHeld}
            key={dice.id}
            onHold={() => hold(dice.id)}
        />
        )
    })

    function hold(id){
        setDie(oldDices => oldDices.map(dice => {
            return dice.id === id ? {...dice, isHeld: !dice.isHeld}
            : dice
        }))
    }
    
    function generateRandom(){
        return Math.ceil(Math.random() * 6)
    }

    const text = tenzies ? "New Game"  :"Roll"

    function Roll() {
        if (!tenzies){
            setDie(
                oldDie => oldDie.map(dice => {
                    return dice.isHeld == false ? {...dice,value: generateRandom()} : dice
                })
            )
        }
        else{
            setTenzies(false)
            setDie(genarateDie())
        }
        
    }
    console.log(dices);

    
    return (
        <main className="main--body">
            <h1 className="main--title">Tenzies</h1>
            <p className="main--description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dices">
                {dices}
            </div>
            <div className="button--container">
                <button className="main--button" onClick={Roll}>{text}</button>
            </div>
            {tenzies ? <Confetti></Confetti> : <></>}
        </main>
    )
}

export default Main;
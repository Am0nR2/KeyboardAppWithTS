import { useKeyboardContext } from "../Context/KeyboardContext"

type arr = {
    arr : string[]
    keys: number
    arrNumber: number
}

export default function({arr, keys, arrNumber}: arr){
    const {userInputs, trueWords, falseWords, gameStarted } = useKeyboardContext()
    
    const arrElements = arr.map((word, i) => (
    <div className="labels" key={keys + i}>
        <input 
                type="radio" 
                name="hello"
                id={word}
                value={word}
                checked={ arrNumber === 0 && userInputs.length % 5 === i }
                />
        <label style={
        gameStarted ?
            { color: trueWords.includes(word) ? "gray" : falseWords.includes(word) ? "red" : "" 
            } : {}
            } htmlFor={word}>{word}</label>
    </div>
    ))
    return(
        <div className="words">
            {arrElements}
        </div>
    )
}
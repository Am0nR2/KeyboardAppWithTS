import {useContext ,ReactNode, createContext, useState, ChangeEvent, KeyboardEvent, useEffect, useRef } from "react";
import { shuffle } from "../Utils/shuffleArr";
import { wordListData } from "../wordListData";

// Types
type KeyboardContextType = {
    children : ReactNode
}
type WordsArr = string[]
type KeyboardContextValues = {
    wordsToRender: string[][]
    words: string[]
    userInput: string
    userInputs: string[]
    trueWords: string[]
    falseWords: string[]
    gameTime: number
    gameStarted: boolean
    inputRef: React.RefObject<HTMLInputElement> | null
    getUserInputs: (e: ChangeEvent<HTMLInputElement>) => void;
    fiveWordsEntered : () => void
    addToUserInputsArr: (e: KeyboardEvent<HTMLDivElement>) => void
    startGame: () => void
    endGame: () => void
}

// Context Decloration 
const KeyboardContext = createContext({} as KeyboardContextValues)

export function useKeyboardContext(){
    return useContext(KeyboardContext)
}
// Exporting Provider 
export function KeyboardContextProvider({children}: 
    KeyboardContextType){
    
    // State Declorations
    const [wordsToRender, setWordsToRender] = useState <string[][]> ([wordListData.slice(0,5), wordListData.slice(5,10), wordListData.slice(10,15)])
    const [words, setWords] = useState <WordsArr> (wordListData.slice(30))
    const [userInputs, setUserInputs] = useState <string[]> ([])
    const [trueWords, setTrueWords] = useState <string[]> ([])
    const [falseWords, setFalseWords] = useState <string[]> ([])
    const [userInput, setUserInput] = useState <string> ("")
    const [gameTime, setGameTime] = useState <number> (60)
    const [gameStarted, setGameStarted] = useState <boolean> (false)
    const inputRef : React.RefObject<HTMLInputElement> | null = useRef(null)
    // Functions //  
    // UseEffect Function
        useEffect(()=> {
            if(gameTime> 0 && gameStarted){
                setTimeout(()=>{
                    setGameTime(prevState=> prevState-1)
                }, 1000)
            } else if(falseWords.length>0 ){
                endGame()
            }
        },[gameTime, gameStarted])

    
    const fiveWordsEntered: ()=> void = () => {
        const wordToPush = words.slice(0,5)
        setWords(prevState => {
            prevState.splice(0,5)
            return prevState})
        setWordsToRender(prevState =>{
            return [prevState[1], prevState[2], wordToPush]
        })
    }

    const getUserInputs = (e: ChangeEvent<HTMLInputElement>)=>{
        if(!gameStarted){
            startGame()
        }
        setUserInput(e.target.value)
        if(e.target.value === " "){
            setUserInput("")
        }
    }

    const addToUserInputsArr = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === ' ') {
            setUserInputs(prevState => [...prevState, userInput.split("").filter(letter => letter !== " ").join("")])
            if(userInput === wordsToRender[0][userInputs.length % 5] ){
                setTrueWords(prevState => [...prevState, userInput ])
            } else {
                setFalseWords(prevState => [...prevState, wordsToRender[0][userInputs.length % 5]]) 
            }
            setUserInput("")
    }
}
    function startGame(){
        setUserInput("")
        setTrueWords([])
        setFalseWords([])
        setGameStarted(true)
        
    }
    function endGame(){
        const data = shuffle(wordListData)
        setWords(data.slice(30))
        setWordsToRender([data.slice(0,5), data.slice(5,10), data.slice(10,15)])
        setUserInputs([])
        setGameTime(60)
        setGameStarted(false)
        setUserInput("Test end")
        setTimeout(()=> {
            setUserInput("")
        },3000)
    }

    return(
        <KeyboardContext.Provider value={
            {wordsToRender, 
                words,
                userInput,
                userInputs,
                trueWords,
                falseWords,
                gameTime,
                gameStarted,
                inputRef,
                getUserInputs,
                fiveWordsEntered,
                addToUserInputsArr,
                startGame,
                endGame
            }}>
            {children}
        </KeyboardContext.Provider>
    )
} 
import { useEffect } from "react"
import WordsOneRow from "./Components/WordsOneRow"
import { useKeyboardContext } from "./Context/KeyboardContext"
function App() {
  const {
    wordsToRender, 
      fiveWordsEntered, 
      getUserInputs,
      addToUserInputsArr,
      gameTime,
      trueWords,
      falseWords,
      userInput, 
      userInputs, 
      gameStarted, 
      inputRef
    
    } = useKeyboardContext()
  const keysArr = [10,20,30]
  
 console.log(inputRef)
  useEffect(()=> {
    if(userInputs.length> 0 && userInputs.length % 5 === 0){
      fiveWordsEntered()
    }
  },[userInputs.length % 5 === 0])
  if(!gameStarted && (trueWords.length>0 || falseWords.length >0)){
    if (inputRef.current) {
      inputRef.current.disabled = true;
    }
    setTimeout(()=> {
      if (inputRef.current) {
        inputRef.current.disabled = false;
      }
    },3000)
  } 

  const wordsElements = wordsToRender.map((wordsArr, i) => 
      <WordsOneRow arr={wordsArr} key={i} arrNumber={i} keys={keysArr[i]}/>    
    )
  return (
    <>
      <header className="container">
          
        <h1>Am0nR2 - Keyboard Speed Typing Project with TS</h1>
        <main>
          <section>
            <div className="words-container" >
              {wordsElements}      
            </div>

          </section>
          <div className="input-time">
            <input 
              type="text" 
              name="userInputs" 
              onChange={getUserInputs}
              value={userInput}
              onKeyDown={addToUserInputsArr}
              ref={inputRef}
              />
              <div className="time-left">{gameTime}</div>
            </div>
            { !gameStarted &&
             <div className="results">
              <div className="counts">
                <h3  style={{color: "white"}}>Total Count: </h3> <span style={{color: "white"}}>{trueWords.length+ falseWords.length}</span>
              </div>
              <div className="counts">
                <h3>True Count: </h3> <span  >{trueWords.length}</span>
              </div>
              <div className="counts">
                <h3 style={{color: "red"}}>False Count: </h3> <span style={{color: "red"}} >{falseWords.length}</span>
              </div>
            </div>}
        </main>
      </header>
    </>
  )
}

export default App

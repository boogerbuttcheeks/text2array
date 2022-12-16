import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const [singleQuote, setSingleQuote] = useState(false)

  let quote = ''
  if (singleQuote) {
    quote = "'"
  } else {
    quote = '"'
  }

  function handleSingleQuoteChange() {
    setSingleQuote(!singleQuote)
  }

  function handleSubmit(e) {
    e.preventDefault();
    const splitString = input.split(' ')
    const modifiedString = []

    for (let i = 0; i < splitString.length; i++) {
      if (i === 0) {
        modifiedString.push(`${quote}${splitString[i]}${quote}`)
      } else {
        modifiedString.push(` ${quote}${splitString[i]}${quote}`)
      }

      setOutput(modifiedString)
    }
  }

  function handleOnChange(e) {
    setInput(e.target.value);
  }

  return (
    <>
      <div className='settings'>
        <input type="checkbox"
          id="single-quote"
          name="single-quote"
          onClick={handleSingleQuoteChange}
        />
        <label htmlFor="single-quote">Single quote</label>
      </div>
      <div className='App'>
        <div className='textarea-wrapper'>
          <form>
            <textarea
              value={input}
              onChange={handleOnChange}
              placeholder='one two three'
            />
          </form>
          <div className='generate-wrapper'>
            <button onClick={handleSubmit}>Generate</button>
          </div>
        </div>
        <div className='textarea-wrapper'>
          <form>
            <textarea
              placeholder={`${quote}one${quote}, ${quote}two${quote}, ${quote}three${quote}`}
              value={output}
              readOnly
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default App

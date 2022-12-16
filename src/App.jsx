import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const [singleQuote, setSingleQuote] = useState(false)
  const [noSpace, setNoSpace] = useState(false)
  const [lineBreak, setLineBreak] = useState(false)
  const [perCharacter, setPerCharacter] = useState(false)

  let quote = ''
  if (singleQuote) {
    quote = "'"
  } else {
    quote = '"'
  }

  function handleSingleQuoteChange() {
    setSingleQuote(!singleQuote)
  }

  function handleNoSpaceChange() {
    setNoSpace(!noSpace)
  }

  function handleLineBreakChange() {
    setLineBreak(!lineBreak)
  }

  function handleSplitPerCharacterChange() {
    setPerCharacter(!perCharacter)
    if (lineBreak) {
      setLineBreak(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (input.length === 0) {
      alert('Input cannot be empty.')
      return
    }

    let splitString = ''
    let modifiedString = []

    if (lineBreak) {
      splitString = input.split(/\r?\n/)
    } else if (perCharacter) {
      splitString = input.replace(/\s+/g, '');
      splitString = splitString.split('')
    } else {
      splitString = input.split(' ')
    }

    if (noSpace) {
      for (let i = 0; i < splitString.length; i++) {
        modifiedString.push(`${quote}${splitString[i]}${quote}`)
      }

      setOutput(modifiedString)
    } else {
      for (let i = 0; i < splitString.length; i++) {
        if (i === 0) {
          modifiedString.push(`${quote}${splitString[i]}${quote}`)
        } else {
          modifiedString.push(` ${quote}${splitString[i]}${quote}`)
        }

        setOutput(modifiedString)
      }
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
        <input type="checkbox"
          id="no-space"
          name="no-space"
          onClick={handleNoSpaceChange}
        />
        <label htmlFor="no-space">No spaces</label>
        <input type="checkbox"
          id="line-break"
          name="line-break"
          onClick={handleLineBreakChange}
          disabled={perCharacter}
          checked={lineBreak}
          onChange={() => { }}
        />
        <label htmlFor="line-break">Split by line break</label>
        <input type="checkbox"
          id="per-character"
          name="per-character"
          onClick={handleSplitPerCharacterChange}
        />
        <label htmlFor="per-character">Split per character</label>
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
              placeholder={
                noSpace ?
                  `${quote}one${quote},${quote}two${quote},${quote}three${quote}`
                  : `${quote}one${quote}, ${quote}two${quote}, ${quote}three${quote}`
              }
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

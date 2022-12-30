import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

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

  function quickFill(e) {
    setInput(e)
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2500)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='app'>
      <h1>Text 2 Array</h1>
      <p>Made by <a href='https://trevortylerlee.com'>Trevor Lee</a></p>
      <div className='settings'>
        <div className='setting'>
          <input type="checkbox"
            id="single-quote"
            name="single-quote"
            onClick={handleSingleQuoteChange}
          />
          <label htmlFor="single-quote">Single quote</label>
        </div>
        <div className='setting'>
          <input type="checkbox"
            id="no-space"
            name="no-space"
            onClick={handleNoSpaceChange}
          />
          <label htmlFor="no-space">No spaces</label>
        </div>
        <div className='setting'>
          <input type="checkbox"
            id="line-break"
            name="line-break"
            onClick={handleLineBreakChange}
            disabled={perCharacter}
            checked={lineBreak}
            onChange={() => { }}
          />
          <label htmlFor="line-break">Split by line break</label>
        </div>
        <div className='setting'>
          <input type="checkbox"
            id="per-character"
            name="per-character"
            checked={perCharacter ? true : false}
            onClick={handleSplitPerCharacterChange}
          />
          <label htmlFor="per-character">Split per character</label>
        </div>
      </div>
      <div className='input-wrapper'>
        <div className='textarea-wrapper'>
          <form>
            <textarea
              value={input}
              onChange={handleOnChange}
              placeholder={lineBreak ?
                'one two three\nfour five six' :
                'one two three'}
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
                noSpace
                  ? perCharacter
                    ? `${quote}o${quote},${quote}n${quote},${quote}e${quote},${quote}t,${quote},${quote}w${quote},${quote}o${quote},${quote}t${quote},${quote}h${quote},${quote}r${quote},${quote}e${quote},${quote}e${quote}`
                    :
                    lineBreak
                      ? `${quote}one two three${quote},${quote}four five six${quote}`
                      : `${quote}one${quote},${quote}two${quote},${quote}three${quote}`
                  : perCharacter
                    ? `${quote}o${quote}, ${quote}n${quote}, ${quote}e${quote}, ${quote}t, ${quote}, ${quote}w${quote}, ${quote}o${quote}, ${quote}t${quote}, ${quote}h${quote}, ${quote}r${quote}, ${quote}e${quote}, ${quote}e${quote}`
                    :
                    lineBreak
                      ? `${quote}one two three${quote}, ${quote}four five six${quote}`
                      : `${quote}one${quote}, ${quote}two${quote}, ${quote}three${quote}`
              }
              value={output}
              readOnly
            />
          </form>
          <div className='generate-wrapper'>
            <button onClick={copyToClipboard}>{copied ? 'Copied!' : 'Copy'}</button>
          </div>
        </div>
      </div>
      <h2>Quick fill</h2>
      <div className="quick-fill-wrapper">
        <button onClick={() => {
          quickFill('1 2 3 4 5 6 7 8 9 10')
          setPerCharacter(false)
          setLineBreak(false)
        }}>1 - 10</button>
        <button onClick={() => {
          quickFill('1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100')
          setPerCharacter(false)
          setLineBreak(false)
        }}>1 - 100</button>
        <button onClick={() => {
          quickFill('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
          setPerCharacter(true)
          setLineBreak(false)
        }}>A - Z</button>
        <button onClick={() => {
          quickFill('abcdefghijklmnopqrstuvwxyz')
          setPerCharacter(true)
          setLineBreak(false)
        }}>a - z</button>
        <button onClick={() => {
          quickFill('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz')
          setPerCharacter(true)
          setLineBreak(false)
        }}>Aa - Zz</button>
        <button onClick={() => {
          quickFill('Monday Tuesday Wednesday Thursday Friday Saturday Sunday')
          setPerCharacter(false)
          setLineBreak(false)
        }}>Mon - Sun</button>
        <button onClick={() => {
          quickFill('January February March April May June July August September October November December')
          setPerCharacter(false)
          setLineBreak(false)
        }}>Jan - Dec</button>
      </div>
    </div>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import 'semantic-ui-css/semantic.min.css'
import { Form, TextArea, Button } from 'semantic-ui-react'

function App() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  async function handleSubmit(e) {
    e.preventDefault();
    const splitString = input.split(' ')
    const modifiedString = []

    for (let i = 0; i < splitString.length; i++) {
      if (i === 0) {
        modifiedString.push(`"${splitString[i]}"`)
      } else {
        modifiedString.push(` "${splitString[i]}"`)
      }

      setOutput(modifiedString)
    }
  }

  function handleOnChange(e) {
    setInput(e.target.value);
  }

  return (
    <div className='App'>
      <div className='textarea-wrapper'>
        <form onSubmit={handleSubmit}>
          <textarea
            value={input}
            onChange={handleOnChange}
          />
        </form>
        <div className='generate-wrapper'>
          <Button onClick={handleSubmit}>Generate</Button>
        </div>
      </div>
      <div className='textarea-wrapper'>
        <form>
          <textarea
            placeholder="placeholder for now"
            value={output}
            readOnly
          />
        </form>
      </div>
    </div>
  )
}

export default App

import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [chacterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")
  
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"

    if (numberAllowed)
      str += "1234567890"
    
    if (chacterAllowed)
      str += "!@#$%^&*()_+=-"
    
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length+1)
      // let char = Math.random() * str.length + 1
      console.log(char)
      pass += str.charAt(char)
      console.log(pass)
    }
    setPassword(pass)

  }, [length, numberAllowed, chacterAllowed])

  // console.log(password)

  // UseRef for copy password

  const passwordRef = useRef(null)


  const copyPasswordToClipBoard = useCallback(()=>{
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,5)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect (()=>
    {
      passwordGenerator()
    },
  
  [length,numberAllowed,chacterAllowed,passwordGenerator])


  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded px-3 bg-gray-800 text-orange-500 px-2 py-3 my-10'>
        <h1 className='text-center text-white my-2'>Password Generator</h1>
        <div className='flex flex-wrap justify-center gap-x-2  px-2 rounded overflow-hidden rounded mb-3 '>
        
          <input
            type='text'
            placeholder='Password'
            className='outline-none rounded  py-2 px-3'
            value={password}
            ref={passwordRef}
            readOnly
          />

          <button 
          className='outline-none w-max rounded p-2 bg-blue-700 text-white py-2'
          onClick={copyPasswordToClipBoard}
          >Copy
          
          </button>
        </div>
        <div className='flex text-sm mx-2 gap-x-4 flex-wrap'>
          <div className='flex items-center gap-x-2'>

            <input
              type='range'
              min={8}
              max={32}
              value={length}
              onChange={(e) => setLength(e.target.value)}

            />
            <label>
              Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-2 text-md'>

            <input
              type='checkbox'
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}

            />
            <label htmlFor='numberInput'>
              Number</label>
          </div>
          <div className='flex items-center gap-x-2'>

            <input
              type='checkbox'
              defaultChecked={chacterAllowed}
              id='charInput'
              onChange={() => {
                setCharacterAllowed((prev) => !prev)
              }}

            />
            <label htmlFor='charInput'>
              Character</label>
          </div>

        </div>
      </div>

    </>
  )
}

export default App

import React, { useEffect, useRef, useState } from 'react'
import { FaCheck } from 'react-icons/fa'
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const LettersAndNumbers = 'abcdefghijklmnopqrstuvwxyz1234567890'
const App = () => {
  const UserRef = useRef()
  const [name, SetName] = useState('')
  const [nameVaild, SetNameVaild] = useState(false)
  const [pass, SetPass] = useState('')
  const [email, SetEmail] = useState('')
  const [validPass, SetvalidPass] = useState(false)

  useEffect(() => {
    UserRef.current.focus()
  }, [])

  useEffect(() => {
    const nameOk = USER_REGEX.test(name)
    if (nameOk) {
      SetNameVaild(true)
    } else {
      SetNameVaild(false)
    }
  }, [name])

  useEffect(() => {
    const passOk = PWD_REGEX.test(pass)
    if (passOk) {
      SetvalidPass(true)
    } else {
      SetvalidPass(false)
    }
  }, [pass])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!nameVaild) {
      alert('inVaild name')
    } else if (!validPass) {
      alert('invaild pass pass should contain (A / a , 0123.. ,@#$%&*! )')
    } else {
      alert('log in success')
      SetName('')
      SetPass('')
      SetEmail('')
    }
  }
  return (
    <form className='valid' onSubmit={handleSubmit}>
      <h2>Register </h2>
      <div>
        <input required
          value={name}
          type="text"
          ref={UserRef}
          placeholder='Enter UserName'
          autoComplete='off'
          onChange={(e) => SetName(e.target.value)}
          className={nameVaild ? 'validName' : ''} />
        <FaCheck
          style={!nameVaild ? { color: 'red', fontSize: '24px', padding: '2px' } :
            { color: 'green', fontSize: '24px', padding: '2px' }} />
      </div>
      <p
        className={!nameVaild & name !== '' ? 'show-error error' : 'error'}>
        Invalid Name Not Less Than 4 Letters with Upper And Lowercase Letters
      </p>
      <div>
        <input required
          value={email}
          type="email"
          onChange={(e) => SetEmail(e.target.value)}
          placeholder='Enter Email'
          autoComplete='off'
        />
        <FaCheck
          style={email.includes('@') ?
            { color: 'green', fontSize: '24px', padding: '2px' } :
            { color: 'red', fontSize: '24px', padding: '2px' }} />
      </div>
      <div>
        <input required
          value={pass}
          type="password"
          placeholder='Enter Password'
          autoComplete='off'
          onChange={(e) => SetPass(e.target.value)}
          className={validPass ? 'validName' : ''}
        />
        <FaCheck
          style={!validPass ? { color: 'red', fontSize: '24px', padding: '2px' } :
            { color: 'green', fontSize: '24px', padding: '2px' }} />
      </div>
      <p className={!validPass & pass !== '' ? 'show-error error' : 'error'}>
        Invalid Password it should contain Upper,Lowercase,Spcial Chacacter  and Not Less Than 8 Letters
      </p>
      <button className={!nameVaild || !validPass ? 'no-click' : ''} type='submit'>Log in</button>
    </form>
  )
}

export default App

import { useState } from 'react'

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

const defaultFormFields = {
  displayName: ``,
  email: ``,
  password: ``,
  confirmPassword: ``,
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {displayName, email, password, confirmPassword} = formFields

  //reset
  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    //to do
    // 1.password matches
    if(password!==confirmPassword){
      alert(`Passwords don't match!`)
      return
    }
    // 2.authed user
    // 3.create user doc
    try{
      const { user } = await createAuthUserWithEmailAndPassword(email, password)
      user.displayName = displayName
      await createUserDocumentFromAuth(user)
      resetFormFields()
    }catch(err){
      if(err.code==='auth/email-already-in-use'){
        alert('Email already in use!')
      }else{
        console.log(`user creation error`, err)
      }
    }
  }

  const handleChange = (event) => {
    const {name, value} = event.target
    setFormFields({...formFields, [name]: value})
  }

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input type="text" required onChange={handleChange} name="displayName" value={displayName} />
        <label>Email</label>
        <input type="email" required onChange={handleChange} name="email" value={email} />
        <label>Password</label>
        <input type="password" required onChange={handleChange} name="password" value={password} />
        <label>Confirm Password</label>
        <input type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm
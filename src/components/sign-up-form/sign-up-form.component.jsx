import { useState } from 'react'
import FormInput from '../form-input/form-input.component'
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
        <FormInput 
          label='Display Name'
          inputOptions = {{
            type:'text',
            required:true,
            onChange:handleChange,
            name:'displayName',
            value:displayName,
          }}
        />
        <FormInput 
          label='Email'
          inputOptions = {{
            type:'email',
            required:true,
            onChange:handleChange,
            name:'email',
            value:email,
          }}
        />
        <FormInput 
          label='Password'
          inputOptions = {{
            type:'password',
            required:true,
            onChange:handleChange,
            name:'password',
            value:password,
          }}
        />
        <FormInput 
          label='Confirm Password'
          inputOptions = {{
            type:'password',
            required:true,
            onChange:handleChange,
            name:'confirmPassword',
            value:confirmPassword,
          }}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm
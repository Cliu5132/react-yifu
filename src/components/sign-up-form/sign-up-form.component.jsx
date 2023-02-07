import { useContext, useState } from 'react'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import './sign-up-form.styles.scss'
import { UserContext } from '../../contexts/user.context'

const defaultFormFields = {
  displayName: ``,
  email: ``,
  password: ``,
  confirmPassword: ``,
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {displayName, email, password, confirmPassword} = formFields

  //context
  const {setCurrentUser} = useContext(UserContext)

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
      setCurrentUser(user)
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
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
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
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm
import { useState, useContext } from 'react'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import { UserContext } from '../../contexts/user.context'
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils'
import './sign-in-form.styles.scss'

const defaultFormFields = {
  email: ``,
  password: ``,
}

const SignInForm = () => {
  const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup()
    await createUserDocumentFromAuth(user)
  }

  const [formFields, setFormFields] = useState(defaultFormFields)
  const {email, password,} = formFields

  //context
  const {setCurrentUser} = useContext(UserContext)

  //reset
  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    try {
      const {user} = await signInAuthUserWithEmailAndPassword(email, password)
      setCurrentUser(user)
      resetFormFields()
    } catch (err) {
      switch (err.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email')
          break
        case 'auth/user-not-found':
          alert('no user associated with this email')
          break
        default:
          console.log(err)
      }
    }
  }

  const handleChange = (event) => {
    const {name, value} = event.target
    setFormFields({...formFields, [name]: value})
  }

  return (
    <div className='sign-in-container'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType="google" onClick={signInWithGoogle}>Google sign in</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

import {
  getFirestore,
  doc, //get doc instance
  getDoc, // access data
  setDoc, // set data
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

initializeApp(firebaseConfig)

const glgProvider = new GoogleAuthProvider()

glgProvider.setCustomParameters({
  prompt: `select_account`,
})

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  console.log(userAuth)
}

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, glgProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, glgProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  if(!userAuth) return

  const userDocRef = doc(db, `users`, userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  //if user data not exist
  //creat the doc with the data from userauth
  if(!userSnapshot.exists()){
    const {displayName, email}=userAuth
    const createAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email, 
        createAt,
      })
    }catch(err){
      console.log(`error creating the user: ${err.message}`)
    }
  }

  //check if user data exists
  // return user doc ref
  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return

  const userDoc = await createUserWithEmailAndPassword(auth, email, password)
  return userDoc
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return

  const userDoc = await signInWithEmailAndPassword(auth, email, password)
  return userDoc
}

export const signOutUser = async ()=> await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)
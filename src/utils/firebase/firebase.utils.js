import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD09AGcxwoqRniPSy0KW3tbUWucsjcuT84",
  authDomain: "yifu-41b8b.firebaseapp.com",
  projectId: "yifu-41b8b",
  storageBucket: "yifu-41b8b.appspot.com",
  messagingSenderId: "189401760763",
  appId: "1:189401760763:web:6416a6ab4a1300f501015e"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  console.log(userAuth);
};

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

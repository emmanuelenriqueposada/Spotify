import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, getAuth, signInWithPopup, GoogleAuthProvider, type NextOrObserver, type User, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebaseConfig";

const auth = getAuth(app);

//Login
export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
}

//Register
export const signUp = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password)
}


export const googleAuth = async () => {
  return await signInWithPopup(auth, new GoogleAuthProvider()).then(response => {
    console.log(response.user.uid)
  }).catch(error => {
    console.log(error)
  })
}

export const logOut = async () => {
  return await signOut(auth)
}

export const onAthStateChange = (callback: NextOrObserver<User>) => {
  return onAuthStateChanged(auth, callback);
}
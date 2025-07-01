import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  type NextOrObserver, 
  type User, 
  onAuthStateChanged 
} from "firebase/auth";
import { app } from "../config/firebaseConfig";

const auth = getAuth(app);

//Login
export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
}

//Register
export const signUp = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password)
}

//Google
export const googleAuth = async () => {
  return await signInWithPopup(auth, new GoogleAuthProvider()).then(response => {
    console.log(response.user.uid)
  }).catch(error => {
    console.log(error)
  })
}

//Cerrar Sesión
export const logOut = async () => {
  return await signOut(auth)
}

//Manejar cuando el usuario esta autenticado
export const onAthStateChange = (callback: NextOrObserver<User>) => {
  return onAuthStateChanged(auth, callback);
}
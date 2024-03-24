import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: 'AIzaSyAyx-df9Cu8urdFWuGQ6MvpHTQ0TP4DQMA',
  authDomain: 'creactive-83d83.firebaseapp.com',
  projectId: 'creactive-83d83',
  storageBucket: 'creactive-83d83.appspot.com',
  messagingSenderId: '830095493844',
  appId: '1:830095493844:web:7bdcbb60815ea28028c941',
  measurementId: 'G-V83CR1NW09',
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

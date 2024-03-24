import { FirebaseError } from 'firebase/app'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from 'firebase/firestore/lite'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { db } from '@/firebase'
import { auth } from '@/firebaseAuth'

export const logIn = async (email: string, password: string) => {
  if (auth.currentUser) {
    console.log('Already logged in', auth.currentUser?.email)
    return
  }

  if (!email || !password) {
    console.log('Missing email or password.')
    return
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    const { user } = userCredential
    console.log('User logged in', user.email)
    return user
  } catch (e) {
    console.error('Login error', e instanceof FirebaseError && e.code)
  }
}

export const getConfig = async (userUid?: string) => {
  if (!userUid) {
    return null
  }

  try {
    const col = collection(db, 'editorConfig')
    const res = await getDocs(query(col))

    if (res.empty) {
      return null
    }

    const config = res.docs[0]

    return config.data()
  } catch (error) {
    console.error('Error caught:\n', error)
  }

  return null
}

export const getUserData = async (userUid?: string) => {
  if (!userUid) {
    return null
  }

  try {
    const col = collection(db, 'users')
    const res = await getDoc(doc(col, userUid))
    const data = res.data()

    if (!data) {
      return null
    }

    const privileges = Number(data.privileges)

    return {
      name: data.name,
      isEditor: privileges > 99,
      isAdmin: privileges > 999,
    }
  } catch (error) {
    console.error('Error caught:\n', error)
  }

  return null
}

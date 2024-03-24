import { db } from '@/firebase'
import { FirebaseError } from 'firebase/app'
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  DocumentReference,
  doc,
} from 'firebase/firestore/lite'
import { DbSnippet } from './types'

const DRUMS_COLLECTION = 'drums'

export const addDrums = async (snippet: DbSnippet) => {
  if (snippet.patterns.length < 1) {
    console.log('Snippet data invalid: min 1 pattern is required.')
    return
  }

  try {
    const docRef = await addDoc(collection(db, DRUMS_COLLECTION), {
      ...snippet,
      createdAt: serverTimestamp(),
    })
    console.log('Groove created { id: ', docRef.id, ' }')
    return docRef
  } catch (e) {
    console.error(
      'Error adding snippet: ',
      e instanceof FirebaseError && e.code
    )
  }
}

export const updateDrums = async (
  docRef: DocumentReference,
  snippet: Partial<DbSnippet>
) => {
  try {
    await updateDoc(docRef, {
      ...snippet,
      updatedAt: serverTimestamp(),
    })
    console.log('Groove updated { id: ', docRef.id, ' }')
    return true
  } catch (e) {
    console.error('Error updating groove: ', e instanceof FirebaseError && e)
  }
}

export const publishGroove = (id: string) => {
  const col = collection(db, DRUMS_COLLECTION)
  return updateDrums(doc(col, id), { published: true })
}

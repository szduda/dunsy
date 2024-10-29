import {
  browserLocalPersistence,
  browserSessionPersistence,
  indexedDBLocalPersistence,
  initializeAuth,
} from 'firebase/auth'
import { app } from './firebase'

export const auth = initializeAuth(app, {
  persistence: [
    indexedDBLocalPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
  ],
  popupRedirectResolver: undefined,
})

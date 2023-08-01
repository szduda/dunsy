import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyAyx-df9Cu8urdFWuGQ6MvpHTQ0TP4DQMA",
  authDomain: "creactive-83d83.firebaseapp.com",
  projectId: "creactive-83d83",
  storageBucket: "creactive-83d83.appspot.com",
  messagingSenderId: "830095493844",
  appId: "1:830095493844:web:7bdcbb60815ea28028c941",
  measurementId: "G-V83CR1NW09",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// export const fetchDrums = async () => {
//   const drumsCol = collection(db, "drums");
//   const drumSnapshot = await getDocs(drumsCol);
//   const snippetList = drumSnapshot.docs.map((doc) => doc.data());
//   return snippetList;
// };

export const addSnippet = async (snippet = {}) => {
  try {
    const docRef = await addDoc(collection(db, "drums"), {
      ...snippet,
      createdAt: serverTimestamp(),
    });
    console.log("Snippet written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding snippet: ", e);
  }
};

export const addPattern = async (snippet = {}) => {
  try {
    const docRef = await addDoc(collection(db, "patterns"), snippet);
    console.log("Pattern written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding patter: ", e);
  }
};

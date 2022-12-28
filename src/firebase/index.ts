// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { ref, onUnmounted } from 'vue'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyDug3JI46uaZ1fDytPQra1kMpaZzAE58mw",
    authDomain: "traineeprj4.firebaseapp.com",
    projectId: "traineeprj4",
    storageBucket: "traineeprj4.appspot.com",
    messagingSenderId: "570863238804",
    appId: "1:570863238804:web:78f0f37f26039717dcfe81",
    measurementId: "G-0L5X4ZDK4Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = app.firestore();
const userCollection = db.collection('users')

const auth = getAuth(app);

export const getUser = async (id: any) => {
    const user = await userCollection.doc(id).get()
    return user.exists ? user.data() : null   
}

export const updateUser = (id: any, user: any) => {
    return userCollection.doc(id).update(user)
}

export const deleteUser = (id: any) => {
    return userCollection.doc(id).delete()
}

export const useLoadUsers = () => {
    const users = ref([])
    const close = userCollection.onSnapshot(snapshot => {
        users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return users
}

export { auth };
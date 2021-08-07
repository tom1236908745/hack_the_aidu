import firebase from 'firebase'
import * as admin from "firebase-admin"
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDdKWZ0wud1-kYGGGCp5wmCwCS4TX6Vfvo",
    authDomain: "hack-the-aidu-14f35.firebaseapp.com",
    projectId: "hack-the-aidu-14f35",
    storageBucket: "hack-the-aidu-14f35.appspot.com",
    messagingSenderId: "943370001875",
    appId: "1:943370001875:web:268389c7d51c24147c6326"
}

let db: any

//１回目の場合
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
    db = firebase.firestore()
}
//２回目以降の場合
else {
    db = firebase.firestore()
}

export default db
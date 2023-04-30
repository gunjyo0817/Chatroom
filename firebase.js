import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAPr9ldutq4_5oKeM2rNMxnvVQl9g7HyWY",
    authDomain: "ss-chatroom-392a9.firebaseapp.com",
    databaseURL: "https://ss-chatroom-392a9-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ss-chatroom-392a9",
    storageBucket: "ss-chatroom-392a9.appspot.com",
    messagingSenderId: "314596210098",
    appId: "1:314596210098:web:0bd21dfc143bdb1c4f20ab",
    measurementId: "G-KF419GS1L4"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

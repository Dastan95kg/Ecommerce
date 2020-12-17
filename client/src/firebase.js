import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBOGxM4LSJh92oS2flsOeAv0GqjcH4H_Q4",
    authDomain: "ecommerce-d4c57.firebaseapp.com",
    projectId: "ecommerce-d4c57",
    storageBucket: "ecommerce-d4c57.appspot.com",
    messagingSenderId: "332449591936",
    appId: "1:332449591936:web:dadb08fdf97a4156a82c65"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
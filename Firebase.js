import firebase from "firebase";

// Firebase config ayarları
var firebaseConfig = {
  apiKey: "AIzaSyAGQy5W3jzDT7ddVU9TvLwbweYbawcC8ZY",
  authDomain: "ft-sozluk.firebaseapp.com",
  projectId: "ft-sozluk",
  databaseURL: "https://ft-sozluk-default-rtdb.firebaseio.com",
  storageBucket: "ft-sozluk.appspot.com",
  messagingSenderId: "1078591357857",
  appId: "1:1078591357857:web:f7ad47501991a74a57c1e0",
  measurementId: "G-Q6M49HR0D8",
};

// Firebase Initialize ediliyor
let Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;

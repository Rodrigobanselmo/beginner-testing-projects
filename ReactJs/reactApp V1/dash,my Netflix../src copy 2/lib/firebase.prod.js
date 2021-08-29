import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

//import { seedDatabase } from '../seed';

const config = {
  apiKey: "AIzaSyAGg8HUWkL5fMu6fJ3epUIWef4m2MX75RI",
  authDomain: "react-dashboard-93701.firebaseapp.com",
  projectId: "react-dashboard-93701",
  storageBucket: "react-dashboard-93701.appspot.com",
  messagingSenderId: "827607237083",
  appId: "1:827607237083:web:985121f945c26871a827fe",
  measurementId: "G-RZSL64G7JV"
};

const firebase = Firebase.initializeApp(config);
firebase.analytics();

//seedDatabase(firebase);

export { firebase };

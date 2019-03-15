import Firebase from 'firebase' 

var config = {
    apiKey: "AIzaSyDOoPnjLlSlE4cT142b8cF-GrYRbwd-PEo",
    authDomain: "testingproject-e0e58.firebaseapp.com",
    databaseURL: "https://testingproject-e0e58.firebaseio.com",
    projectId: "testingproject-e0e58",
    storageBucket: "testingproject-e0e58.appspot.com",
    messagingSenderId: "30679423905"
  };

  Firebase.initializeApp(config)
export const ref = Firebase.database().ref()
export const auth = Firebase.auth;
export const provider = new Firebase.auth.GoogleAuthProvider();

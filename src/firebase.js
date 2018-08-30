import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA7j1CO3AUZhPaa-0Clh086pXfyZeofZZk",
    authDomain: "project5-food-blog.firebaseapp.com",
    databaseURL: "https://project5-food-blog.firebaseio.com",
    projectId: "project5-food-blog",
    storageBucket: "project5-food-blog.appspot.com",
    messagingSenderId: "57695911179"
  };
  firebase.initializeApp(config);

export default firebase;
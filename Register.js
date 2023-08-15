import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8i1gI3_Zf8nDhyTXzPheOULVS1pRWByE",
  authDomain: "form-validation-7bf8e.firebaseapp.com",
  databaseURL:
    "https://form-validation-7bf8e-default-rtdb.firebaseio.com",
  projectId: "form-validation-7bf8e",
  storageBucket: "form-validation-7bf8e.appspot.com",
  messagingSenderId: "205281456046",
  appId: "1:205281456046:web:a25ccfca854610a52fa23f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let auth = getAuth();

let submit = document.querySelector("#submit-btn");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  let username = document.querySelector("#username").value;
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userDetail) => {
      console.log(userDetail);
      const uid = userDetail.user.uid;
      console.log(uid);
      let db = getDatabase();
      set(ref(db, "userCollection/" + uid), {
        id: uid,
        username: username,
        email: email,
        createdAt: new Date().toISOString(),
      });
      alert("User created successfully");
      setTimeout(() => {
        window.location.href = "./sigin.html";
      }, 2000);
    })
    .catch((error) => {
      console.log(error);
    });
});
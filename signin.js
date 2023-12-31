import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE0zrh4eTfnAAD9q-VV2I6kAg6PBKQCi4",
  authDomain: "fsd23a-d3da2.firebaseapp.com",
  projectId: "fsd23a-d3da2",
  storageBucket: "fsd23a-d3da2.appspot.com",
  messagingSenderId: "1026816591187",
  appId: "1:1026816591187:web:e4e274729352ec28384da6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let auth = getAuth();

let submit = document.querySelector("#signin-btn");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userDetail) => {
      console.log(userDetail);
      const uid = userDetail.user.uid;
      console.log(uid);
      alert("User logged in successfully");
      setTimeout(() => {
        window.location.href = `./login.html?id=${uid}`;
      }, 2000);
    })
    .catch((error) => {
      console.log(error);
    });
});
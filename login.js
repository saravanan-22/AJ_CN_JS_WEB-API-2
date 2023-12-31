import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getAuth,
  deleteUser,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import {
  getDatabase,
  ref,
  onValue,
  update,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

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

let submit = document.querySelector("#submit-btn");

let edit = document.querySelector("#edit");
let deleteBtn = document.querySelector("#delete");
let logout = document.querySelector("#logout");

let urlQuery = new URLSearchParams(location.search);
let [id] = urlQuery.values();
let createdAt = null;

let db = getDatabase();
let userRef = ref(db, "userCollection/" + id);
onValue(userRef, (snapshot) => {
  let data = snapshot.val();
  console.log(data);
  let username = document.querySelector("#username");
  let email = document.querySelector("#email");
  let displayName = document.querySelector("#displayName");
  displayName.textContent = data?.username;
  username.value = data?.username;
  email.value = data?.email;
  sessionStorage.setItem(id, id);
  createdAt = data?.createdAt;
});

edit.addEventListener("click", (e) => {
  e.preventDefault();
  if (confirm("Are you sure to edit the user details?")) {
    let username = document.querySelector("#username").value;
    let email = document.querySelector("#email").value;
    let newData = {
      id: id,
      username: username,
      email: email,
      createdAt: createdAt,
    };

    let updates = {};
    updates["/userCollection/" + id] = newData;
    update(ref(db), updates);
    alert("User details updated successfully");
  }
});

logout.addEventListener("click", () => {
  sessionStorage.removeItem(id);
  alert("User logged out successfully");
  setTimeout(() => {
    window.location.href = "./Sigin.html";
  });
});

deleteBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (confirm("Are you sure to delete the account")) {
    const user = auth.currentUser;
    deleteUser(user)
      .then(() => {
        console.log("User deleted");
      })
      .catch((error) => {
        console.log(error);
      });
    let updates = {};
    updates["/userCollection/" + id] = null;
    update(ref(db), updates);
    alert("User details deleted successfully");
    setTimeout(() => {
      window.location.href = "./register.html";
    }, 2000);
  }
});
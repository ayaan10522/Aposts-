// Paste your Firebase config here
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDH3DvezFGrea5I7LwpaGi34xT5EYqvUEA",
  authDomain: "aposts.firebaseapp.com",
  databaseURL: "https://aposts-default-rtdb.firebaseio.com",
  projectId: "aposts",
  storageBucket: "aposts.firebasestorage.app",
  messagingSenderId: "496154926405",
  appId: "1:496154926405:web:d7f5298ce2199d7502322c",
  measurementId: "G-6LCX0K5RGW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to add post
function addPost() {
    let postInput = document.getElementById("postInput");
    let postText = postInput.value.trim();

    if (postText === "") {
        alert("Post cannot be empty!");
        return;
    }

    // Store post in Firestore
    db.collection("posts").add({
        text: postText,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    postInput.value = "";
}

// Function to load posts
function loadPosts() {
    db.collection("posts").orderBy("createdAt", "desc").onSnapshot((snapshot) => {
        let postsDiv = document.getElementById("posts");
        postsDiv.innerHTML = "";
        snapshot.forEach((doc) => {
            let postDiv = document.createElement("div");
            postDiv.classList.add("post");
            postDiv.innerText = doc.data().text;
            postsDiv.appendChild(postDiv);
        });
    });
}

// Load posts on page load
window.onload = loadPosts;

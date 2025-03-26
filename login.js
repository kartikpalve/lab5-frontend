// Firebase configuration - replace with your own config
const firebaseConfig = {
    apiKey: "AIzaSyDZmtXW8JjPzu-OYZLzzRNIpeiWW6BO1Qg",
    authDomain: "lab5-afa1c.firebaseapp.com",
    projectId: "lab5-afa1c",
    storageBucket: "lab5-afa1c.appspot.com",
    messagingSenderId: "428223976034",
    appId: "1:428223976034:web:a898613a17cb550752f73b"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  // DOM elements
  const loginForm = document.getElementById('login-form');
  const messageDiv = document.getElementById('message');
  
  // Function to display messages
  function showMessage(message, isError = false) {
    messageDiv.textContent = message;
    messageDiv.className = isError ? 'alert alert-danger' : 'alert alert-success';
    setTimeout(() => {
      messageDiv.textContent = '';
      messageDiv.className = '';
    }, 3000);
  }
  
  // Handle login
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    try {
      // Sign in with Firebase Auth
      await auth.signInWithEmailAndPassword(email, password);
      showMessage('Login successful! Redirecting to your profile...');
      
      // Redirect after a short delay (you could also handle session management on a dedicated profile page)
      setTimeout(() => {
        window.location.href = "profile.html"; // Create profile.html to display user details
      }, 1500);
    } catch (error) {
      console.error('Login error:', error);
      showMessage(error.message, true);
    }
  });
  
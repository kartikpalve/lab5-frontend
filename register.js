// Firebase configuration - replace with your own config
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
const firebaseConfig = {
  apiKey: "AIzaSyAhEGC0bxwRKEbRFQFc99FAzYhL2rhWhFg",
  authDomain: "astute-impulse-447907-u1.firebaseapp.com",
  projectId: "astute-impulse-447907-u1",
  storageBucket: "astute-impulse-447907-u1.firebasestorage.app",
  messagingSenderId: "531778193935",
  appId: "1:531778193935:web:4125d2c951dc35df7ff17a"
};
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  // DOM elements
  const registerForm = document.getElementById('register-form');
  const messageDiv = document.getElementById('message');
  
  // Backend API URL (your App Engine URL)
  const API_URL = 'http://localhost:8080'; // e.g., 'https://your-project-id.uc.r.appspot.com'
  
  // Function to display messages
  function showMessage(message, isError = false) {
    messageDiv.textContent = message;
    messageDiv.className = isError ? 'alert alert-danger' : 'alert alert-success';
    setTimeout(() => {
      messageDiv.textContent = '';
      messageDiv.className = '';
    }, 3000);
  }
  
  // Handle registration
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    try {
      // Create user with Firebase Auth
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      
      // Get the ID token from Firebase
      const idToken = await user.getIdToken();
      
      // Send user data to backend for storage in your cloud datastore
      const response = await fetch(`${API_URL}/store_user_data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          uid: user.uid,
          email: email,
          name: name,
          registrationTime: new Date().toISOString()
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to store user data');
      }
      
      showMessage('Registration successful! Please proceed to login.');
      registerForm.reset();
    } catch (error) {
      console.error('Registration error:', error);
      showMessage(error.message, true);
    }
  });
  

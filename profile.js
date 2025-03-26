// Firebase configuration (replace with your config)
const firebaseConfig = {
    apiKey: "AIzaSyDZmtXW8JjPzu-OYZLzzRNIpeiWW6BO1Qg",
    authDomain: "lab5-afa1c.firebaseapp.com",
    projectId: "lab5-afa1c",
    storageBucket: "lab5-afa1c.appspot.com",
    messagingSenderId: "428223976034",
    appId: "1:428223976034:web:a898613a17cb550752f73b"
  };
  
  // Initialize Firebase (if not already initialized)
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  // DOM elements
  const userName = document.getElementById('user-name');
  const userEmail = document.getElementById('user-email');
  const registrationDate = document.getElementById('registration-date');
  const logoutButton = document.getElementById('logout-button');
  const messageDiv = document.getElementById('message');
  
  // Backend API URL (your deployed backend URL)
  const API_URL = 'http://localhost:8080'; // e.g., 'https://your-project-id.uc.r.appspot.com'
  
  // Display message function
  function showMessage(message, isError = false) {
    messageDiv.textContent = message;
    messageDiv.className = isError ? 'alert alert-danger' : 'alert alert-success';
    setTimeout(() => {
      messageDiv.textContent = '';
      messageDiv.className = '';
    }, 3000);
  }
  
  // Check authentication state and fetch user data
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      // User is logged in; get their ID token
      const idToken = await user.getIdToken();
  
      try {
        // Fetch user data from your backend
        const response = await fetch(`${API_URL}/get_user_data`, {
          headers: {
            'Authorization': `Bearer ${idToken}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const userData = await response.json();
        
        // Populate the profile page with user data
        userName.textContent = userData.name || 'User';
        userEmail.textContent = userData.email;
        
        // Convert the registration timestamp to a readable date
        const date = new Date(userData.registrationTime);
        registrationDate.textContent = date.toLocaleString();
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        showMessage('Error loading profile: ' + error.message, true);
      }
    } else {
      // Redirect to login if the user is not authenticated
      window.location.href = "login.html";
    }
  });
  
  // Logout handling
  logoutButton.addEventListener('click', async () => {
    try {
      await auth.signOut();
      showMessage('Logged out successfully!');
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    } catch (error) {
      console.error('Logout error:', error);
      showMessage(error.message, true);
    }
  });
  
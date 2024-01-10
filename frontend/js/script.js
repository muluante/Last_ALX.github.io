// script js
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
  
    // Get the form data
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;
  
    // Perform client-side validation
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }
  
    // Create an object with the form data
    var userData = {
      username: username,
      email: email,
      password: password
    };
  
    // Send an AJAX POST request to the server
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/signup');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Registration successful
        alert('User registered successfully!');
        // Clear the form inputs
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('confirm-password').value = '';
      } else {
        // Registration failed
        alert('An error occurred. Please try again.');
        console.error('Error:', xhr.responseText);
      }
    };
    xhr.send(JSON.stringify(userData));
  });
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
  
    if (registerForm) {
      registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
  
        try {
          const res = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
          });
  
          const data = await res.json();
          if (res.ok) {
            console.log('User registered:', data);
            document.getElementById('message').innerText = 'User registered successfully. Redirecting to login...';
            setTimeout(() => {
              window.location.href = 'login.html';
            }, 2000); // Redirect after 2 seconds
          } else {
            console.log('Registration failed:', data);
            document.getElementById('message').innerText = data.msg;
          }
        } catch (err) {
          console.error('Error:', err);
          document.getElementById('message').innerText = 'An error occurred. Please try again.';
        }
      });
    } else {
      console.error('Register form not found');
    }
  });
  


  document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
  
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;
  
        try {
          const res = await fetch('http://localhost:3000/api/auth/login', {  // Ensure the correct port here
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, role }),
          });
  
          const data = await res.json();
          if (res.ok) {
            localStorage.setItem('token', data.token);
            alert('Login successful');
            if (role === 'admin') {
              window.location.href = 'admin.html';
            } else {
              window.location.href = 'complaint.html';
            }
          } else {
            alert(data.msg);
          }
        } catch (err) {
          console.error('Error:', err);
          document.getElementById('message').innerText = 'An error occurred. Please try again.';
        }
      });
    } else {
      console.error('Login form not found');
    }
  });
  
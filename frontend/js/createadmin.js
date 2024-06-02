document.addEventListener('DOMContentLoaded', () => {
    const adminForm = document.getElementById('adminForm');
  
    if (adminForm) {
      adminForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
  
        try {
          const res = await fetch('http://localhost:3000/api/admin/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
          });
  
          const data = await res.json();
          if (res.ok) {
            console.log('Admin created:', data);
            document.getElementById('message').innerText = 'Admin created successfully. Redirecting to login...';
            setTimeout(() => {
              window.location.href = 'login.html';
            }, 2000); // Redirect after 2 seconds
          } else {
            console.log('Creation failed:', data);
            document.getElementById('message').innerText = data.msg;
          }
        } catch (err) {
          console.error('Error:', err);
          document.getElementById('message').innerText = 'An error occurred. Please try again.';
        }
      });
    } else {
      console.error('Admin form not found');
    }
  });
  
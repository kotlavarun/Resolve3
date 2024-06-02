document.getElementById('complaintForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;
    const issue = document.getElementById('issue').value;
    const address = document.getElementById('address').value;
  
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      window.location.href = 'login.html';
      return;
    }
  
    const res = await fetch('http://localhost:3000/api/complaints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name, number, issue, address }),
    });
  
    const data = await res.json();
    if (res.ok) {
      alert('Complaint submitted successfully');
    } else {
      alert(data.msg);
    }
  });
  
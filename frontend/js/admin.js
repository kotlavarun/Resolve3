document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      window.location.href = 'login.html';
      return;
    }
  
    const res = await fetch('http://localhost:3000/api/complaints', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    const complaints = await res.json();
    if (res.ok) {
      const complaintsList = document.getElementById('complaintsList');
      complaintsList.innerHTML = complaints.map(complaint => `
        <div>
          <h3>${complaint.issue}</h3>
          <p>${complaint.name} - ${complaint.number}</p>
          <p>${complaint.address}</p>
          <p>Status: ${complaint.status}</p>
          <p>Response: ${complaint.response}</p>
          <textarea id="response-${complaint._id}"></textarea>
          <button onclick="respondToComplaint('${complaint._id}')">Respond</button>
        </div>
      `).join('');
    } else {
      alert('Failed to load complaints');
    }
  });
  
  async function respondToComplaint(complaintId) {
    const response = document.getElementById(`response-${complaintId}`).value;
  
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/api/complaints/respond', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ complaintId, response }),
    });
  
    const data = await res.json();
    if (res.ok) {
      alert('Response submitted successfully');
      window.location.reload();
    } else {
      alert(data.msg);
    }
  }
  
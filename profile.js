
  const token = localStorage.getItem('token');

  if (!token) {
    alert("You are not logged in");
    window.location.href = '/client/login.html';
  }

  fetch('http://localhost:5000/api/auth/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => {
    if (!res.ok) throw new Error("Unauthorized");
    return res.json();
  })
  .then(user => {
    // ✅ Display user data in HTML
    document.getElementById('username').innerText = user.username;
    document.getElementById('email').innerText = user.email;
    document.getElementById('role').innerText = user.role || 'User';
  })
  .catch(err => {
    console.error('Fetch profile failed:', err);
    alert("Session expired. Please login again.");
    localStorage.removeItem('token');
    window.location.href = '/client/login.html';
  });

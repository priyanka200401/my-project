document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;

  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (res.ok) {
    alert('Login successful!');
    localStorage.setItem('token', data.token); // ✅ store JWT
    window.location.href = '/dashboard.html';  // ✅ redirect
  } else {
    alert(data.message || 'Login failed!');
  }
});


//register

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name?.value;
    const email = form.email.value;
    const password = form.password.value;

    // Detect if it's register or login form
    const isRegister = window.location.pathname.includes('register');

    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert(isRegister ? 'Registration successful!' : 'Login successful!');
        window.location.href = isRegister ? '/login.html' : '/dashboard.html';
      } else {
        alert(data.message || 'An error occurred');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  });
});





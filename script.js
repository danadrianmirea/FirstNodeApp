// Fetch existing users and display them
async function fetchUsers() {
  try {
    const response = await fetch('http://localhost:3000/api/users');
    const users = await response.json();

    const tableBody = document.querySelector('#usersTable tbody');
    tableBody.innerHTML = ''; // Clear current table content

    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${user.name}</td><td>${user.email}</td>`;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// Add new user to the database
async function addUser(event) {
  event.preventDefault();

  const name = document.getElementById('userName').value;
  const email = document.getElementById('userEmail').value;

  try {
      const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });

    if (response.ok) {
      fetchUsers(); // Refresh the table
      document.getElementById('addUserForm').reset(); // Clear the form
    } else {
      alert('Error adding user');
    }
  } catch (error) {
    console.error('Error adding user:', error);
  }
}

// Set up form submission
document.getElementById('addUserForm').addEventListener('submit', addUser);

// Initially fetch and display users
fetchUsers();

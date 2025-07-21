// Dummy list of users (static)
let users = [
  { name: "Priya Patel", email: "priya@gmail.com", isAdmin: false },
  { name: "Raj Mehta", email: "raj@gmail.com", isAdmin: true },
  { name: "Anjali Sharma", email: "anjali@gmail.com", isAdmin: false },
];

function renderUsers() {
  const tbody = document.querySelector("#userTable tbody");
  tbody.innerHTML = "";

  users.forEach((user, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.isAdmin ? "Yes" : "No"}</td>
      <td>
        <button class="action-btn delete-btn" onclick="deleteUser(${index})">Delete</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

function deleteUser(index) {
  const confirmDelete = confirm("Are you sure you want to delete this user?");
  if (confirmDelete) {
    users.splice(index, 1);
    renderUsers();
  }
}

renderUsers();

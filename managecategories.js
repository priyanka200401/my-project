let categories = ["Electronics", "Clothing", "Home Decor"];

function renderCategories() {
  const tableBody = document.querySelector("#categoryTable tbody");
  tableBody.innerHTML = "";

  categories.forEach((cat, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td contenteditable="true" onblur="editCategory(${index}, this.innerText)">${cat}</td>
      <td>
        <button class="action-btn edit-btn" onclick="editPrompt(${index})">Edit</button>
        <button class="action-btn delete-btn" onclick="deleteCategory(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

document.getElementById("addCategoryForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.getElementById("categoryName");
  const name = input.value.trim();

  if (name !== "") {
    categories.push(name);
    input.value = "";
    renderCategories();
  }
});

function editPrompt(index) {
  const newName = prompt("Edit category name:", categories[index]);
  if (newName && newName.trim() !== "") {
    categories[index] = newName.trim();
    renderCategories();
  }
}

function editCategory(index, newName) {
  if (newName.trim() !== "") {
    categories[index] = newName.trim();
  }
}

function deleteCategory(index) {
  if (confirm("Are you sure you want to delete this category?")) {
    categories.splice(index, 1);
    renderCategories();
  }
}

renderCategories();

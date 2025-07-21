document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");
  const list = document.getElementById("productList");

  // Load existing products from localStorage
  const products = JSON.parse(localStorage.getItem("products")) || [];

  // Render initial list
  renderProducts(products);

  // Add new product
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("productName").value;
    const price = parseFloat(document.getElementById("productPrice").value);

    if (!name || isNaN(price)) return;

    const newProduct = { name, price };
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts(products);

    form.reset();
  });

  function renderProducts(products) {
    list.innerHTML = "";
    products.forEach((product, index) => {
      const li = document.createElement("li");
      li.innerHTML = `${product.name} - ₹${product.price.toFixed(2)} 
        <button onclick="deleteProduct(${index})">Delete</button>`;
      list.appendChild(li);
    });
  }

  // Expose delete function globally
  window.deleteProduct = function(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts(products);
  };
});
const newProduct = {
  name,
  price,
  image: getRandomImage()  // Auto-set image
};

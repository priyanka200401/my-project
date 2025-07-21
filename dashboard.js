
fetch('http://localhost:5000/api/products');


function displayProducts(filtered = products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.onclick = () => showProductDetails(product);

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <p>${product.rating} ★</p>
      <p>Brand: ${product.brand}</p>
    `;

    container.appendChild(card);
  });
}


function filterCategory(cat) {
  const result = cat === "All" ? products : products.filter(p => p.category === cat);
  displayProducts(result);
}
function displayProducts(filtered = products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.onclick = () => showProductDetails(product);

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <p>${product.rating} ★</p>
      <p>Brand: ${product.brand}</p>
    `;

    container.appendChild(card);
  });
}
function showProductDetails(product) {
  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalTitle").textContent = product.name;
  document.getElementById("modalPrice").textContent = `Price: ₹${product.price}`;
  document.getElementById("modalBrand").textContent = `Brand: ${product.brand}`;
  document.getElementById("modalRating").textContent = `Rating: ${product.rating} ★`;
  document.getElementById("modalDescription").textContent =
    product.description || "This is a top-rated product from our ShopSavvy collection.";

  document.getElementById("productModal").style.display = "block";
}

function closeModal() {
  document.getElementById("productModal").style.display = "none";
}
description: "Lightweight running shoes with breathable mesh and stylish design."


function applyFilters() {
  let brand = document.getElementById("brandFilter").value;
  let maxPrice = document.getElementById("priceFilter").value;
  let rating = document.getElementById("ratingFilter").value;

  document.getElementById("priceLabel").innerText = `Up to ₹${maxPrice}`;

  let filtered = products.filter(p =>
    (!brand || p.brand === brand) &&
    (!rating || p.rating >= parseFloat(rating)) &&
    p.price <= parseInt(maxPrice)
  );

  displayProducts(filtered);
}

window.onload = () => {
  displayProducts();
};


function addToCart(productId) {
  const item = products.find(p => p.id === productId);
  const existing = cart.find(p => p.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}



  const cartItemsDiv = document.getElementById("cartItems");
  cartItemsDiv.innerHTML = "";

  let total = 0;



  document.getElementById("cartTotal").textContent = total;

function toggleCart() {
  const cartSec = document.getElementById("cartSection");
  cartSec.style.display = cartSec.style.display === "none" ? "block" : "none";
}

function changeQty(productId, delta) {
  const item = cart.find(p => p.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(p => p.id !== productId);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}
window.onload = () => {
  displayProducts();
};
function logout() {
  localStorage.removeItem("isLoggedIn"); // clear login
  window.location.href = "login.html";   // redirect to login
}
function goToProfile() {
  window.location.href = "profile.html";  // Redirect to profile page
}
function orderNow(id) {
  const product = products.find(p => p.id === id);
  localStorage.setItem("orderProduct", JSON.stringify(product));
  window.location.href = "order.html";
}
let card = document.createElement('div');
card.classList.add('product-card');
card.innerHTML = `
  <button onclick="addToCart(${JSON.stringify()})">Add to Cart</button>
`;
document.getElementById('products-container').appendChild(card);


let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product) {
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert("✅ Product added to cart!");
}

function orderNow(id) {
  const product = products.find(p => p.id === id);
  localStorage.setItem("orderProduct", JSON.stringify(product));
  window.location.href = "order.html";
}
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("show");
}

function logout() {
  localStorage.clear();
  alert("Logged out successfully.");
  window.location.href = "login.html"; // Change this if needed
}
function buyProduct(productId) {
  const product = products.find(p => p.id === productId);

  // Save product to localStorage
  localStorage.setItem("cartProduct", JSON.stringify(product));

  // Redirect to cart page
  window.location.href = "card.html";
}
  function goToCart() {
    window.location.href = "card.html";
  }
 // ✅ Load user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      document.getElementById("userName").textContent = user.name;
    } else {
      // If no user, redirect to login
      window.location.href = "login.html";
    }

    function logout() {
      localStorage.removeItem("user");
      window.location.href = "login.html";
    }
    function addToCart(index) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products[index];

  // Save selected product to localStorage for payment
  localStorage.setItem("selectedProduct", JSON.stringify(product));

  // Redirect to payment page
  window.location.href = "payment.html";
}
function buyProduct(productId) {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Please log in to continue.');
    window.location.href = '/client/login.html';
    return;
  }

  const product = products.find(p => p.id === productId);
  if (!product) {
    alert('Product not found');
    return;
  }

  let products = [];

window.onload = () => {
  fetch('http://localhost:5000/api/products')
    .then(res => {
      if (!res.ok) throw new Error("❌ Failed to fetch products.");
      return res.json();
    })
    .then(data => {
      products = data;
      displayProducts(products); // ✅ pass product list here
    })
    .catch(err => {
      console.error("Fetch error:", err);
      document.getElementById("products").innerHTML = "<p>❌ Could not load products.</p>";
    });
};

    body: JSON.stringify(product)
  }
  then(res => {
    if (!res.ok) throw new Error('Buy failed');
    return res.json();
  })
  .then(data => {
    alert('✅ Product purchased successfully!');
    // optionally redirect: window.location.href = "/client/order-summary.html";
  })
  .catch(err => {
    console.error('Buy error:', err);
    alert('❌ Failed to buy product.');
  });


async function buyProduct(productId, quantity) {
  const userId = localStorage.getItem('userId'); // Get user ID from localStorage/session

  const res = await fetch('/api/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, productId, quantity })
  });

  const data = await res.json();
  if (res.ok) {
    alert('Order placed successfully!');
  } else {
    alert('Error: ' + data.message);
  }
}

fetch('/api/wishlist')
  .then(res => {
    if (!res.ok) throw new Error('Network response was not OK');
    return res.json(); // this line throws error if the response is HTML
  })
  .then(data => console.log(data))
  .catch(err => console.error('Fetch error:', err));



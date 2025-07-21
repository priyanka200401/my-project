const token = localStorage.getItem('token');

fetch('/api/purchase/my', {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
.then(res => res.json())
.then(orders => {
  const container = document.getElementById('orders-container');
  if (orders.length === 0) {
    container.innerHTML = '<p>No orders yet.</p>';
    return;
  }

  container.innerHTML = orders.map(order => `
    <div class="order-card">
      <img src="${order.productId.image}" alt="${order.productId.name}" width="100" />
      <h3>${order.productId.name}</h3>
      <p>₹${order.productId.price}</p>
      <p>Purchased on: ${new Date(order.date).toLocaleString()}</p>
    </div>
  `).join('');
});
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

fetch(`/api/products/${productId}`)
function buyNow(productId) {
  window.location.href = `/client/buy.html?id=${productId}`;
}

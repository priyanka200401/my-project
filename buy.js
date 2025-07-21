document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  const token = localStorage.getItem('token');

  if (!productId) {
    document.getElementById('buy-container').innerHTML = "<p>❌ No product ID found in URL.</p>";
    return;
  }

    document.getElementById('buy-container').innerHTML = `
      <div class="product-card">
        <div class="details">
        </div>
      </div>
    `;
  })

function placeOrder(productId) {
  alert(`✅ Order placed for product ID: ${productId}`);
  // You can implement actual order API logic here.
}

async function placeOrder(productId) {
  const token = localStorage.getItem('token');

  if (!token) {
    alert("❗ Please login to place an order.");
    return;
  }

  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId, quantity: 1 })
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Order placed successfully!");
      window.location.href = '/client/orders.html';
    } else {
      alert("❌ Failed to place order: " + (data.message || "Unknown error"));
    }
  } catch (err) {
    console.error("Order error:", err);
    alert("❌ Network error while placing order");
  }
}

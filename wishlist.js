async function addToWishlist(productId) {
 const token = localStorage.getItem('token');
if (!token) {
  alert("❗ Please login first.");
  window.location.href = "/client/login.html";
  return;
}

fetch('/api/wishlist', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})

 fetch('/api/wishlist')
 {

    const data = await res.json();

    if (res.ok) {
      alert("✅ Product added to your wishlist!");
    } else if (res.status === 400 && data.message === "Already in wishlist") {
      alert("⚠️ Product is already in your wishlist.");
    } else {
      alert("❌ " + (data.error || data.message || "Something went wrong"));
    }
  }
}

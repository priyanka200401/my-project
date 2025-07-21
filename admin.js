document.addEventListener("DOMContentLoaded", () => {
  console.log("Admin dashboard loaded");

  // Check if stats are already in localStorage
  let stats = JSON.parse(localStorage.getItem("dashboardStats"));

  if (!stats) {
    // If not, generate and save new mock data
    stats = {
      totalProducts: getRandomInt(100, 200),
      totalOrders: getRandomInt(50, 100),
      totalUsers: getRandomInt(30, 80),
      monthlySales: getRandomInt(100000, 200000)
    };
    localStorage.setItem("dashboardStats", JSON.stringify(stats));
  }
  

  // Update UI
  updateDashboard(stats);
});

function updateDashboard(stats) {
  document.getElementById("productCount").textContent = stats.totalProducts;
  document.getElementById("orderCount").textContent = stats.totalOrders;
  document.getElementById("userCount").textContent = stats.totalUsers;
  document.getElementById("salesCount").textContent = `₹${stats.monthlySales.toLocaleString()}`;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

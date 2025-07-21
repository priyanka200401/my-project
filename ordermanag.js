const orders = JSON.parse(localStorage.getItem("orders")) || [
  {
    id: "ORD001",
    user: "Priya Shah",
    product: "Wireless Earbuds",
    total: "₹2,199",
    status: "Pending",
    deliveryDate: "2025-07-15"
  },
  {
    id: "ORD002",
    user: "Ravi Patel",
    product: "Smart Watch",
    total: "₹3,499",
    status: "Shipped",
    deliveryDate: "2025-07-14"
  }
];

const tableBody = document.querySelector("#orderTable tbody");

function renderOrders() {
  tableBody.innerHTML = "";
  orders.forEach((order, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.user}</td>
      <td>${order.product}</td>
      <td>${order.total}</td>
      <td>
        <select onchange="updateStatus(${index}, this.value)">
          <option value="Pending" ${order.status === "Pending" ? "selected" : ""}>Pending</option>
          <option value="Shipped" ${order.status === "Shipped" ? "selected" : ""}>Shipped</option>
          <option value="Delivered" ${order.status === "Delivered" ? "selected" : ""}>Delivered</option>
          <option value="Cancelled" ${order.status === "Cancelled" ? "selected" : ""}>Cancelled</option>
        </select>
      </td>
      <td>
        <input type="date" value="${order.deliveryDate}" onchange="updateDeliveryDate(${index}, this.value)" />
      </td>
      <td>
        <button onclick="saveOrder(${index})">Save</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function updateStatus(index, newStatus) {
  orders[index].status = newStatus;
}

function updateDeliveryDate(index, newDate) {
  orders[index].deliveryDate = newDate;
}

function saveOrder(index) {
  localStorage.setItem("orders", JSON.stringify(orders));
  alert("Order updated successfully!");
}

renderOrders();

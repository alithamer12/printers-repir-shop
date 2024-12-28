// customers.js
document.addEventListener("DOMContentLoaded", function () {
  const customerForm = document.getElementById("customerForm");
  const customerList = document.getElementById("customerList");
  const searchInput = document.getElementById("searchCustomer");

  // Load existing customers
  loadCustomers();

  // Form submission handler
  customerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const customerData = {
      id: Date.now(), // Simple way to generate unique ID
      name: document.getElementById("customerName").value,
      phone: document.getElementById("phoneNumber").value,
      email: document.getElementById("email").value,
      address: document.getElementById("address").value,
      company: document.getElementById("company").value,
      notes: document.getElementById("notes").value,
      dateAdded: new Date().toISOString(),
    };

    saveCustomer(customerData);
    addCustomerToList(customerData);
    customerForm.reset();
  });

  // Search functionality
  searchInput.addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const customers = document.querySelectorAll(".customer-card");

    customers.forEach((customer) => {
      const customerName = customer
        .querySelector("h3")
        .textContent.toLowerCase();
      const customerCompany = customer
        .querySelector(".company")
        .textContent.toLowerCase();

      if (
        customerName.includes(searchTerm) ||
        customerCompany.includes(searchTerm)
      ) {
        customer.style.display = "";
      } else {
        customer.style.display = "none";
      }
    });
  });
});

function saveCustomer(customerData) {
  // Get existing customers from localStorage
  let customers = JSON.parse(localStorage.getItem("customers") || "[]");
  customers.push(customerData);
  localStorage.setItem("customers", JSON.stringify(customers));
}

function loadCustomers() {
  const customers = JSON.parse(localStorage.getItem("customers") || "[]");
  customers.forEach((customer) => addCustomerToList(customer));
}

function addCustomerToList(customerData) {
  const customerCard = document.createElement("div");
  customerCard.className = "customer-card";
  customerCard.dataset.id = customerData.id;

  customerCard.innerHTML = `
        <h3>${customerData.name}</h3>
        <p class="company">${customerData.company || "No company"}</p>
        <p>${customerData.phone}</p>
        <p>${customerData.email || "No email"}</p>
        <div class="customer-actions">
            <button class="action-btn edit-btn" onclick="editCustomer(${
              customerData.id
            })">Edit</button>
            <button class="action-btn delete-btn" onclick="deleteCustomer(${
              customerData.id
            })">Delete</button>
        </div>
    `;

  customerList.prepend(customerCard);
}

function editCustomer(customerId) {
  const customers = JSON.parse(localStorage.getItem("customers") || "[]");
  const customer = customers.find((c) => c.id === customerId);

  if (customer) {
    // Fill the form with customer data
    document.getElementById("customerName").value = customer.name;
    document.getElementById("phoneNumber").value = customer.phone;
    document.getElementById("email").value = customer.email;
    document.getElementById("address").value = customer.address;
    document.getElementById("company").value = customer.company;
    document.getElementById("notes").value = customer.notes;

    // Remove the old customer
    deleteCustomer(customerId);

    // Scroll to form
    document
      .querySelector(".customer-form-section")
      .scrollIntoView({ behavior: "smooth" });
  }
}

function deleteCustomer(customerId) {
  if (confirm("Are you sure you want to delete this customer?")) {
    let customers = JSON.parse(localStorage.getItem("customers") || "[]");
    customers = customers.filter((c) => c.id !== customerId);
    localStorage.setItem("customers", JSON.stringify(customers));

    const customerCard = document.querySelector(
      `.customer-card[data-id="${customerId}"]`
    );
    if (customerCard) {
      customerCard.remove();
    }
  }
}

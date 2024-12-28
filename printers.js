// printers.js
document.addEventListener("DOMContentLoaded", function () {
  const printerForm = document.getElementById("printerForm");
  const printerList = document.getElementById("printerList");
  const searchInput = document.getElementById("searchPrinter");

  // Load existing printers
  loadPrinters();

  // Form submission handler
  printerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const printerData = {
      id: Date.now(),
      model: document.getElementById("printerModel").value,
      serialNumber: document.getElementById("serialNumber").value,
      brand: document.getElementById("brand").value,
      type: document.getElementById("type").value,
      customerName: document.getElementById("customerName").value,
      purchaseDate: document.getElementById("purchaseDate").value,
      warranty: document.getElementById("warranty").value,
      notes: document.getElementById("notes").value,
      dateAdded: new Date().toISOString(),
    };

    savePrinter(printerData);
    addPrinterToList(printerData);
    printerForm.reset();
  });

  // Search functionality
  searchInput.addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const printers = document.querySelectorAll(".printer-card");

    printers.forEach((printer) => {
      const model = printer.querySelector(".model").textContent.toLowerCase();
      const serial = printer.querySelector(".serial").textContent.toLowerCase();
      const customer = printer
        .querySelector(".customer")
        .textContent.toLowerCase();

      if (
        model.includes(searchTerm) ||
        serial.includes(searchTerm) ||
        customer.includes(searchTerm)
      ) {
        printer.style.display = "";
      } else {
        printer.style.display = "none";
      }
    });
  });
});

function savePrinter(printerData) {
  let printers = JSON.parse(localStorage.getItem("printers") || "[]");
  printers.push(printerData);
  localStorage.setItem("printers", JSON.stringify(printers));
}

function loadPrinters() {
  const printers = JSON.parse(localStorage.getItem("printers") || "[]");
  printers.forEach((printer) => addPrinterToList(printer));
}

function addPrinterToList(printerData) {
  const printerCard = document.createElement("div");
  printerCard.className = "printer-card";
  printerCard.dataset.id = printerData.id;

  const warrantyClass =
    printerData.warranty === "Under Warranty"
      ? "warranty-active"
      : "warranty-expired";

  printerCard.innerHTML = `
        <h3 class="model">${printerData.brand} ${printerData.model}</h3>
        <div class="printer-info">
            <p><span class="label">Serial:</span> <span class="serial">${
              printerData.serialNumber
            }</span></p>
            <p><span class="label">Type:</span> ${printerData.type}</p>
            <p><span class="label">Customer:</span> <span class="customer">${
              printerData.customerName
            }</span></p>
            <p><span class="label">Purchase Date:</span> ${
              printerData.purchaseDate || "N/A"
            }</p>
            <p><span class="label">Warranty:</span> 
                <span class="status-badge ${warrantyClass}">${
    printerData.warranty
  }</span>
            </p>
        </div>
        <div class="printer-actions">
            <button class="action-btn edit-btn" onclick="editPrinter(${
              printerData.id
            })">Edit</button>
            <button class="action-btn delete-btn" onclick="deletePrinter(${
              printerData.id
            })">Delete</button>
        </div>
    `;

  printerList.prepend(printerCard);
}

function editPrinter(printerId) {
  const printers = JSON.parse(localStorage.getItem("printers") || "[]");
  const printer = printers.find((p) => p.id === printerId);

  if (printer) {
    // Fill the form with printer data
    document.getElementById("printerModel").value = printer.model;
    document.getElementById("serialNumber").value = printer.serialNumber;
    document.getElementById("brand").value = printer.brand;
    document.getElementById("type").value = printer.type;
    document.getElementById("customerName").value = printer.customerName;
    document.getElementById("purchaseDate").value = printer.purchaseDate;
    document.getElementById("warranty").value = printer.warranty;
    document.getElementById("notes").value = printer.notes;

    // Remove the old printer
    deletePrinter(printerId);

    // Scroll to form
    document
      .querySelector(".printer-form-section")
      .scrollIntoView({ behavior: "smooth" });
  }
}

function deletePrinter(printerId) {
  if (confirm("Are you sure you want to delete this printer?")) {
    let printers = JSON.parse(localStorage.getItem("printers") || "[]");
    printers = printers.filter((p) => p.id !== printerId);
    localStorage.setItem("printers", JSON.stringify(printers));

    const printerCard = document.querySelector(
      `.printer-card[data-id="${printerId}"]`
    );
    if (printerCard) {
      printerCard.remove();
    }
  }
}

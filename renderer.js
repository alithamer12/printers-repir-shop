// renderer.js

// Customer & Machine Info Section
const customerName = document.getElementById("customerName");
const machineModel = document.getElementById("machineModel");
const serialNumber = document.getElementById("serialNumber");
const createJobBtn = document.getElementById("createJobBtn");

// Technician Input Section
const problemDescription = document.getElementById("problemDescription");
const repairCost = document.getElementById("repairCost");
const updateJobBtn = document.getElementById("updateJobBtn");

// Repair Status Table
const repairTable = document.getElementById("repairTable");
const tableBody = repairTable.querySelector("tbody");

// Load existing repairs when the page loads
document.addEventListener("DOMContentLoaded", function () {
  loadRepairs();
  setupSearchFunctionality();
});

updateJobBtn.addEventListener("click", function () {
  // Create repair data object
  const repairData = {
    id: Date.now(), // Unique ID using timestamp
    customerName: customerName.value,
    machineModel: machineModel.value,
    serialNumber: serialNumber.value,
    status: "Pending",
    technician: "Unassigned",
    repairCost: repairCost.value || "-",
    problemDescription: problemDescription.value,
    dateCreated: new Date().toISOString(),
  };

  // Save to localStorage and update table
  saveRepair(repairData);
  addRepairToTable(repairData);

  // Clear the form
  clearForm();
});

function saveRepair(repairData) {
  // Get existing repairs from localStorage
  let repairs = JSON.parse(localStorage.getItem("repairs") || "[]");
  repairs.push(repairData);
  localStorage.setItem("repairs", JSON.stringify(repairs));
}

function loadRepairs() {
  const repairs = JSON.parse(localStorage.getItem("repairs") || "[]");
  // Clear existing table rows
  tableBody.innerHTML = "";
  // Add each repair to the table
  repairs.forEach((repair) => addRepairToTable(repair));
}

function addRepairToTable(repairData) {
  const newRow = tableBody.insertRow();
  newRow.dataset.id = repairData.id; // Add data-id attribute for later reference

  // Insert cells for each column
  const cells = [
    repairData.customerName,
    repairData.machineModel,
    repairData.serialNumber,
    repairData.status,
    repairData.technician,
    repairData.repairCost,
  ].map((text) => {
    const cell = newRow.insertCell();
    cell.textContent = text;
    return cell;
  });

  // Add action buttons
  const actionsCell = newRow.insertCell();
  actionsCell.innerHTML = `
        <button onclick="editRepair(${repairData.id})" class="edit-btn">Edit</button>
        <button onclick="deleteRepair(${repairData.id})" class="delete-btn">Delete</button>
    `;
}

function editRepair(repairId) {
  const repairs = JSON.parse(localStorage.getItem("repairs") || "[]");
  const repair = repairs.find((r) => r.id === repairId);

  if (repair) {
    // Fill the form with repair data
    customerName.value = repair.customerName;
    machineModel.value = repair.machineModel;
    serialNumber.value = repair.serialNumber;
    problemDescription.value = repair.problemDescription || "";
    repairCost.value = repair.repairCost !== "-" ? repair.repairCost : "";

    // Remove the old repair
    deleteRepair(repairId);

    // Scroll to form
    document
      .querySelector(".form-section")
      .scrollIntoView({ behavior: "smooth" });
  }
}

function deleteRepair(repairId) {
  if (confirm("Are you sure you want to delete this repair record?")) {
    // Remove from localStorage
    let repairs = JSON.parse(localStorage.getItem("repairs") || "[]");
    repairs = repairs.filter((repair) => repair.id !== repairId);
    localStorage.setItem("repairs", JSON.stringify(repairs));

    // Remove from table
    const row = tableBody.querySelector(`tr[data-id="${repairId}"]`);
    if (row) {
      row.remove();
    }
  }
}

function clearForm() {
  customerName.value = "";
  machineModel.value = "";
  serialNumber.value = "";
  problemDescription.value = "";
  repairCost.value = "";
}

function setupSearchFunctionality() {
  const searchInput = document.getElementById("repairSearch");
  const searchFilter = document.getElementById("searchFilter");

  function searchRepairs() {
    const searchTerm = searchInput.value.toLowerCase();
    const filterType = searchFilter.value;
    const rows = tableBody.getElementsByTagName("tr");

    for (let row of rows) {
      let text = "";
      let shouldShow = false;

      if (filterType === "all") {
        text = row.textContent.toLowerCase();
        shouldShow = text.includes(searchTerm);
      } else {
        // Get index based on filter type
        let cellIndex;
        switch (filterType) {
          case "customer":
            cellIndex = 0;
            break;
          case "model":
            cellIndex = 1;
            break;
          case "serial":
            cellIndex = 2;
            break;
          case "status":
            cellIndex = 3;
            break;
        }
        text = row.cells[cellIndex].textContent.toLowerCase();
        shouldShow = text.includes(searchTerm);
      }

      row.style.display = shouldShow ? "" : "none";
    }
  }

  // Add event listeners for search with debouncing
  const debouncedSearch = debounce(searchRepairs, 300);
  searchInput.addEventListener("input", debouncedSearch);
  searchFilter.addEventListener("change", searchRepairs);
}

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Add these styles to your CSS
const styles = `
    .edit-btn, .delete-btn {
        padding: 4px 8px;
        margin: 0 4px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .edit-btn {
        background-color: #ffd700;
        color: #333;
    }

    .delete-btn {
        background-color: #ff4444;
        color: white;
    }

    .edit-btn:hover {
        background-color: #ffcd00;
    }

    .delete-btn:hover {
        background-color: #ff0000;
    }
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

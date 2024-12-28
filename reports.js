// reports.js
document.addEventListener("DOMContentLoaded", function () {
  // Handle date range selection
  const dateRange = document.getElementById("dateRange");
  const customDateRange = document.getElementById("customDateRange");

  dateRange.addEventListener("change", function () {
    customDateRange.style.display = this.value === "custom" ? "block" : "none";
  });

  // Initialize the report preview area
  const reportContent = document.getElementById("reportContent");
});

function generateReport(type) {
  const reportContent = document.getElementById("reportContent");
  const dateRange = document.getElementById("dateRange").value;

  // Sample report generation logic
  switch (type) {
    case "repair-summary":
      generateRepairSummary(reportContent);
      break;
    case "revenue":
      generateRevenueReport(reportContent);
      break;
    case "customer-history":
      generateCustomerHistory(reportContent);
      break;
    case "technician":
      generateTechnicianReport(reportContent);
      break;
  }
}

function generateRepairSummary(container) {
  container.innerHTML = `
        <h3>Repair Summary Report</h3>
        <table class="report-table">
            <thead>
                <tr>
                    <th>Status</th>
                    <th>Count</th>
                    <th>Average Cost</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Completed</td>
                    <td>25</td>
                    <td>$150.00</td>
                </tr>
                <tr>
                    <td>In Progress</td>
                    <td>10</td>
                    <td>$175.00</td>
                </tr>
                <tr>
                    <td>Pending</td>
                    <td>5</td>
                    <td>--</td>
                </tr>
            </tbody>
        </table>
    `;
}

function generateRevenueReport(container) {
  container.innerHTML = `
        <h3>Revenue Report</h3>
        <div class="revenue-summary">
            <div class="revenue-item">
                <h4>Total Revenue</h4>
                <p>$5,750.00</p>
            </div>
            <div class="revenue-item">
                <h4>Average per Repair</h4>
                <p>$230.00</p>
            </div>
        </div>
    `;
}

function generateCustomerHistory(container) {
  // Add your customer history report generation logic here
  container.innerHTML = `
        <h3>Customer History Report</h3>
        <div class="customer-search">
            <input type="text" placeholder="Search customer...">
        </div>
        <!-- Add more customer history content -->
    `;
}

function generateTechnicianReport(container) {
  // Add your technician report generation logic here
  container.innerHTML = `
        <h3>Technician Performance Report</h3>
        <!-- Add technician performance metrics -->
    `;
}

const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

allSideMenu.forEach((item) => {
  const li = item.parentElement;

  item.addEventListener("click", function () {
    allSideMenu.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function () {
  sidebar.classList.toggle("hide");
});

const searchButton = document.querySelector(
  "#content nav form .form-input button"
);
const searchButtonIcon = document.querySelector(
  "#content nav form .form-input button .bx"
);
const searchForm = document.querySelector("#content nav form");

searchButton.addEventListener("click", function (e) {
  if (window.innerWidth < 576) {
    e.preventDefault();
    searchForm.classList.toggle("show");
    if (searchForm.classList.contains("show")) {
      searchButtonIcon.classList.replace("bx-search", "bx-x");
    } else {
      searchButtonIcon.classList.replace("bx-x", "bx-search");
    }
  }
});

if (window.innerWidth < 768) {
  sidebar.classList.add("hide");
} else if (window.innerWidth > 576) {
  searchButtonIcon.classList.replace("bx-x", "bx-search");
  searchForm.classList.remove("show");
}

window.addEventListener("resize", function () {
  if (this.innerWidth > 576) {
    searchButtonIcon.classList.replace("bx-x", "bx-search");
    searchForm.classList.remove("show");
  }
});

const switchMode = document.getElementById("switch-mode");

switchMode.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});

// render table

const toggleButtons = document.querySelectorAll(".toggle_btns button");
const pageSize = 25; // Number of entries to show per page
let currentPage = 1; // Current page number

// Function to render the table with the specified page
function renderTable(page) {
  const tableBody = document.querySelector("#studentTable tbody");

  tableBody.classList.add("table-bordered");

  // Calculate the start and end indices for the current page
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Clear existing table rows
  tableBody.innerHTML = "";

  // Iterate over the data and create table rows for the current page
  for (let i = startIndex; i < endIndex; i++) {
    if (i >= data.length) {
      break; // Exit the loop if end of data is reached
    }

    const student = data[i];
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.title}</td>
      <td>${truncateText(student.body, 50)}</td>
      <td>${student.userId}</td>
    `;
    tableBody.appendChild(row);
  }
}

// Function to truncate text to a specified length
function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

// Function to handle pagination buttons
function handlePagination(event) {
  const targetButton = event.target;

  if (targetButton.tagName === "BUTTON") {
    // Remove the active class from all buttons
    toggleButtons.forEach((button) => {
      button.classList.remove("active");
    });

    // Add the active class to the clicked button
    targetButton.classList.add("active");

    // Get the page number from the button's dataset
    const pageNumber = parseInt(targetButton.dataset.page);

    // Render the table with the specified page
    renderTable(pageNumber);

    // Update the current page
    currentPage = pageNumber;
  }
}

// Add event listener to the table container for handling pagination
document
  .getElementById("tableContainer")
  .addEventListener("click", handlePagination);

// Function to initialize the table and pagination
function initializeTable() {
  // Get the total number of pages
  const totalPages = Math.ceil(data.length / pageSize);

  // Create pagination buttons
  const paginationContainer = document.createElement("div");
  paginationContainer.classList.add("pagination-container");

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = "Page " + i;
    button.dataset.page = i;

    // Add the active class to the first page button
    if (i === 1) {
      button.classList.add("active");
    }

    paginationContainer.appendChild(button);
  }

  // Insert the pagination container before the table
  const tableContainer = document.getElementById("tableContainer");
  tableContainer.insertBefore(paginationContainer, tableContainer.firstChild);

  // Render the table with the initial page
  renderTable(currentPage);
}

// Call the fetchData function to populate the data from the API
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((jsonData) => {
    // Store the retrieved data
    data = jsonData;

    // Initialize the table and pagination
    initializeTable();
  })
  .catch((error) => {
    console.log("Error fetching data:", error);
  });

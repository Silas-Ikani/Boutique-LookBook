const PASSWORD = "boutique123"; // change this to whatever the boutique owner wants

// Elements
const loginScreen = document.getElementById("login-screen");
const adminPanel = document.getElementById("admin-panel");
const errorMsg = document.getElementById("login-error");
const itemForm = document.getElementById("item-form");
const itemsTable = document.querySelector("#items-table tbody");

// Login function
function login() {
  const input = document.getElementById("admin-pass").value;
  if (input === PASSWORD) {
    loginScreen.style.display = "none";
    adminPanel.style.display = "block";
    loadItems();
  } else {
    errorMsg.style.display = "block";
  }
}

// Load items from localStorage
function loadItems() {
  const items = JSON.parse(localStorage.getItem("lookbookItems")) || [];
  itemsTable.innerHTML = "";
  items.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.status}</td>
      <td>
        <button onclick="editItem(${index})">Edit</button>
        <button onclick="deleteItem(${index})">Delete</button>
      </td>
    `;
    itemsTable.appendChild(row);
  });
}

// Save item to localStorage
itemForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("item-name").value;
  const image = document.getElementById("item-image").value;
  const status = document.getElementById("item-status").value;
  const link = document.getElementById("item-link").value;

  const newItem = { name, image, status, link };
  const items = JSON.parse(localStorage.getItem("lookbookItems")) || [];

  items.push(newItem);
  localStorage.setItem("lookbookItems", JSON.stringify(items));

  itemForm.reset();
  loadItems();
});

// Delete item
function deleteItem(index) {
  const items = JSON.parse(localStorage.getItem("lookbookItems")) || [];
  items.splice(index, 1);
  localStorage.setItem("lookbookItems", JSON.stringify(items));
  loadItems();
}

// Edit item (loads values into form)
function editItem(index) {
  const items = JSON.parse(localStorage.getItem("lookbookItems")) || [];
  const item = items[index];

  document.getElementById("item-name").value = item.name;
  document.getElementById("item-image").value = item.image;
  document.getElementById("item-status").value = item.status;
  document.getElementById("item-link").value = item.link;

  deleteItem(index); // remove the original so the form resubmits as new
}

const PASSWORD = "boutique123"; // change this to whatever the boutique owner wants
const imageFileInput = document.getElementById("item-image");


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
      <td><img src="${item.image}" alt="${item.name}" style="max-width: 100px;" /></td>
      <td>${item.name}</td>
      <td>${item.status}</td>
      <td>
        <a href="${item.link}" target="_blank">Order</a>
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
  const status = document.getElementById("item-status").value;
  const link = document.getElementById("item-link").value;

  const file = imageFileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const image = e.target.result; // base64 string
      saveItem({ name, image, status, link });
    };
    reader.readAsDataURL(file);
  } else {
    const image = imageFileInput.value.trim();
    saveItem({ name, image, status, link });
  }
});

function saveItem(newItem) {
  const items = JSON.parse(localStorage.getItem("lookbookItems")) || [];
  items.push(newItem);
  localStorage.setItem("lookbookItems", JSON.stringify(items));
  itemForm.reset();
  imagePreview.style.display = "none";
  imagePreview.src = "";
  loadItems();
}



// Delete item
function deleteItem(index) {
  const items = JSON.parse(localStorage.getItem("lookbookItems")) || [];
  items.splice(index, 1);
  localStorage.setItem("lookbookItems", JSON.stringify(items));
  loadItems();
}

// Edit item (loads values back into the form)
function editItem(index) {
  const items = JSON.parse(localStorage.getItem("lookbookItems")) || [];
  const item = items[index];

  document.getElementById("item-name").value = item.name;
  document.getElementById("item-image").value = item.image;
  document.getElementById("item-status").value = item.status;
  document.getElementById("item-link").value = item.link;

  deleteItem(index); // remove the original so the form resubmits as new
}

// Live image preview
const imageInput = document.getElementById("item-image");
const imagePreview = document.getElementById("image-preview");

imageInput.addEventListener("input", () => {
  const url = imageInput.value.trim();
  if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
    imagePreview.src = url;
    imagePreview.style.display = "block";
  } else {
    imagePreview.style.display = "none";
  }
});

// Image file upload preview (for file uploads instead of URL input)

if (imageFileInput.type === "file") {
  imageFileInput.addEventListener("change", function () {
    const file = imageFileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = "block";

      // Temporarily store image in memory
      imageFileInput.dataset.base64 = e.target.result;
    };
    reader.readAsDataURL(file);
  });

  // Override form submit only if file input is active
  itemForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("item-name").value;
    const image =
      imageFileInput.dataset.base64 || document.getElementById("item-image").value;
    const status = document.getElementById("item-status").value;
    const link = document.getElementById("item-link").value;

    const newItem = { name, image, status, link };
    const items = JSON.parse(localStorage.getItem("lookbookItems")) || [];

    items.push(newItem);
    localStorage.setItem("lookbookItems", JSON.stringify(items));

    itemForm.reset();
    imagePreview.style.display = "none";
    imagePreview.src = "";
    delete imageFileInput.dataset.base64;

    loadItems();
  });
}

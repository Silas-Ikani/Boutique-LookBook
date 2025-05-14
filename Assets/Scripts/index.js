// Replace this later with real JSON or API
const inventoryItems = JSON.parse(localStorage.getItem("lookbookItems")) || [
  {
    name: "T-Shirt",
    image: "Assets/Img/Gray T-Shirt Display.jpeg",
    status: "in-stock",
    link: "https://wa.me/2347052814252?text=I'm%20interested%20in%20the%20Gray%20T-Shirt"
  },
  {
    name: "White Hoodie",
    image: "Assets/Img/Minimalist White Hoodie.jpeg",
    status: "low-stock",
    link: "https://wa.me/2348000000000?text=I'd%20like%20to%20order%20the%20White%20Hoodie"
  },
  {
    name: "Sneakers...",
    image: "Assets/Img/White Sneakers.jpg",
    status: "sold-out",
    link: "#"
  }
];

// Status styling
const statusLabels = {
  "in-stock": { text: "In Stock", class: "in-stock" },
  "low-stock": { text: "Low Stock", class: "low-stock" },
  "sold-out": { text: "Sold Out", class: "sold-out" }
};

const grid = document.getElementById("inventory-grid");

inventoryItems.forEach(item => {
  const status = statusLabels[item.status];

  const card = document.createElement("div");
  card.className = "col-sm-6 col-md-4";

  card.innerHTML = `
    <div class="lookbook-card p-3 h-100 d-flex flex-column">
      <img src="${item.image}" alt="${item.name}" class="mb-3 rounded" />
      <h5 class="fw-semibold">${item.name}</h5>
      <span class="status ${status.class} mb-2">${status.text}</span>
      <a href="${item.link}" target="_blank" class="btn btn-dark mt-auto" ${item.status === "sold-out" ? "disabled" : ""}>
        ${item.status === "sold-out" ? "Unavailable" : "Buy Now <i class='fab fa-whatsapp'></i>"}
      </a>
    </div>
  `;

  grid.appendChild(card);
});

document.addEventListener("DOMContentLoaded", function () {
  // Cache DOM elements
  const searchButton = document.getElementById("search-button");
  const searchForm = document.querySelector(".search-form");
  const menuButton = document.getElementById("menu");
  const navbarNav = document.querySelector(".navbar-nav");

  // Function to toggle search form
  function toggleSearchForm() {
    if (searchForm.style.display === "block") {
      searchForm.style.display = "none";
    } else {
      searchForm.style.display = "block";
    }
  }

  // Function to toggle mobile menu
  function toggleMobileMenu() {
    if (navbarNav.style.display === "block") {
      navbarNav.style.display = "none";
    } else {
      navbarNav.style.display = "block";
    }
  }

  // Event listeners for search button
  searchButton.addEventListener("click", function (e) {
    e.preventDefault();
    toggleSearchForm();
  });

  // Event listeners for menu button
  menuButton.addEventListener("click", function (e) {
    e.preventDefault();
    toggleMobileMenu();
  });

  // Close search form when clicking outside
  document.addEventListener("click", function (e) {
    if (!searchForm.contains(e.target) && e.target !== searchButton) {
      searchForm.style.display = "none";
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!navbarNav.contains(e.target) && e.target !== menuButton) {
      navbarNav.style.display = "none";
    }
  });
});

const menuItems = document.querySelectorAll(".menu-card");
const cartList = document.getElementById("cart-list");
const orderForm = document.getElementById("order-form");
const totalDisplay = document.getElementById("total-price");
const whatsappNumber = "6281804040684"; // Ganti dengan nomor WhatsApp yang sebenarnya (tanpa tanda +)
let totalPrice = 0; // Variabel untuk menyimpan total harga
const cartItems = {}; // Objek untuk menyimpan item keranjang

// Menambahkan event listener untuk setiap item menu
menuItems.forEach((item) => {
  const increaseButton = item.querySelector(".increase");
  const decreaseButton = item.querySelector(".decrease");
  const quantityDisplay = item.querySelector(".quantity");
  const itemName = item.querySelector(".menu-card-title").textContent;
  const itemPrice = parseInt(item.getAttribute("data-price")); // Mengambil harga dari atribut data-price

  // Event listener untuk tombol tambah
  increaseButton.addEventListener("click", function () {
    if (!cartItems[itemName]) {
      cartItems[itemName] = { price: itemPrice, quantity: 0 };
    }
    cartItems[itemName].quantity++;
    quantityDisplay.textContent = cartItems[itemName].quantity;
    updateCart();
  });

  // Event listener untuk tombol kurang
  decreaseButton.addEventListener("click", function () {
    if (cartItems[itemName] && cartItems[itemName].quantity > 0) {
      cartItems[itemName].quantity--;
      quantityDisplay.textContent = cartItems[itemName].quantity;
      if (cartItems[itemName].quantity === 0) {
        delete cartItems[itemName]; // Hapus item dari keranjang jika jumlahnya 0
      }
      updateCart();
    }
  });
});

// Fungsi untuk memperbarui keranjang dan total harga
function updateCart() {
  cartList.innerHTML = ""; // Kosongkan daftar keranjang
  totalPrice = 0; // Reset total harga

  for (const item in cartItems) {
    if (cartItems[item].quantity > 0) {
      const listItem = document.createElement("li");
      const itemTotalPrice = cartItems[item].price * cartItems[item].quantity;
      listItem.textContent = `${item} - IDR ${itemTotalPrice} (${cartItems[item].quantity})`;
      cartList.appendChild(listItem);
      totalPrice += itemTotalPrice; // Tambahkan harga item ke total
    }
  }

  totalDisplay.textContent = `Total: IDR ${totalPrice}`; // Menampilkan total
}

orderForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const items = Object.keys(cartItems)
    .map(
      (item) =>
        `${item} - IDR ${cartItems[item].price} x ${cartItems[item].quantity}`
    )
    .join("\n");

  const message = `Nama: ${name}\nEmail: ${email}\nNo HP: ${phone}\nAlamat: ${address}\n\nMenu Terpilih:\n${items}\n\nTotal: IDR ${totalPrice}`;

  // Debugging: Log the constructed URL to the console
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
  console.log(whatsappUrl);

  // Open the WhatsApp URL in a new tab
  window.open(whatsappUrl, "_blank");
});

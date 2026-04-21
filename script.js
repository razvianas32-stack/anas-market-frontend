// ─────────────── CART SETUP ───────────────

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart helper
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ─────────────── LOAD PRODUCTS ───────────────

async function loadProducts() {
  try {
    const res = await fetch("https://anas-market-backend.onrender.com/api/products");

    if (!res.ok) throw new Error("Server error");

    const data = await res.json();
    const container = document.getElementById("product-list");
    container.innerHTML = "";

    if (data.length === 0) {
      container.innerHTML = "<h2>No products available 😢</h2>";
      return;
    }

    data.forEach((item) => {
      container.innerHTML += `
        <div class="product">
          <img src="${item.image}" width="150">
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>
          <button onclick='addToCart(${JSON.stringify(item)})'>
            Add to Cart 🛒
          </button>
        </div>
      `;
    });

  } catch (err) {
    console.error(err);
    document.getElementById("product-list").innerHTML =
      "<h2>Backend connect nahi ho raha ❌</h2>";
  }
}

// ─────────────── ADD TO CART ───────────────

function addToCart(product) {
  const existing = cart.find(item => item._id === product._id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  renderCart();
  openCart();
}

// ─────────────── RENDER CART ───────────────

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");
  const cartCount = document.getElementById("cart-count");

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<li style='padding:1rem;color:#888'>Your cart is empty</li>";
    totalPrice.textContent = "0";
    cartCount.textContent = "0";
    return;
  }

  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    count += item.qty;

    cartItems.innerHTML += `
      <li class="cart-item">
        <div>
          <strong>${item.name}</strong> - ₹${item.price}
        </div>
        <div>
          <button onclick="changeQty(${index}, -1)">−</button>
          ${item.qty}
          <button onclick="changeQty(${index}, 1)">+</button>
          <button onclick="removeFromCart(${index})">🗑</button>
        </div>
      </li>
    `;
  });

  totalPrice.textContent = total;
  cartCount.textContent = count;
}

// ─────────────── UPDATE QTY ───────────────

function changeQty(index, delta) {
  cart[index].qty += delta;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
  renderCart();
}

// ─────────────── REMOVE ITEM ───────────────

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

// ─────────────── CART UI ───────────────

function openCart() {
  document.getElementById("cart-box").classList.add("open");
}

function toggleCart() {
  document.getElementById("cart-box").classList.toggle("open");
}

// ─────────────── INIT ───────────────

window.onload = () => {
  loadProducts();
  renderCart();
};
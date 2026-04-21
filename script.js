// Cart array — stores all added items
let cart = [];

// ── Load products from backend ──
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
          <button onclick="addToCart('${item.name}', ${item.price})">
            Add to Cart 🛒
          </button>
        </div>
      `;
    });

  } catch (err) {
    console.error("Error:", err);
    document.getElementById("product-list").innerHTML =
      "<h2>Backend connect nahi ho raha ❌</h2>";
  }
}

// ── Add item to cart ──
function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  renderCart();
  openCart();
}

// ── Render cart items in the sidebar ──
function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");
  const cartCount = document.getElementById("cart-count");

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<li style='padding:1rem 0;color:#888'>Your cart is empty</li>";
    totalPrice.textContent = "0";
    if (cartCount) cartCount.textContent = "0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    cartItems.innerHTML += `
      <li class="cart-item">
        <div class="cart-item-info">
          <span class="cart-item-name">${item.name}</span>
          <span class="cart-item-price">₹${item.price}</span>
        </div>
        <div class="cart-item-controls">
          <button onclick="changeQty(${index}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${index}, +1)">+</button>
          <button class="remove-btn" onclick="removeFromCart(${index})">🗑</button>
        </div>
      </li>
    `;
  });

  totalPrice.textContent = total;
  if (cartCount) cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
}

// ── Change item quantity ──
function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  renderCart();
}

// ── Remove item from cart ──
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

// ── Open cart ──
function openCart() {
  document.getElementById("cart-box").classList.add("open");
}

// ── Toggle cart open/close ──
function toggleCart() {
  document.getElementById("cart-box").classList.toggle("open");
}

// ── Close login box ──
function closeLogin() {
  document.getElementById("login-box").style.display = "none";
}

// ── Login function ──
function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  // Replace this with your real API call when ready
  // Example:
  // const res = await fetch("https://anas-market-backend.onrender.com/api/login", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ email, password })
  // });
  // const data = await res.json();
  // localStorage.setItem("token", data.token);

  alert("Login clicked — connect your backend API here");
}

// ── Start ──
loadProducts();
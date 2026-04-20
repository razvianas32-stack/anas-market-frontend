// 🛒 CART SYSTEM
let cart = [];

function addToCart(name, price) {
  cart.push({ name, price: Number(price) });
  updateCart();
}

function updateCart() {
  let cartItems = document.getElementById("cart-items");
  let cartCount = document.getElementById("cart-count");
  let totalPrice = document.getElementById("total-price");

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    let li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ₹${item.price} 
      <button onclick="removeItem(${index})">❌</button>
    `;
    cartItems.appendChild(li);
  });

  cartCount.innerText = cart.length;
  totalPrice.innerText = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function toggleCart() {
  let cartBox = document.getElementById("cart-box");
  cartBox.style.display =
    cartBox.style.display === "block" ? "none" : "block";
}

// 📦 LOAD PRODUCTS FROM BACKEND
async function loadProducts() {
  try {
    const res = await fetch("https://anas-market.onrender.com/api/products");

    if (!res.ok) {
      throw new Error("Server error");
    }

    const data = await res.json();

    let container = document.getElementById("product-list");
    container.innerHTML = "";

    // ❗ Agar koi product nahi hai
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
            Add to Cart
          </button>
        </div>
      `;
    });

    // 🔍 SEARCH FUNCTION
    document.getElementById("search").addEventListener("keyup", function () {
      let searchValue = this.value.toLowerCase();
      let products = document.querySelectorAll(".product");

      products.forEach((product) => {
        let name = product.querySelector("h3").innerText.toLowerCase();
        product.style.display = name.includes(searchValue) ? "block" : "none";
      });
    });

  } catch (err) {
    console.error("Error:", err);
    document.getElementById("product-list").innerHTML =
      "<h2>Backend connect nahi ho raha ❌</h2>";
  }
}

// 🚀 PAGE LOAD PE PRODUCTS LOAD
loadProducts();
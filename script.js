async function loadProducts() {
  try {
    const res = await fetch("https://anas-market-backend.onrender.com/api/products");

    if (!res.ok) {
      throw new Error("Server error");
    }

    const data = await res.json();

    let container = document.getElementById("product-list");
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
            Add to Cart
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
loadProducts();
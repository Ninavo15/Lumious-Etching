const cartCount = document.querySelector('.item-count');
const itemsList = document.querySelector('.items-list');
let cart = JSON.parse(localStorage.getItem('cart')) || [];
cartCount.textContent = cart.length;

// Check if we're on the product_info.html page
const isProductInfoPage = window.location.pathname.includes("product_info.html");
if (isProductInfoPage) {
  const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
  if (selectedProduct) {
    const productCard = document.createElement("div");
    productCard.classList.add("item", "option");
    productCard.setAttribute("role", "region");
    productCard.setAttribute("aria-label", `${selectedProduct.h2}, ${selectedProduct.h3}, ${selectedProduct.h4}`);
productCard.innerHTML = `
  <div class="image-container">
    <img src="${selectedProduct.img}" alt="${selectedProduct.alt || "Selected product image"}">
  </div>
  <div class="product-details">
    <h2>${selectedProduct.h2}</h2>
    <div class="rating" aria-label="Rated 5 out of 5 stars">★★★★★ <span style="font-size:1rem;">(5.0)</span></div>
    <h3>${selectedProduct.h3}</h3>
    <p class="description">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam laborum aut explicabo molestias voluptas.
    </p>
    <div class="product-price"><strong>Price:</strong> ${selectedProduct.h4}</div>
    
    <div class="quantity-control" role="group" aria-label="Quantity selector">
      <label for="quantity">Quantity</label>
      <div class="qty-buttons">
        <button class="decrease" aria-label="Decrease quantity">−</button>
        <input type="number" id="quantity" value="1" min="1" aria-label="Quantity">
        <button class="increase" aria-label="Increase quantity">+</button>
      </div>
    </div>

    <div class="add-to-cart-wrapper">
      <button id="addToCartBtn" aria-label="Add ${selectedProduct.h2} to cart">Add To Cart</button>
    </div>
  </div>
`;


const addToCartBtn = productCard.querySelector("#addToCartBtn");
const quantityInput = productCard.querySelector("#quantity");
const decreaseBtn = productCard.querySelector(".decrease");
const increaseBtn = productCard.querySelector(".increase");

decreaseBtn.addEventListener("click", () => {
  let value = parseInt(quantityInput.value);
  if (value > 1) quantityInput.value = value - 1;
});

increaseBtn.addEventListener("click", () => {
  let value = parseInt(quantityInput.value);
  quantityInput.value = value + 1;
});

addToCartBtn.addEventListener("click", () => {
  const quantity = parseInt(quantityInput.value);
  for (let i = 0; i < quantity; i++) {
    cart.push(selectedProduct);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  cartCount.textContent = cart.length;
  alert(`Added ${quantity} x ${selectedProduct.h2} to cart!`);
});
    itemsList.appendChild(productCard);
  } else {
    itemsList.innerHTML = `<p style="color:white; text-align:center;">No product selected.</p>`;
  }
} else {
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('option');

  productCard.innerHTML = `
    <div class="image-container">
      <img src="${product.img}" alt="${product.alt}">
    </div>
    <h2>${product.h2}</h2>
    <h3>${product.h3}</h3>
    <div class="price-and-button">
      <h4>${product.h4}</h4>
      <button aria-label="Add ${product.h2} to cart">Add To Cart</button>
    </div>
  `;

  productCard.setAttribute("role", "button");
  productCard.setAttribute("tabindex", "0");
  productCard.setAttribute("aria-label", `${product.h2}, ${product.h3}, ${product.h4}. Click to view more info`);



  productCard.addEventListener("click", (e) => {
    if (!e.target.closest('button')) {
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href = "product_info.html";
      }
  });

  productCard.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // prevent scrolling for space
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href = "product_info.html";
    }
  });


  productCard.querySelector("button").addEventListener("click", (e) => {
    e.stopPropagation();
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    announceToScreenReader(`${product.h2} added to cart`);
    alert(`Added ${product.h2} to cart!`);
  });

    itemsList.appendChild(productCard);
  });

  function updateCartCount() {
  const cartCount = document.querySelector('.item-count');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartCount.textContent = cart.length;
}
productCard.querySelector("button").addEventListener("click", (e) => {
  e.stopPropagation();
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount(); // this now works
  announceToScreenReader(`${product.h2} added to cart`);
  alert(`Added ${product.h2} to cart!`);
});

  
}


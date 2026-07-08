// https://www.youtube.com/watch?v=IwTCis0-Nfc&t=595s
// https://youtu.be/gXWohFYrI0M?si=epPnl9NqkNhTCdCg
document.addEventListener("DOMContentLoaded", () => {
  const itemsList = document.querySelector(".items-list");
  const cartCount = document.querySelector(".item-count");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Group items by ID
  const groupedCart = cart.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = { ...item, quantity: 1 };
    } else {
      acc[item.id].quantity += 1;
    }
    return acc;
  }, {});

  const cartItems = Object.values(groupedCart);
  cartCount.textContent = cart.length;

if (cartItems.length === 0) {
  itemsList.innerHTML = `
    <div style="text-align:center; padding: 4rem 1rem;">
      <i class="ri-shopping-cart-2-line" style="font-size: 5rem; color:rgb(0, 0, 0); margin-bottom: 1rem;"></i>
      <h2 style="font-family: 'Orbitron', sans-serif; margin-bottom: 1rem; font-size:2.5rem;">Your cart is empty</h2>
        <p style="font-size: 1.1rem; color: #555;">
    Go to 
    <a href="index.html" class="empty-cart-link">Home</a> 
    or 
    <a href="shop.html" class="empty-cart-link">Shop</a> 
    to add items
    
    </p>
    </div>
  `;
  cartCount.textContent = 0;
  return;
}

  let grandTotal = 0;

  cartItems.forEach((item) => {
    const price = parseFloat(item.h4.replace('$', ''));
    const itemTotal = price * item.quantity;
    grandTotal += itemTotal;

    const itemCard = document.createElement("div");
    itemCard.classList.add("cart-item");

itemCard.innerHTML = `
  <div class="cart-content">
    <div class="cart-image">
      <img src="${item.img}" alt="${item.h2}">
    </div>
    <div class="cart-info">
      <h2>${item.h2}</h2>
      <h3>${item.h3}</h3>
      <p>Unit Price: ${item.h4}</p>
      <div class="quantity-wrap">
        <i class="ri-subtract-line qty-icon decrease" data-id="${item.id}" title="Decrease quantity" role="button" aria-label="Decrease quantity for ${item.h2}" tabindex="0"></i>
        <span class="qty" data-id="${item.id}">${item.quantity}</span>
        <i class="ri-add-line qty-icon increase" data-id="${item.id}" title="Increase quantity" role="button" aria-label="Increase quantity for ${item.h2}" tabindex="0"></i>
      </div>
      <p class="item-total" data-id="${item.id}">Item Total: $${itemTotal.toFixed(2)}</p>
    </div>
  </div>
  <i class="ri-close-large-line remove-icon" data-id="${item.id}" title="Remove item" role="button" aria-label="Remove ${item.h2} from cart" tabindex="0"></i>

`;


    itemsList.appendChild(itemCard);
  });

  // Grand Total
  const totalDisplay = document.createElement("div");
  totalDisplay.classList.add("cart-total");
  totalDisplay.innerHTML = `<h2>Grand Total: $${grandTotal.toFixed(2)}</h2>`;
  itemsList.appendChild(totalDisplay);

  // Purchase Button
  const purchaseBtnWrapper = document.createElement("div");
  purchaseBtnWrapper.classList.add("purchase-wrapper");
  purchaseBtnWrapper.innerHTML = `
    <button class="purchase-button">Purchase</button>
  `;
  itemsList.appendChild(purchaseBtnWrapper);

  purchaseBtnWrapper.querySelector(".purchase-button").addEventListener("click", () => {
    window.location.href = "checkout.html";
  });

  // Remove icon
  document.querySelectorAll(".remove-icon").forEach(icon => {
    icon.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      cart = cart.filter(product => product.id !== id);
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload();
    });
  });
function updateTotals() {
  const grouped = cart.reduce((acc, item) => {
    if (!acc[item.id]) acc[item.id] = { ...item, quantity: 1 };
    else acc[item.id].quantity += 1;
    return acc;
  }, {});

  let grandTotal = 0;

  Object.values(grouped).forEach(item => {
    const price = parseFloat(item.h4.replace('$', ''));
    const total = price * item.quantity;
    grandTotal += total;

    // Update the quantity text
    const qtySpan = document.querySelector(`.qty[data-id="${item.id}"]`);
    if (qtySpan) qtySpan.textContent = item.quantity;

    // Update the item total
    const itemTotal = document.querySelector(`.item-total[data-id="${item.id}"]`);
    if (itemTotal) itemTotal.textContent = `Item Total: $${total.toFixed(2)}`;
  });

  // Update grand total
  const grand = document.querySelector(".cart-total h2");
  if (grand) grand.textContent = `Grand Total: $${grandTotal.toFixed(2)}`;

  // Update cart icon count
  cartCount.textContent = cart.length;
}

// Increase quantity
document.querySelectorAll(".increase").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const id = parseInt(e.target.dataset.id);
    const product = cart.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateTotals();
  });
});

// Decrease quantity
document.querySelectorAll(".decrease").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const id = parseInt(e.target.dataset.id);

    // Remove ONE instance of the product
    const index = cart.findIndex(p => p.id === id);
    if (index !== -1) {
      cart.splice(index, 1);

      // Count remaining quantity
      const remaining = cart.filter(p => p.id === id).length;

      // If quantity is 0, remove from UI too
      if (remaining === 0) {
        const itemCard = document.querySelector(`.cart-item .qty[data-id="${id}"]`)?.closest(".cart-item");
        if (itemCard) itemCard.remove();
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateTotals();

      // Reload if the cart is now completely empty
      if (cart.length === 0) {
        location.reload();
      }
    }
  });
});
// Keyboard 
document.querySelectorAll(".qty-icon, .remove-icon").forEach(icon => {
  icon.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      icon.click(); 
    }
  });
});


});

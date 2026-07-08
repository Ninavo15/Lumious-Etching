const displayedProducts = products.slice(0, 3); // Get first 3 products

const itemsList = document.querySelector('.items-list');
const cartCount = document.querySelector('.item-count');
let cart = JSON.parse(localStorage.getItem('cart')) || [];
cartCount.textContent = cart.length;

function updateCartCount() {
  cartCount.textContent = cart.length;
  const cartIcon = document.querySelector('.cart-icon');
  if (cartIcon) {
    cartIcon.setAttribute('aria-label', `Shopping cart, ${cart.length} items`);
  }
}

displayedProducts.forEach(product => {
  const productCard = document.createElement('div');
  productCard.classList.add('option');
 productCard.setAttribute('tabindex', '0'); 
  productCard.setAttribute('role', 'button'); 
  productCard.setAttribute('aria-label', `View details for ${product.h2}`); 

  productCard.innerHTML = `
    <div class="image-container">
      <img src="${product.img}" alt="Product image">
    </div>
    <h2>${product.h2}</h2>
    <h3>${product.h3}</h3>
    <div class="price-and-button">
      <h4>${product.h4}</h4>
      <button>Add To Cart</button>
    </div>
  `;

  productCard.addEventListener("click", (e) => {
    if (!e.target.closest('button')) {
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href = "product_info.html";
    }
  });

    productCard.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href = "product_info.html";
    }
  });

  productCard.querySelector("button").addEventListener("click", (e) => {
    e.stopPropagation();
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`Added ${product.h2} to cart!`);
  });

  itemsList.appendChild(productCard);
});
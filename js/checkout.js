document.getElementById("checkout-form").addEventListener("submit", function (e) {
      e.preventDefault();
      // Store info temporarily or send to server if backend available
      localStorage.removeItem("cart");
      window.location.href = "confirmation.html";
});
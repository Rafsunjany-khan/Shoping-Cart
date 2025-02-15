document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total');
    const modalBody = document.getElementById('modal-body');

    // Display Cart Items
    function displayCart() {
        if (cart.length === 0) {
            checkoutItems.innerHTML = '<tr><td colspan="5" class="text-center">Your cart is empty</td></tr>';
            checkoutTotal.textContent = "0.00";
            return;
        }

        checkoutItems.innerHTML = cart.map(item => `
            <tr>
                <td><img src="${item.product.image}" alt="${item.product.name}" class="img-fluid" style="width: 80px; height: 80px; object-fit: contain;"></td>
                <td>${item.product.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.product.price.toFixed(2)}</td>
                <td>$${(item.product.price * item.quantity).toFixed(2)}</td>
            </tr>
        `).join('');

        const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
        checkoutTotal.textContent = totalPrice.toFixed(2);
    }

    // Clear Cart
    function clearCart() {
        localStorage.removeItem('cart'); // Clear cart from localStorage
        window.location.href = 'index.html'; // Redirect to home page
    }

    // Show Checkout Summary in Modal
    function showCheckoutSummary() {
        if (cart.length === 0) {
            alert("Your cart is empty. Add items before proceeding.");
            return;
        }

        // Fill modal with cart details
        modalBody.innerHTML = cart.map(item => `
            <div class="row">
                <div class="col-name">${item.product.name}</div>
                <div class="col-quantity">${item.quantity}</div>
                <div class="col-price">$${item.product.price.toFixed(2)}</div>
                <div class="col-total">$${(item.product.price * item.quantity).toFixed(2)}</div>
            </div>
            <hr>
        `).join('');

        const grandTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
        modalBody.innerHTML += `<div class="grand-total">
            <div><strong>Grand Total:</strong></div>
            <div><strong>$${grandTotal}</strong></div>
        </div>`;
    }

    // Confirm Checkout
    function confirmCheckout() {
        alert("Proceeding with checkout...");
        // Implement further checkout logic here (e.g., payment gateway)
        window.location.href = 'index.html'; // Redirect after checkout
    }

    // Event Listeners
    document.getElementById('clear-cart').addEventListener('click', clearCart);
    document.getElementById('checkout').addEventListener('click', showCheckoutSummary);
    document.getElementById('confirm-checkout').addEventListener('click', confirmCheckout);

    // Initial Calls
    displayCart();
});

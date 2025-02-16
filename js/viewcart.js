// JavaScript code with promo code integration

document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total');
    const modalBody = document.getElementById('modal-body');

    let appliedPromoCode = null;

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

        updateTotal();
    }

    // Calculate and Update Total
    function updateTotal() {
        const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
        let discount = 0;

        if (appliedPromoCode === "ostad10") {
            discount = subtotal * 0.10;
        } else if (appliedPromoCode === "ostad5") {
            discount = subtotal * 0.05;
        }

        const finalTotal = subtotal - discount;

        checkoutTotal.textContent = finalTotal.toFixed(2);

        const subtotalElem = document.getElementById('subtotal');
        const discountElem = document.getElementById('discount');
        const finalTotalElem = document.getElementById('final-total');

        if (subtotalElem && discountElem && finalTotalElem) {
            subtotalElem.textContent = subtotal.toFixed(2);
            discountElem.textContent = discount.toFixed(2);
            finalTotalElem.textContent = finalTotal.toFixed(2);
        }
    }

    // Apply Promo Code
    window.applyPromoCode = function () {
        const promoCodeInput = document.getElementById('promo-code').value.trim();

        if (promoCodeInput === appliedPromoCode) {
            alert("Promo code already applied.");
            return;
        }

        if (promoCodeInput === "ostad10" || promoCodeInput === "ostad5") {
            appliedPromoCode = promoCodeInput;
            updateTotal();
            alert("Promo code applied successfully!");
        } else {
            alert("Invalid promo code.");
        }
    }

    // Clear Cart
    function clearCart() {
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    }

    // Show Checkout Summary in Modal
    function showCheckoutSummary() {
        if (cart.length === 0) {
            alert("Your cart is empty. Add items before proceeding.");
            return;
        }

        modalBody.innerHTML = `
            <div class="row">
                <div class="col-12">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${cart.map(item => `
                                <tr>
                                    <td>${item.product.name}</td>
                                    <td>${item.quantity}</td>
                                    <td>$${item.product.price.toFixed(2)}</td>
                                    <td>$${(item.product.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-8">
                    <input type="text" class="form-control" id="promo-code" placeholder="Enter promo code">
                </div>
                <div class="col-4">
                    <button class="btn btn-outline-primary w-100" type="button" onclick="applyPromoCode()">Apply</button>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-6"><strong>Subtotal:</strong> $<span id="subtotal">0.00</span></div>
                <div class="col-6"><strong>Discount:</strong> $<span id="discount">0.00</span></div>
            </div>
            <div class="row">
                <div class="col-6"><strong>Final Total:</strong> $<span id="final-total">0.00</span></div>
            </div>
        `;

        updateTotal();
    }

    // Confirm Checkout
    function confirmCheckout() {
        alert("Proceeding with checkout...");
        window.location.href = 'index.html';
    }

    // Event Listeners
    document.getElementById('clear-cart').addEventListener('click', clearCart);
    document.getElementById('checkout').addEventListener('click', showCheckoutSummary);
    document.getElementById('confirm-checkout').addEventListener('click', confirmCheckout);

    displayCart();
});

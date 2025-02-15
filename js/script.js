document.addEventListener('DOMContentLoaded', function () {
    const products = [
        { id: 1, name: 'Iphone 16 Pro Max', price: 120.00, description: 'Experience the future of mobile technology with the iPhone 16 Pro Max. Designed with precision and innovation, this flagship device delivers exceptional performance, cutting-edge features, and a premium design. With a stunning display, powerful camera, and all-day battery life, it is the perfect choice for tech enthusiasts and professionals alike.', image: 'image/iphone-16-pro-max-1.jpg' },
        { id: 2, name: 'Canon EOS R6', price: 30.00, description: 'Canon EOS R6 is the ultimate mirrorless camera for photographers. It comes with a 20-megapixel sensor, 4K video capabilities, fast autofocus, and an excellent image processor. Whether you’re capturing professional portraits or dynamic action shots, this camera is perfect for all photographers.', image: 'image/pexels-madebymath-90946.jpg' },
        { id: 3, name: 'Philips GC180/80', price: 40.00, description: 'The Philips GC180/80 is a 1000-watt dry iron with a non-stick soleplate for smooth gliding, a heavy design for effective crease removal, and a 1.8-meter swivel cord for flexibility. It is ideal for quick, efficient ironing and suitable for 220-240V regions.', image: 'image/Philips.jpg' },
        { id: 4, name: 'HP MLLF 21.5 Inch', price: 80.00, description: 'Ports: HDMI, VGA, Display: IPS, 75Hz, 5ms, Resolution: FHD (1920 x 1080), Features: Free Sync, Low Blue Light, Anti-glare', image: 'image/Hp M22F.jpeg' },
        { id: 5, name: 'Netis NX10 Wireless', price: 60.00, description: 'Works seamlessly with all 802.11a/b/g/n/ac/ax devices. • Simultaneous 2.4GHz 300Mbps and 5GHz 1201Mbps connections. • Various WAN connection', image: 'image/Netis.jpg' },
        { id: 6, name: 'Pepsi', price: 15.00, description: 'Pepsi, a refreshing soda that has been a popular choice for generations. Known for its crisp, bubbly taste and energizing effect, Pepsi has been quenching thirsts around the world for decades. A perfect drink to enjoy with your meals or as a stand-alone refreshment.', image: 'image/pepsi.jpg' }
    ];

    const productList = document.getElementById('product-list');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    const clearCartButton = document.getElementById('clear-cart');
    const viewCartButton = document.getElementById('view-cart');
    const modalBody = document.getElementById('modalBody');

    let cart = [];

    // Display products
    function displayProducts() {
        if (!productList) {
            console.error('Product list container not found.');
            return;
        }

        productList.innerHTML = products.map(product => `
            <div class="col-md-4 mb-4">
                <div class="product-item card p-3">
                    <img src="${product.image}" alt="${product.name}" class="img-fluid mb-2" style="max-height: 200px; object-fit: contain;">
                    <h5 class="product-name text-truncate">${product.name}</h5>
                    <p class="product-description">${getShortDescription(product.description)}</p>
                    <div class="buttons mt-3">
                        <button class="view-details btn btn-info" data-id="${product.id}" data-bs-toggle="modal" data-bs-target="#productModal">View Details</button>
                        <button class="add-to-cart btn btn-success mb-2" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function () {
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId);
            });
        });

        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', function () {
                const productId = parseInt(this.getAttribute('data-id'));
                showProductDetails(productId);
            });
        });
    }

    // Get short description (limit to 20 words)
    function getShortDescription(description) {
        const words = description.split(' ');
        return words.length > 20 ? words.slice(0, 20).join(' ') + '...' : description;
    }

    // Add to cart
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const cartItem = cart.find(item => item.product.id === productId);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ product, quantity: 1 });
        }

        saveCart();
        updateCartDisplay();
    }

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Update cart display
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = cart.length
            ? cart.map(item => `
                <li class="list-group-item">
                    <span class="product-name">${item.product.name}</span>
                    <span>x${item.quantity}</span>
                    <div class="quantity">
                        <button class="remove-from-cart btn btn-danger btn-sm" data-id="${item.product.id}">-</button>
                        <button class="add-more btn btn-success btn-sm" data-id="${item.product.id}">+</button>
                    </div>
                </li>
            `).join('')
            : '<li class="list-group-item">Your cart is empty</li>';

        totalPrice.textContent = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2);

        // Add event listeners for quantity buttons
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', function () {
                const productId = parseInt(this.getAttribute('data-id'));
                updateQuantity(productId, -1);
            });
        });

        document.querySelectorAll('.add-more').forEach(button => {
            button.addEventListener('click', function () {
                const productId = parseInt(this.getAttribute('data-id'));
                updateQuantity(productId, 1);
            });
        });

        // Enable/Disable View Cart Button
        toggleViewCartButton();
    }

    // Update quantity
    function updateQuantity(productId, change) {
        const cartItem = cart.find(item => item.product.id === productId);
        if (cartItem) {
            cartItem.quantity += change;
            if (cartItem.quantity <= 0) {
                cart = cart.filter(item => item.product.id !== productId); // Remove item if quantity is 0
            }
        }

        saveCart();
        updateCartDisplay();
    }

    // Show product details in modal
    function showProductDetails(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            modalBody.innerHTML = `
                <div class="text-center">
                    <img src="${product.image}" class="img-fluid mb-3" alt="${product.name}" style="max-height: 300px; object-fit: contain;">
                    <h4>${product.name}</h4>
                    <p>${product.description}</p>
                    <h5>Price: $${product.price.toFixed(2)}</h5>
                </div>
            `;
        } else {
            modalBody.innerHTML = '<p class="text-danger">Product details not found.</p>';
        }
    }

    // Clear cart
    clearCartButton.addEventListener('click', function () {
        cart = [];
        saveCart();
        updateCartDisplay();
    });

    // View cart
    viewCartButton.addEventListener('click', function () {
        if (cart.length > 0) {
            window.location.href = 'viewcart.html';
        } else {
            alert('Your cart is empty. Add some products to view your cart.');
        }
    });

    // Toggle View Cart Button visibility
    function toggleViewCartButton() {
        if (cart.length > 0) {
            viewCartButton.disabled = false; // Enable if cart has items
        } else {
            viewCartButton.disabled = true; // Disable if cart is empty
        }
    }

    // Initialize
    displayProducts();
    updateCartDisplay();
});

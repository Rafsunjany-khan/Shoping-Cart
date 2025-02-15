const products = [
    { id: 1, name: 'Iphone 16 Pro Max', price: 20.00, description: 'Experience the future of mobile technology with the iPhone 16 Pro Max. Designed with precision and innovation, this flagship device delivers exceptional performance, cutting-edge features, and a premium design. With a stunning display, powerful camera, and all-day battery life, it is the perfect choice for tech enthusiasts and professionals alike.', image: 'image/iphone-16-pro-max-1.jpg' },
    { id: 2, name: 'Canon EOS R6', price: 30.00, description: 'Canon EOS R6 is the ultimate mirrorless camera for photographers. It comes with a 20-megapixel sensor, 4K video capabilities, fast autofocus, and an excellent image processor. Whether you’re capturing professional portraits or dynamic action shots, this camera is perfect for all photographers.', image: 'image/pexels-madebymath-90946.jpg' },
    { id: 3, name: 'Pepsi', price: 15.00, description: 'Pepsi, a refreshing soda that has been a popular choice for generations. Known for its crisp, bubbly taste and energizing effect, Pepsi has been quenching thirsts around the world for decades. A perfect drink to enjoy with your meals or as a stand-alone refreshment.', image: 'image/pepsi.jpg' }
];

const productList = document.getElementById('product-list');
const modalBody = document.getElementById('modalBody');

function displayProducts() {
    if (!productList) {
        console.error('Product list container not found.');
        return;
    }

    productList.innerHTML = products.map(product => `
        <div class="col-md-4">
            <div class="card m-3" style="width: 18rem;">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description.slice(0, 100)}...</p>
                    <button class="btn btn-primary" onclick="showProductDetails(${product.id})" data-bs-toggle="modal" data-bs-target="#productModal">View Details</button>
                </div>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('onclick').match(/\d+/)[0]);
            showProductDetails(productId);
        });
    });
}

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

document.addEventListener('DOMContentLoaded', displayProducts);

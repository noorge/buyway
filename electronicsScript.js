const products = [
    { id: 21, name: 'Sony WH-1000XM4 Wireless Noise Cancellation Bluetooth', price: 62, image: 'electronics/p1.png' },
    { id: 22, name: 'Sony BRAVIA 32 Inch TV 2K Google TV Upscaling', price: 25, image: 'electronics/p2.png' },
    { id: 23, name: 'Sony PlayStation 5 Console Blu-Ray', price: 70, image: 'electronics/p3.png' },
    { id: 24, name: 'HUAWEI MatePad 11.5-inch, 128GB RAM', price: 60, image: 'electronics/p4.png' },
    { id: 25, name: 'Huawei Watch Fit 3', price: 43, image: 'electronics/p5.png' },
    { id: 26, name: 'Huawei FreeBuds Lite, Bluetooth', price: 54, image: 'electronics/p6.png' },
    { id: 27, name: 'Apple 16-inch MacBook Pro', price: 65, image: 'electronics/p-7.jpg' },
    { id: 28, name: 'Apple TV 3rd Generation', price: 72, image: 'electronics/p-8.jpg' }
];


function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear previous product list

    products.forEach(product => {
        const productCard = `
            <div class="product-card" id="product-${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <p>${product.name}</p>
                    <p class="product-price">${product.price}$</p>
                    <div>
                        <button class="decrease-qty" data-id="${product.id}">-</button>
                        <span class="quantity" id="qty-${product.id}">1</span>
                        <button class="increase-qty" data-id="${product.id}">+</button>
                    </div>
                    <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}

function sortProducts(criteria) {
    let sortedProducts;
    switch (criteria) {
        case 'low-to-high':
            sortedProducts = [...products].sort((a, b) => a.price - b.price);
            break;
        case 'high-to-low':
            sortedProducts = [...products].sort((a, b) => b.price - a.price);
            break;
        case 'a-to-z':
            sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'z-to-a':
            sortedProducts = [...products].sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            sortedProducts = [...products];
    }
    displayProducts(sortedProducts);
}

document.getElementById('sort-products').addEventListener('change', (e) => {
    sortProducts(e.target.value);
});

// Load existing cart or initialize it
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.getElementById('product-list').addEventListener('click', (e) => {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);

    if (e.target.classList.contains('increase-qty')) {
        // Handle increasing quantity
        const quantityElement = document.getElementById(`qty-${productId}`);
        const currentQuantity = parseInt(quantityElement.textContent);

        if (currentQuantity < 10) {
            quantityElement.textContent = currentQuantity + 1;
        } else {
            alert("Maximum quantity for this product is 10.");
        }
    } else if (e.target.classList.contains('decrease-qty')) {
        // Handle decreasing quantity
        const quantityElement = document.getElementById(`qty-${productId}`);
        const currentQuantity = parseInt(quantityElement.textContent);

        if (currentQuantity > 1) {
            quantityElement.textContent = currentQuantity - 1;
        }
    } else if (e.target.classList.contains('add-to-cart-btn')) {
        // Handle adding product to the cart
        const quantity = parseInt(document.getElementById(`qty-${productId}`).textContent);
        const cartItem = { ...product, quantity };
        const existingItemIndex = cart.findIndex(item => item.id === productId);

        if (existingItemIndex >= 0) {
            if (cart[existingItemIndex].quantity + quantity > 10) {
                alert("Total quantity for this product cannot exceed 10.");
            } else {
                cart[existingItemIndex].quantity += quantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                alert(`${product.name} added to cart.`);
            }
        } else {
            if (quantity <= 10) {
                cart.push(cartItem);
                localStorage.setItem('cart', JSON.stringify(cart));
                alert(`${product.name} added to cart.`);
            } else {
                alert("Total quantity for this product cannot exceed 10.");
            }
        }
    }
});

// Display the products on page load
displayProducts(products);

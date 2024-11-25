document.addEventListener('DOMContentLoaded', () => {
    const pricePerItem = 20; // Price per item
    const taxRate = 0.05; // Tax rate (5%)
    const shippingCost = 10; // Fixed shipping cost

    const subtotalElement = document.getElementById('summary-subtotal');
    const totalElement = document.getElementById('summary-total');
    const checkoutButton = document.getElementById('checkout-btn');
    const deleteAllButton = document.getElementById('delete-all');

    // Load the cart from localStorage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to update subtotal and display the price
    function updateSubtotal() {
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
        });
        subtotalElement.textContent = `Subtotal: ${subtotal}$`; // تصحيح النص
        return subtotal;
    }

    // Function to update the summary with tax and shipping
    function updateSummary() {
        const subtotal = updateSubtotal();
        const tax = subtotal * taxRate;
        const total = subtotal + tax + shippingCost;
        totalElement.textContent = `Total: ${total.toFixed(2)}$`; // تصحيح النص وإضافة رقم عشري
    }

function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        const itemCard = `
            <div class="cart-item" id="item-${item.id}">
                <img src="${item.image}" alt="${item.name}" style="max-width: 100px; max-height: 100px;">
                <div>
                    <p>${item.name}</p>
                    <p>Price: ${item.price}$</p>
                    <select class="quantity-select" data-id="${item.id}">
                        ${[...Array(10).keys()].map(i => `
                            <option value="${i + 1}" ${item.quantity === i + 1 ? 'selected' : ''}>${i + 1}</option>
                        `).join('')}
                    </select>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;
        cartContainer.innerHTML += itemCard;
    });

    updateSummary();
    addCartItemEventListeners();
}

document.getElementById('cart-items').addEventListener('change', (e) => {
    if (e.target.classList.contains('quantity-select')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const newQuantity = parseInt(e.target.value);
        const productIndex = cart.findIndex(item => item.id === productId);

        if (productIndex >= 0) {
            if (newQuantity > 10) {
                alert("Maximum quantity for this product is 10.");
                e.target.value = 10;
            } else {
                cart[productIndex].quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateSummary();
            }
        }
    }
});




  

    // Function to add event listeners for remove buttons and quantity updates
    function addCartItemEventListeners() {
        document.getElementById('cart-items').addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item')) {
                const productId = parseInt(e.target.getAttribute('data-id'));
                cart = cart.filter(item => item.id !== productId);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartUI();
            }
        });

    }

    // Initial cart UI update
    updateCartUI();

    // Event listener for deleting all items
    deleteAllButton.addEventListener('click', () => {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    });

    // Event listener for checkout button
    checkoutButton.addEventListener('click', () => {
        const subtotal = updateSubtotal();
        const tax = subtotal * taxRate;
        const total = subtotal + tax + shippingCost;

        // Display acknowledgment
        alert(`Thank you for your purchase! Total cost: $${total}`); 
        
        // Redirect to the evaluation page
        window.location.href = 'Prodecteval.html';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const previousOrdersSelect = document.getElementById('previous-orders');
    const orderContainer = document.getElementById('order-container');

    // Data for orders
    const orders = {
        order1: [
            { name: 'Matte Finish Lipstick', image: 'lipstick.png', number: '001' },
            { name: 'Bluetooth Speaker', image: 'bluetoothSpeaker.png', number: '002' }
        ],
        order2: [
            { name: 'Pro Gaming Controller', image: 'offer1.png', number: '003' },
            { name: 'Women\'s Pink Pajamas', image: 'offer3.png', number: '004' }
        ]
    };

    // Event listener for dropdown selection
    previousOrdersSelect.addEventListener('change', () => {
        const selectedOrder = previousOrdersSelect.value;

        // Clear current products
        orderContainer.innerHTML = '';

        // Fetch and display products for the selected order
        const selectedProducts = orders[selectedOrder] || [];
        selectedProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="Product Image">
                <div class="product-details">
                    <div id="order-titlebox"><span>${product.name}</span></div>
                    <div class="rating">
                        <span class="stars">Rate: 
                            <input type="range" min="0" max="10" value="5" class="rating-range">
                        </span>
                    </div>
                    <input type="text" placeholder="Feedback" class="feedback-input">
                    <div id="button"><button class="submit-button">Submit</button></div>
                </div>
            `;
            orderContainer.appendChild(productDiv);
        });

        // Add event listeners for submit buttons
        const submitButtons = document.querySelectorAll('.submit-button');
        submitButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();

                // Get the product details
                const productDetails = button.closest('.product-details');
                const productName = productDetails.querySelector('#order-titlebox span').textContent;
                const ratingValue = productDetails.querySelector('.rating-range').value;
                const feedback = productDetails.querySelector('.feedback-input').value;
                const productNumber = orders[selectedOrder].find(p => p.name === productName).number;

                // Display feedback message
                alert(`Thank you for your feedback!\nYour rating for product#${productNumber} is ${ratingValue}`);

                // Redirect to the Home page after the alert
                window.location.href = 'index.html'; // You can replace this with the actual homepage URL
            });
        });
    });
});

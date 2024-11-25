document.addEventListener('DOMContentLoaded', () => {
    const previousOrdersSelect = document.getElementById('previous-orders');
    const orderContainer = document.getElementById('order-container');

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

    previousOrdersSelect.addEventListener('change', () => {
        const selectedOrder = previousOrdersSelect.value;

        if (!selectedOrder) {
            alert('Please select an order.');
            return;
        }

        orderContainer.innerHTML = '';

        const selectedProducts = orders[selectedOrder] || [];
        selectedProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="Product Image">
                <div class="product-details">
                    <div class="order-titlebox"><span>${product.name}</span></div>
                    <div class="rating">
                        <span class="stars">Rate: 
                            <input type="range" min="0" max="10" value="5" class="rating-range">
                        </span>
                    </div>
                    <input type="text" placeholder="Feedback" class="feedback-input">
                    <div class="button"><button class="submit-button">Submit</button></div>
                </div>
            `;
            orderContainer.appendChild(productDiv);
        });

        const submitButtons = document.querySelectorAll('.submit-button');
        submitButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();

                const productDetails = button.closest('.product-details');
                const productName = productDetails.querySelector('.order-titlebox span').textContent;
                const ratingValue = productDetails.querySelector('.rating-range').value;
                const feedback = productDetails.querySelector('.feedback-input').value;

                const selectedProduct = orders[selectedOrder].find(p => p.name === productName);
                const productNumber = selectedProduct ? selectedProduct.number : 'Unknown";

                alert(`Thank you for your feedback!\nYour rating for product#${productNumber} is ${ratingValue}`);

                window.location.href = 'index.html';
            });
        });
    });
});

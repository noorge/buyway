            document.addEventListener('DOMContentLoaded', function() {
                const products = JSON.parse(localStorage.getItem('products')) || [];
                const productContainer = document.querySelector('.Product1-grid12');
            
                if (products.length > 0) {
                    products.forEach(product => {
                        const productDiv = document.createElement('div');
                        productDiv.classList.add('Product1');
                        productDiv.innerHTML = `
                            <img src="${product.photo}" alt="${product.name}">
                            <h2 class="Product1-title">${product.name}</h2>
                            <p class="Product1-price">$${product.price}</p>
                            <p class="Product1-description">${product.description}</p>
                        `;
                        productContainer.appendChild(productDiv);
                    });
                } else {
                    productContainer.innerHTML = "<p>No products to display. Please add a product.</p>";
                }
            });

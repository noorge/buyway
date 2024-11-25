// Function to set the theme in localStorage
function setThemeInLocalStorage(theme) {
    localStorage.setItem('theme', theme); // Store theme in localStorage
}

// Function to get the theme from localStorage
function getThemeFromLocalStorage() {
    return localStorage.getItem('theme'); // Retrieve theme from localStorage
}

// Function to apply the theme on page load (using localStorage)
window.onload = function () {
    const theme = getThemeFromLocalStorage(); // Get the saved theme from localStorage
    const logo = document.getElementById('logo');
    const nameImage = document.getElementById('name-img');
    const cartImage = document.getElementById('cart-img');  // Ensure correct selector
    const body = document.body;

    // Apply theme based on the saved value in localStorage
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        logo.src = "darkLogo.png";  // Dark theme logo
        if (nameImage) {
            nameImage.src = "darkName.png";  // Dark theme name image (only on homepage)
        }
        if (cartImage) {
            cartImage.src = "darkCart.png";  // Dark theme cart image
        }
    } else {
        body.classList.remove('dark-theme');
        logo.src = "webLogo.png";  // Light theme logo
        if (nameImage) {
            nameImage.src = "name.png";  // Light theme name image
        }
        if (cartImage) {
            cartImage.src = "cart.png";  // Light theme cart image
        }
    }

    // Optional: Display the current date in the desired format
    document.getElementById('current-date').textContent = getFormattedDate();
};

// Function to toggle the theme (using localStorage)
function toggleTheme() {
    const body = document.body;
    const logo = document.getElementById('logo'); // Get the logo image by ID
    const nameImage = document.getElementById('name-img'); // Get the name image by ID
    const cartImage = document.getElementById('cart-img'); // Get the cart image by ID

    // Toggle the 'dark-theme' class on the body
    body.classList.toggle('dark-theme');

    // Update the logo and name image based on the theme
    if (body.classList.contains('dark-theme')) {
        logo.src = "darkLogo.png";  // Dark theme logo
        if (nameImage) {
            nameImage.src = "darkName.png";  // Dark theme name image (only on homepage)
        }
        if (cartImage) {
            cartImage.src = "darkCart.png";  // Dark theme cart image
        }
        // Save theme to localStorage
        setThemeInLocalStorage('dark');
    } else {
        logo.src = "webLogo.png";  // Light theme logo
        if (nameImage) {
            nameImage.src = "name.png";  // Light theme name image
        }
        if (cartImage) {
            cartImage.src = "cart.png";  // Light theme cart image
        }
        // Save theme to localStorage
        setThemeInLocalStorage('light');
    }
}


// Function to get the formatted date (Day, Date Month, Year)
function getFormattedDate() {
    const currentDate = new Date(); // Get today's date
    const options = { 
        weekday: 'long',   // Full weekday (e.g., "Monday")
        day: 'numeric',    // Day of the month (e.g., "11")
        month: 'long',     // Full month (e.g., "November")
        year: 'numeric'    // Full year (e.g., "2024")
    };
    return currentDate.toLocaleDateString('en-US', options);
}

// Function to toggle the visibility of the extra offers section
function toggleOffers() {
    const extraOffers = document.querySelectorAll('.offer.extra-offer');
    const link = document.getElementById('more-offers');
    
    // Toggle visibility of the extra offers
    extraOffers.forEach(function(offer) {
        offer.style.display = offer.style.display === 'block' ? 'none' : 'block';
    });

    // Change the text of the 'More Offers' link depending on the visibility
    if (link.textContent === "More Offers") {
        link.textContent = "Hide Offers";
    } else {
        link.textContent = "More Offers";
    }
}

// Function to add review details dynamically on hover
function addReviewHoverEffect() {
    const reviews = document.querySelectorAll(".review");
    const reviewData = {
        1: {
            customer: "Sarah Doe",
            product: "UltraSip Stainless Tumbler",
            feedback: "Love my new UltraSip Stainless Tumbler! Keeps drinks cold for hours, and the flip-top lid is so convenient. Highly recommend!",
            rating: "★★★★",
            image: "Review1.png"
        },
        2: {
            customer: "John Smith",
            product: "EchoWave Phantom",
            feedback: "Superb noise cancellation, and comfy for long hours, broke with me early though.",
            rating: "★★✩✩",
            image: "Review2.png"
        },
        3: {
            customer: "Nuha Baka",
            product: "Midnight Valor",
            feedback: "This fragrance is simply enchanting. A perfect blend of floral and musk, it's both elegant and alluring. It's a shame it doesn't stay for too long.",
            rating: "★★★✩",
            image: "Review3.png"
        }
    };

    reviews.forEach(review => {
        const detailsDiv = review.querySelector('.details'); // Ensure there's a .details element inside each review

        if (!detailsDiv) {
            console.error('Missing .details div in review element');
            return; // If the .details div doesn't exist, skip this review
        }

        // Add mouseenter listener
        review.addEventListener("mouseenter", () => {
            const reviewId = review.getAttribute('data-id'); // Assume each review has a data-id attribute
            const data = reviewData[reviewId]; // Get the corresponding data from the reviewData object

            if (data) {
                // Add the details to the .details div
                detailsDiv.innerHTML = `
                    <p><strong>Customer:</strong> ${data.customer}</p>
                    <p><strong>Product:</strong> ${data.product}</p>
                    <p><strong>Rating:</strong> ${data.rating}</p>
                    <p><strong>Feedback:</strong> ${data.feedback}</p>
                    <a href="${data.image}" target="_blank">
                        <img src="${data.image}" alt="${data.product}" class="review-pic">
                    </a>
                `;
            }
        });

        // Add mouseleave listener
        review.addEventListener("mouseleave", () => {
            detailsDiv.innerHTML = '';  // Clear the details when mouse leaves
        });
    });
}

// Ensure the DOM is loaded before applying hover effect
document.addEventListener("DOMContentLoaded", addReviewHoverEffect);



// Load offers from localStorage
const offers = JSON.parse(localStorage.getItem('offers')) || [];

// Render offers on the Home Page
function renderOffersOnHomePage() {
    const offersSection = document.querySelector('.offers');
    offersSection.innerHTML = ''; // Clear existing offers

    offers.forEach((offer) => {
        const offerDiv = document.createElement('div');
        offerDiv.classList.add('offer');
        offerDiv.innerHTML = `
            <img src="${offer.image}" alt="${offer.label}" style="width: 100px; height: auto;">
            <h3>${offer.label}</h3>
            <p>${offer.content}</p>
            <button>Add to cart</button>
        `;
        offersSection.appendChild(offerDiv);
    });
}


// Initial render
document.addEventListener('DOMContentLoaded', renderOffersOnHomePage);








// Function to render limited offers (3 initially)
function renderLimitedOffers() {
    const offersSection = document.querySelector('.offers');
    offersSection.innerHTML = ''; // Clear existing offers

    const offers = JSON.parse(localStorage.getItem('offers')) || [];
    const limitedOffers = offers.slice(0, 3); // Display only the first 3 offers

    limitedOffers.forEach((offer) => {
        const offerDiv = document.createElement('div');
        offerDiv.classList.add('offer');
        offerDiv.innerHTML = `
            <img src="${offer.image}" alt="${offer.label}">
            <h3>${offer.label}</h3>
            <p>${offer.content}</p>
            <button>Add to cart</button>
        `;
        offersSection.appendChild(offerDiv);
    });

    // Show or hide the "More Offers" button
    const moreOffersBtn = document.getElementById('more-offers-btn');
    if (offers.length > 3) {
        moreOffersBtn.style.display = 'block';
    } else {
        moreOffersBtn.style.display = 'none';
    }
}

// Render the full list of offers when "More Offers" is clicked
function renderAllOffers() {
    const offersSection = document.querySelector('.offers');
    offersSection.innerHTML = ''; // Clear existing offers

    const offers = JSON.parse(localStorage.getItem('offers')) || [];
    offers.forEach((offer) => {
        const offerDiv = document.createElement('div');
        offerDiv.classList.add('offer');
        offerDiv.innerHTML = `
            <img src="${offer.image}" alt="${offer.label}">
            <h3>${offer.label}</h3>
            <p>${offer.content}</p>
            <button>Add to cart</button>
        `;
        offersSection.appendChild(offerDiv);
    });

    // Hide the "More Offers" button after displaying all offers
    document.getElementById('more-offers-btn').style.display = 'none';
}

// Event listener for the "More Offers" button
document.getElementById('more-offers-btn').addEventListener('click', renderAllOffers);
document.addEventListener('DOMContentLoaded', renderLimitedOffers);







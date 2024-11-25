// Load offers from localStorage or initialize with default offers
let offers = JSON.parse(localStorage.getItem('offers')) || [
    { id: 1, label: "Pro Gaming Controller", content: "High-performance gaming controller.", image: "offer1.png" },
    { id: 2, label: "Matte Finish Lipstick", content: "Bold and long-lasting lipstick.", image: "offer2.png" },
    { id: 3, label: "Women's Pink Pajamas", content: "Comfortable and stylish pajamas.", image: "offer3.png" }
];

// Save offers to localStorage
function saveOffers() {
    localStorage.setItem('offers', JSON.stringify(offers));
}



// Delete selected offers
document.getElementById('Delete2').addEventListener('click', () => {
    const selectedOffers = Array.from(document.querySelectorAll('#offer-list input[type="checkbox"]:checked'));
    if (selectedOffers.length === 0) {
        alert("Please select at least one offer");
        return;
    }

    const confirmDelete = confirm("Are you sure you want to delete the selected offers?");
    if (confirmDelete) {
        const selectedIds = selectedOffers.map(checkbox => Number(checkbox.getAttribute('data-id')));
        offers = offers.filter(offer => !selectedIds.includes(offer.id));
        saveOffers();
        renderOffers();
        alert("Selected offers deleted successfully!");
    }
});

// Select all functionality
document.getElementById('select-all').addEventListener('change', (event) => {
    const allCheckboxes = document.querySelectorAll('#offer-list input[type="checkbox"]');
    allCheckboxes.forEach(checkbox => checkbox.checked = event.target.checked);
});

// Add a new offer




document.getElementById('new-offer2-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const label = document.getElementById('label').value.trim();
    const content = document.getElementById('content').value.trim();
    const imageInput = document.getElementById('image'); // File input element
    const imageFile = imageInput.files[0];

    if (!label || !content || !imageFile) {
        alert("All fields are required, including the image.");
        return;
    }

    // Read the image file as a Base64 URL
    const reader = new FileReader();
    reader.onload = function (e) {
        const newOffer = {
            id: offers.length ? offers[offers.length - 1].id + 1 : 1,
            label,
            content,
            image: e.target.result // Base64-encoded image
        };

        offers.push(newOffer);
        saveOffers(); // Update localStorage
        renderOffers(); // Re-render the list
        alert("New offer added successfully!");
        document.getElementById('new-offer2-form').reset(); // Clear form
    };
    reader.readAsDataURL(imageFile); // Read the file
});


// Function to render offers (updated)
function renderOffers() {
  const offerList = document.getElementById('offer-list');
  offerList.innerHTML = ''; // Clear existing offers
  offers.forEach((offer) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <input type="checkbox" id="offer-${offer.id}" data-id="${offer.id}">
      <label for="offer-${offer.id}">${offer.label}</label>
	  <img src="${offer.image}" alt="${offer.label}" style="width: 100px; height: auto;">
    `;
    offerList.appendChild(div);
  });
}

// Load offers from localStorage or initialize empty array (ensure fresh load)
function loadOffers() {
  offers = JSON.parse(localStorage.getItem('offers')) || []; // Reload offers
  renderOffers(); // Re-render offers
}

// Initial render of offers on page load
document.addEventListener('DOMContentLoaded', loadOffers);

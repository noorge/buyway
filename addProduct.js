function funcc() {
    var notice = "";
    var missing = false;

    // Get form values
    var productName = document.getElementById('product-name').value;
    var price = document.getElementById('price').value;
    var quantity = document.getElementById('quantity').value;
    var category = document.getElementById('category').value;
    var description = document.getElementById('description').value;
    var photoInput = document.getElementById('photo1');

    // Validate form inputs
    if (productName == "" || price == "" || quantity == "" || description == "") {
        notice += "All fields must be filled out.\n";
        missing = true;
    }
    if (/^\d/.test(productName)) {
        notice += "Product name cannot start with a number.\n";
        missing = true;
    }
    if (isNaN(price) || price <= 0) {
        notice += "Price must be a valid number and greater than 0.\n";
        missing = true;
    }
    if (isNaN(quantity) || quantity <= 0) {
        notice += "Quantity must be a valid number greater than 0.\n";
        missing = true;
    }
    if (missing) {
        alert(notice);
        return;
    }

    // Convert the image file to Base64 and then save the product
    if (photoInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const photoDataUrl = event.target.result;

            const newProduct = {
                name: productName,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                category: category,
                description: description,
                photo: photoDataUrl
            };

            const products = JSON.parse(localStorage.getItem('products')) || [];
            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));

            alert(`The product "${productName}" has been added successfully!`);

            // Clear the form inputs
            document.querySelector('.product-form form').reset();
            photoInput.value = ""; // Clear the file input
        };
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        alert("Please upload a product photo.");
    }
}

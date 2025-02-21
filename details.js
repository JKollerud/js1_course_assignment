const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

// Display the selected products
if (selectedProduct) {
	const productDetailContainer = document.getElementById("product-detail");
	const imageUrl = selectedProduct.image?.url || "default-image.jpg";
	const productImage = document.createElement("img");
	productImage.src = imageUrl;
	productImage.alt = selectedProduct.image?.alt || "Product";

	const productName = document.createElement("h2");
	productName.textContent = selectedProduct.title || "Unknown Product";

	const productDescription = document.createElement("p");
	productDescription.textContent = selectedProduct.description || "No description available.";

	const productPrice = document.createElement("p");
	productPrice.textContent = `Price: $${selectedProduct.discountedPrice || selectedProduct.price}`;

	const productSize = document.createElement("p");
	productSize.textContent = `Available Sizes: ${selectedProduct.sizes.join(", ")}`;

	const productColor = document.createElement("p");
	productColor.textContent = `Base Color: ${selectedProduct.baseColor}`;

	// Add to Cart Button
	const addToCartButton = document.createElement("button");
	addToCartButton.textContent = "Add to Cart";
	addToCartButton.addEventListener("click", () => {
		addToCart(selectedProduct);
	});

	productDetailContainer.appendChild(productImage);
	productDetailContainer.appendChild(productName);
	productDetailContainer.appendChild(productDescription);
	productDetailContainer.appendChild(productPrice);
	productDetailContainer.appendChild(productSize);
	productDetailContainer.appendChild(productColor);
	productDetailContainer.appendChild(addToCartButton);
}
function addToCart(product) {
	let cart = JSON.parse(localStorage.getItem("cart")) || [];

	const existingProduct = cart.find((item) => item.id === product.id);
	if (existingProduct) {
		existingProduct.quantity += 1;
	} else {
		cart.push({ ...product, quantity: 1 });
	}
	localStorage.setItem("cart", JSON.stringify(cart));
	updateCartInfo();
}

// Update the cart
function updateCartInfo() {
	const cart = JSON.parse(localStorage.getItem("cart")) || [];
	const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);

	const cartButton = document.querySelector(".shopping_cart");

	let cartCount = cartButton.querySelector("span");

	if (!cartCount) {
		cartCount = document.createElement("span");
		cartButton.appendChild(cartCount);
	}

	cartCount.textContent = totalItems > 0 ? `${totalItems}` : "";
}
updateCartInfo();

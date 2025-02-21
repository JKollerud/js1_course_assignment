let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 3;
const totalPages = 4;
let cart = [];

// Fetch the data and display the products
async function fetchRainyDaysData() {
	try {
		const response = await fetch("https://v2.api.noroff.dev/rainy-days");
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		allProducts = data.data;
		filteredProducts = allProducts;
		displayProducts(currentPage);
	} catch (error) {
		console.error("There was a problem with the fetch operation:", error);
	}
}

function displayProducts(page) {
	const productsContainer = document.getElementById("products-container");
	productsContainer.innerHTML = "";

	const startIndex = (page - 1) * productsPerPage;
	const endIndex = startIndex + productsPerPage;
	const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

	// Loop through products and display wanted info
	productsToDisplay.forEach((product) => {
		const productElement = document.createElement("div");
		productElement.classList.add("product");

		const imageUrl = product.image?.url || "default-image.jpg";
		const productImage = document.createElement("img");
		productImage.src = imageUrl;
		productImage.alt = product.image?.alt || "Product";

		const productName = document.createElement("h2");
		productName.textContent = product.title || "Unknown Product";

		const productPrice = document.createElement("p");
		productPrice.textContent = `$${product.discountedPrice || product.price}`;

		// The "Add to cart" button below each product
		const addToCartButton = document.createElement("button");
		addToCartButton.textContent = "Add to Cart";
		addToCartButton.addEventListener("click", (event) => {
			event.stopPropagation();
			addToCart(product);
		});

		// Click even to go to product-detail
		productElement.addEventListener("click", () => {
			localStorage.setItem("selectedProduct", JSON.stringify(product));
			window.location.href = "product-detail.html";
		});

		productElement.appendChild(productImage);
		productElement.appendChild(productName);
		productElement.appendChild(productPrice);
		productElement.appendChild(addToCartButton);

		productsContainer.appendChild(productElement);
	});

	updatePaginationButtons();
}

// Pagination function
function updatePaginationButtons() {
	document.getElementById("page-indicator").textContent = `${currentPage}/${totalPages}`;
	document.getElementById("prev-page").disabled = currentPage === 1;
	document.getElementById("next-page").disabled = currentPage === totalPages;
}

// Pagination "Previous" button
document.getElementById("prev-page").addEventListener("click", () => {
	if (currentPage > 1) {
		currentPage--;
		displayProducts(currentPage);
	}
});

// Pagination "Next" button
document.getElementById("next-page").addEventListener("click", () => {
	if (currentPage < totalPages) {
		currentPage++;
		displayProducts(currentPage);
	}
});

// Filter the products by gender
function filterProductsByGender(gender) {
	if (gender) {
		filteredProducts = allProducts.filter((product) => product.gender === gender);
	} else {
		filteredProducts = allProducts;
	}
	currentPage = 1;
	displayProducts(currentPage);
}

document.getElementById("gender-filter").addEventListener("change", (event) => {
	const selectedGender = event.target.value;
	filterProductsByGender(selectedGender);
});

// Add product to cart
function addToCart(product) {
	const existingProduct = cart.find((item) => item.id === product.id);
	if (existingProduct) {
		existingProduct.quantity += 1;
	} else {
		cart.push({ ...product, quantity: 1 });
	}
	updateCartInfo();
	saveCartToLocalStorage();
}

function updateCartInfo() {
	const cartButton = document.getElementById("view-cart");
	const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);
	cartButton.textContent = `View Cart (${totalItems} items)`;
}

function saveCartToLocalStorage() {
	localStorage.setItem("cart", JSON.stringify(cart));
}

document.getElementById("view-cart").addEventListener("click", () => {
	window.location.href = "checkout.html";
});

function loadCartFromLocalStorage() {
	const storedCart = localStorage.getItem("cart");
	if (storedCart) {
		cart = JSON.parse(storedCart);
		updateCartInfo(); //
	}
}

// Display the cart on the checkout page
function displayCart() {
	const cartContainer = document.getElementById("cart-container");
	cartContainer.innerHTML = "";

	if (cart.length === 0) {
		cartContainer.innerHTML = "<p>Your cart is empty!</p>";
	} else {
		cart.forEach((item) => {
			const itemElement = document.createElement("div");
			itemElement.classList.add("cart-item");
			const itemName = document.createElement("h2");
			itemName.textContent = item.title || "Unknown Product";
			const itemPrice = document.createElement("p");
			itemPrice.textContent = `$${(item.discountedPrice || item.price) * item.quantity}`;

			const itemQuantity = document.createElement("p");
			itemQuantity.textContent = `Quantity: ${item.quantity}`;

			itemElement.appendChild(itemName);
			itemElement.appendChild(itemPrice);
			itemElement.appendChild(itemQuantity);
			cartContainer.appendChild(itemElement);
		});
	}

	const totalPrice = cart.reduce((total, item) => total + (item.discountedPrice || item.price) * item.quantity, 0);
	document.getElementById("total-price").textContent = totalPrice.toFixed(2);
}

fetchRainyDaysData();

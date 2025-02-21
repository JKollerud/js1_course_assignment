window.addEventListener("load", () => {
	const cart = JSON.parse(localStorage.getItem("cart")) || [];
	const cartContainer = document.getElementById("cart-container");

	if (cart.length === 0) {
		cartContainer.innerHTML = "<p>Your cart is empty!</p>";
	} else {
		cart.forEach((item, index) => {
			const itemElement = document.createElement("div");
			itemElement.classList.add("cart-item");

			const itemName = document.createElement("h2");
			itemName.textContent = item.title || "Unknown Product";

			const itemPrice = document.createElement("p");
			itemPrice.textContent = `$${(item.discountedPrice || item.price) * item.quantity}`;

			const itemQuantity = document.createElement("p");
			itemQuantity.textContent = `Quantity: ${item.quantity}`;

			const removeButton = document.createElement("button");
			removeButton.textContent = "Remove Item";
			removeButton.classList.add("remove-item-btn");
			removeButton.addEventListener("click", () => {
				removeItemFromCart(index);
			});

			itemElement.appendChild(itemName);
			itemElement.appendChild(itemPrice);
			itemElement.appendChild(itemQuantity);
			itemElement.appendChild(removeButton);
			cartContainer.appendChild(itemElement);
		});
	}

	const totalPrice = cart.reduce((total, item) => total + (item.discountedPrice || item.price) * item.quantity, 0);
	document.getElementById("total-price").textContent = totalPrice.toFixed(2);
});

function removeItemFromCart(index) {
	const cart = JSON.parse(localStorage.getItem("cart")) || [];

	if (cart[index].quantity > 1) {
		cart[index].quantity -= 1;
	} else {
		cart.splice(index, 1);
	}

	localStorage.setItem("cart", JSON.stringify(cart));

	window.location.reload();
}

document.getElementById("checkout-button").addEventListener("click", () => {
	window.location.href = "order-confirmation.html";
});

document.getElementById("checkout-button").addEventListener("click", () => {
	window.location.href = "checkout_confirmation.html";
});

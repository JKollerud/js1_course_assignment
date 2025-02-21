window.addEventListener("load", () => {
	const cart = JSON.parse(localStorage.getItem("cart")) || [];
	const orderSummaryContainer = document.getElementById("order-summary");

	if (cart.length === 0) {
		orderSummaryContainer.innerHTML = "<p>Your order is empty!</p>";
	} else {
		const summaryList = document.createElement("ul");

		cart.forEach((item) => {
			const listItem = document.createElement("li");
			listItem.innerHTML = `
          <strong>${item.title}</strong> - Quantity: ${item.quantity} - 
          Price per item: $${item.discountedPrice || item.price} - 
          Subtotal: $${((item.discountedPrice || item.price) * item.quantity).toFixed(2)}
        `;
			summaryList.appendChild(listItem);
		});

		const totalPrice = cart.reduce(
			(total, item) => total + (item.discountedPrice || item.price) * item.quantity,
			0
		);

		const totalElement = document.createElement("p");
		totalElement.innerHTML = `<strong>Total: $${totalPrice.toFixed(2)}</strong>`;

		orderSummaryContainer.appendChild(summaryList);
		orderSummaryContainer.appendChild(totalElement);
	}

	localStorage.removeItem("cart");

	document.getElementById("back-to-shop").addEventListener("click", () => {
		window.location.href = "index.html";
	});
});

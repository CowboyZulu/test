let cart = [];

document.addEventListener("DOMContentLoaded", function () {
    loadCart();
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productElement = this.parentElement;
            const productId = productElement.getAttribute('data-id');
            const productName = productElement.querySelector('h3').innerText;
            const productPrice = productElement.querySelector('.price').innerText;
            addToCart(productId, productName, productPrice);
        });
    });
});

function addToCart(productId, productName, productPrice) {
    const product = {
        id: productId,
        name: productName,
        price: productPrice
    };
    cart.push(product);
    saveCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}
// ... Existing code ...

// If on cart page
if (document.querySelector('#cart-table')) {
    renderCart();
}

function renderCart() {
    const cartTableBody = document.querySelector('#cart-table tbody');
    let total = 0;
    cart.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}</td>
        `;
        cartTableBody.appendChild(row);
        total += parseFloat(product.price.slice(1));  // remove $ sign
    });

    // Add total row
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td><strong>Total</strong></td>
        <td><strong>$${total.toFixed(2)}</strong></td>
    `;
    cartTableBody.appendChild(totalRow);
}

// ... Previous code ...

// If on the cart page
if (document.querySelector('#cart-table')) {
    renderCart();
}

function renderCart() {
    const cartTableBody = document.querySelector('#cart-table tbody');
    let totalCartPrice = 0;

    cart.forEach(product => {
        const productTotal = parseFloat(product.price.slice(1)) * product.quantity;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${product.imgSrc}" alt="${product.name}"></td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td>$${productTotal.toFixed(2)}</td>
        `;
        cartTableBody.appendChild(row);
        totalCartPrice += productTotal;
    });

    document.getElementById('cart-total').innerText = `$${totalCartPrice.toFixed(2)}`;
}

document.getElementById('checkout-btn').addEventListener('click', function () {
    window.location.href = "checkout.html";  // Assuming you have a checkout.html page
});

let cart = [];
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutMsg = document.getElementById('checkoutMsg');

// Add to cart
document.querySelectorAll('.addToCart').forEach(btn => {
    btn.addEventListener('click', () => {
        const name = btn.getAttribute('data-name');
        const price = parseFloat(btn.getAttribute('data-price'));
        cart.push({name, price});
        updateCart();
        btn.textContent = "Added ✓";
        btn.style.background = "#16a34a";
        setTimeout(()=> {btn.textContent = "Add to Cart"; btn.style.background="#0a68e0";}, 1000);
    });
});

function updateCart(){
    cartCount.textContent = cart.length;
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `<p>${index+1}. ${item.name} - $${item.price}</p>`;
    });
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Open Cart
document.querySelector('.cart-box').addEventListener('click', () => {
    cartModal.style.display = "flex";
});
closeCart.addEventListener('click', () => cartModal.style.display = "none");
window.addEventListener('click', (e) => { if(e.target === cartModal) cartModal.style.display="none"; });

// Search Filter
document.getElementById('searchMedicine').addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    document.querySelectorAll('.med-card').forEach(card => {
        const name = card.getAttribute('data-name').toLowerCase();
        card.style.display = name.includes(val) ? "block" : "none";
    });
});

// Checkout
checkoutBtn.addEventListener('click', () => {
    if(cart.length === 0){
        checkoutMsg.textContent = "Cart خالی ہے";
        checkoutMsg.style.color = "red";
        return;
    }
    localStorage.setItem('pharmacyOrders', JSON.stringify(cart));
    checkoutMsg.textContent = "✅ Order Placed! 2 گھنٹے میں ڈیلیوری ہو جائے گی";
    checkoutMsg.style.color = "green";
    cart = [];
    updateCart();
    setTimeout(()=> cartModal.style.display="none", 1500);
});
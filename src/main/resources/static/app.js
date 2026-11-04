const grid = document.getElementById('product-grid');
const statusText = document.getElementById('status');
const searchInput = document.getElementById('search');
const filters = document.getElementById('category-filters');
const cartPanel = document.getElementById('cart-panel');
const overlay = document.getElementById('overlay');

let products = [];
let activeCategory = 'All';
let cart = JSON.parse(localStorage.getItem('shopease-cart') || '{}');

const money = value => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 2
}).format(value);

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  }[char]));
}

async function loadProducts() {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) throw new Error('Could not load products');
    products = await response.json();
    renderFilters();
    renderProducts();
    renderCart();
    statusText.textContent = products.length ? '' : 'No products found.';
  } catch (error) {
    statusText.textContent = 'Unable to load products. Check that Spring Boot and MySQL are running.';
  }
}

function renderFilters() {
  const categories = ['All', ...new Set(products.map(p => p.category))];
  filters.innerHTML = categories.map(category =>
    '<button class="filter ' + (category === activeCategory ? 'active' : '') +
    '" data-category="' + escapeHtml(category) + '">' + escapeHtml(category) + '</button>'
  ).join('');
  filters.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.category;
      renderFilters();
      renderProducts();
    });
  });
}

function renderProducts() {
  const term = searchInput.value.trim().toLowerCase();
  const visible = products.filter(p =>
    (activeCategory === 'All' || p.category === activeCategory) &&
    (p.name + ' ' + p.category + ' ' + (p.description || '')).toLowerCase().includes(term)
  );
  statusText.textContent = visible.length ? '' : 'No matching products.';
  grid.innerHTML = visible.map(p => `
    <article class="product-card">
      <div class="product-image"><img src="${escapeHtml(p.imageUrl || '')}" alt="${escapeHtml(p.name)}"
        onerror="this.style.display='none';this.parentElement.textContent='Product image';"></div>
      <div class="product-info"><span class="category">${escapeHtml(p.category)}</span>
        <h3>${escapeHtml(p.name)}</h3><p class="description">${escapeHtml(p.description || '')}</p>
        <div class="product-bottom"><span class="price">${money(p.price)}</span>
          <button class="add-button" data-add="${p.id}">Add to cart</button></div>
      </div>
    </article>`).join('');
  grid.querySelectorAll('[data-add]').forEach(button => {
    button.addEventListener('click', () => addToCart(Number(button.dataset.add)));
  });
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
}

function changeQuantity(id, delta) {
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  saveCart();
}

function saveCart() {
  localStorage.setItem('shopease-cart', JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  document.getElementById('cart-count').textContent = count;
  const selected = products.filter(p => cart[p.id]);
  document.getElementById('cart-items').innerHTML = selected.length ? selected.map(p => `
    <div class="cart-row"><div><strong>${escapeHtml(p.name)}</strong><div class="qty-controls">
      <button data-change="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button>
      <span>${cart[p.id]}</span>
      <button data-change="${p.id}" data-delta="1" aria-label="Increase quantity">+</button>
    </div></div><strong>${money(p.price * cart[p.id])}</strong></div>`).join('') :
    '<p class="status">Your cart is empty.</p>';
  const total = selected.reduce((sum, p) => sum + p.price * cart[p.id], 0);
  document.getElementById('cart-total').textContent = money(total);
  document.querySelectorAll('[data-change]').forEach(button => {
    button.addEventListener('click', () => changeQuantity(
      Number(button.dataset.change), Number(button.dataset.delta)
    ));
  });
}

function openCart() {
  cartPanel.classList.add('open');
  overlay.classList.add('open');
  cartPanel.setAttribute('aria-hidden', 'false');
}
function closeCart() {
  cartPanel.classList.remove('open');
  overlay.classList.remove('open');
  cartPanel.setAttribute('aria-hidden', 'true');
}

searchInput.addEventListener('input', renderProducts);
document.getElementById('cart-toggle').addEventListener('click', openCart);
document.getElementById('close-cart').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);
document.getElementById('checkout').addEventListener('click', () => {
  alert('This is a portfolio demo. No real order or payment has been placed.');
});
loadProducts();

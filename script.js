/* ============================================
   CARE N SAFE — Indian Edition
   Main JavaScript
   ============================================ */

// ============================================
// CART STATE
// ============================================
const cart = {
  items: [],
  
  add(product) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) {
      existing.qty++;
    } else {
      this.items.push({ ...product, qty: 1 });
    }
    this.render();
    this.updateBadge();
    showToast(`${product.name} added to cart!`, 'success');
  },
  
  remove(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.render();
    this.updateBadge();
  },
  
  updateQty(id, delta) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      this.remove(id);
      return;
    }
    this.render();
    this.updateBadge();
  },
  
  get total() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  },
  
  get count() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  },
  
  updateBadge() {
    const badge = document.querySelector('.cart-badge');
    if (!badge) return;
    badge.style.display = this.count > 0 ? 'block' : 'none';
  },
  
  render() {
    const container = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    if (!container) return;
    
    if (this.items.length === 0) {
      container.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty-icon">🛍️</div>
          <p>Your cart is empty.<br>Add some items to get started!</p>
        </div>`;
    } else {
      container.innerHTML = this.items.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-emoji">${item.emoji}</div>
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">₹${item.price.toFixed(2)}</div>
            <div class="qty-control">
              <button class="qty-btn" onclick="cart.updateQty('${item.id}', -1)">−</button>
              <span class="qty-display">${item.qty}</span>
              <button class="qty-btn" onclick="cart.updateQty('${item.id}', 1)">+</button>
            </div>
          </div>
          <button class="cart-remove" onclick="cart.remove('${item.id}')" title="Remove">×</button>
        </div>`).join('');
    }
    
    const subtotal = this.total;
    const shipping = subtotal > 499 ? 0 : 49;
    if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `₹${(subtotal + shipping).toFixed(2)}`;
    
    // Update shipping display
    const shippingEl = document.getElementById('cart-shipping');
    if (shippingEl) {
      shippingEl.textContent = shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`;
      shippingEl.style.color = shipping === 0 ? '#4a7c59' : '';
    }
  }
};

// ============================================
// PRODUCTS DATA (with real images)
// ============================================
const products = [
  {
    id: 'pad-thin-reg',
    name: 'Ultra Thin Regular Pad',
    category: 'Pads',
    flow: 'Regular Flow',
    price: 749,
    originalPrice: 999,
    emoji: '🌸',                    // fallback
    image: 'Image-1.jpg',   // ← Add this
    badge: 'popular',
    badgeText: 'Popular',
    tags: ['odour-lock', 'breathable'],
    isNew: false,
  },
  {
    id: 'pad-overnight',
    name: 'Overnight Protection Pad',
    category: 'Pads',
    flow: 'Heavy Flow',
    price: 849,
    originalPrice: 1099,
    emoji: '🌙',
    image: 'Image-1.jpg',   // ← Add this
    badge: 'new',
    badgeText: 'New',
    tags: ['12hr protection', 'wings'],
    isNew: true,
  },
  {
    id: 'tampon-organic',
    name: 'Organic Cotton Tampon',
    category: 'Tampons',
    flow: 'Regular Flow',
    price: 919,
    originalPrice: null,
    emoji: '🌿',
    image: 'Image-1.jpg',   // ← Add this
    badge: 'eco',
    badgeText: 'Eco',
    tags: ['100% organic', 'no chlorine'],
    isNew: false,
  },
  {
    id: 'cup-menstrual',
    name: 'Menstrual Cup',
    category: 'Cups',
    flow: 'All Flow',
    price: 2099,
    originalPrice: 2499,
    emoji: '🌺',
    image: 'Image-1.jpg',   // ← Add this
    badge: 'popular',
    badgeText: 'Best Seller',
    tags: ['reusable', '12hr wear'],
    isNew: false,
  },
  {
    id: 'liner-daily',
    name: 'Daily Pantyliner',
    category: 'Liners',
    flow: 'Light Flow',
    price: 499,
    originalPrice: 649,
    emoji: '🌼',
    image: 'Image-1.jpg',   // ← Add this
    badge: null,
    badgeText: null,
    tags: ['ultra thin', 'daily use'],
    isNew: false,
  },
  {
    id: 'pad-winged',
    name: 'Winged Maxi Pad',
    category: 'Pads',
    flow: 'Heavy Flow',
    price: 799,
    originalPrice: null,
    emoji: '💐',
    image: 'Image-1.jpg',   // ← Add this
    badge: 'new',
    badgeText: 'New',
    tags: ['anti-leak wings', '8hr'],
    isNew: true,
  },
  {
    id: 'disc-menstrual',
    name: 'Menstrual Disc',
    category: 'Discs',
    flow: 'All Flow',
    price: 1849,
    originalPrice: 2199,
    emoji: '⭕',
    image: 'Image-1.jpg',   // ← Add this
    badge: 'sale',
    badgeText: 'Sale',
    tags: ['mess-free', 'comfortable'],
    isNew: false,
  },
  {
    id: 'tampon-super',
    name: 'Super Plus Tampon',
    category: 'Tampons',
    flow: 'Super Flow',
    price: 1049,
    originalPrice: null,
    emoji: '🌷',
    image: 'Image-1.jpg',   // ← Add this
    badge: null,
    badgeText: null,
    tags: ['expandable', 'leak-proof'],
    isNew: false,
  },
];

// ============================================
// RENDER PRODUCTS (Updated with Images)
// ============================================
function renderProducts(filter = 'all') {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  
  const filtered = filter === 'all' 
    ? products 
    : products.filter(p => p.category.toLowerCase() === filter.toLowerCase());
  
  grid.innerHTML = filtered.map(p => `
    <div class="product-card" data-category="${p.category}">
      <div class="product-image-wrap">
        ${p.badge ? `<span class="product-badge badge-${p.badge}">${p.badgeText}</span>` : ''}
        
        <!-- Real Product Image -->
        <img src="${p.image || `https://via.placeholder.com/400x400/fff4e6/c05c1a?text=${encodeURIComponent(p.name)}`}" 
             alt="${p.name}"
             class="product-image"
             onerror="this.src='https://via.placeholder.com/400x400/f8e8d0/c05c1a?text=${encodeURIComponent(p.emoji)}'">
        
        <button class="wishlist-btn" onclick="toggleWishlist(this)" title="Add to wishlist">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      
      <div class="product-body">
        <div class="product-category">${p.category} · ${p.flow}</div>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-tags">
          ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="product-footer">
          <div>
            <span class="product-price">₹${p.price.toFixed(2)}</span>
            ${p.originalPrice ? `<span class="product-price-old">₹${p.originalPrice}</span>` : ''}
          </div>
          <button class="btn-cart" onclick='cart.add(${JSON.stringify({id: p.id, name: p.name, price: p.price, emoji: p.emoji})})' title="Add to cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>`).join('');
}

// ============================================
// WISHLIST TOGGLE
// ============================================
function toggleWishlist(btn) {
  btn.classList.toggle('active');
  const isActive = btn.classList.contains('active');
  btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="${isActive ? '#e8647a' : 'none'}" stroke="${isActive ? '#e8647a' : 'currentColor'}" stroke-width="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>`;
  showToast(isActive ? 'Added to wishlist! ❤️' : 'Removed from wishlist', isActive ? 'success' : '');
}

// ============================================
// FILTER TABS
// ============================================
function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      renderProducts(filter);
    });
  });
}

// ============================================
// CART DRAWER
// ============================================
function openCart() {
  document.getElementById('cart-overlay').classList.add('open');
  document.getElementById('cart-drawer').classList.add('open');
  document.body.style.overflow = 'hidden';
  cart.render();
}

function closeCart() {
  document.getElementById('cart-overlay').classList.remove('open');
  document.getElementById('cart-drawer').classList.remove('open');
  document.body.style.overflow = '';
}

// ============================================
// MOBILE NAV
// ============================================
function openMobileNav() {
  document.getElementById('mobile-nav').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  document.getElementById('mobile-nav').classList.remove('open');
  document.body.style.overflow = '';
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
    <span>${message}</span>`;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ============================================
// SCROLL TO TOP
// ============================================
function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================
// BUILD A BOX — PLAN SELECTION
// ============================================
function initBuildBox() {
  const cards = document.querySelectorAll('.pricing-mini');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });
}

// ============================================
// NEWSLETTER FORM
// ============================================
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('.newsletter-input');
    if (!input.value.trim()) {
      showToast('Please enter your email address', 'error');
      return;
    }
    showToast('Thanks! You\'re now subscribed 🌸', 'success');
    input.value = '';
  });
}

// ============================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeMobileNav();
      }
    });
  });
}

// ============================================
// ANIMATE ON SCROLL (simple version)
// ============================================
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  
  document.querySelectorAll('.product-card, .feature-card, .testimonial-card, .blog-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.25s ease, border-color 0.25s ease';
    observer.observe(el);
  });
}

// ============================================
// HERO COUNTER ANIMATION
// ============================================
function animateCounters() {
  const counters = document.querySelectorAll('.stat-count');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const suffix = counter.dataset.suffix || '';
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = current.toLocaleString('en-IN') + suffix;
    }, 20);
  });
}

// ============================================
// BUILD A BOX CTA
// ============================================
function buildBoxCheckout() {
  const selected = document.querySelector('.pricing-mini.selected');
  const plan = selected ? selected.querySelector('.price-label').textContent : 'Monthly';
  const price = selected ? selected.querySelector('.price-value').textContent : '';
  showToast(`Starting ${plan} box at ${price} 🎉`, 'success');
}

// ============================================
// INIT ALL
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  renderProducts('all');
  initFilterTabs();
  initNavbar();
  initScrollTop();
  initBuildBox();
  initNewsletter();
  initSmoothScroll();
  cart.updateBadge();
  
  // Animate counters after a brief delay
  setTimeout(animateCounters, 500);
  
  // Animate on scroll after render
  setTimeout(initAnimations, 100);
  
  // Cart overlay click
  document.getElementById('cart-overlay')?.addEventListener('click', closeCart);
  
  // Mobile nav overlay click
  document.querySelector('.mobile-nav-overlay')?.addEventListener('click', closeMobileNav);
});

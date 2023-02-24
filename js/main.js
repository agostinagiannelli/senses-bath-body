let productList = [
  { sku: 1463555, name: "Aloha Monoi Shower Gel", variant: "coconut", price: 9, image: "senses-aloha-monoi-shower-gel-500ml.jpg" },
  { sku: 1469365, name: "Flamingo Sunset Shower Gel", variant: "tropical", price: 9, image: "senses-flamingo-sunset-shower-gel-500ml.jpg" },
  { sku: 1466568, name: "Simply Luxurious Shower Gel", variant: "vanilla", price: 9, image: "senses-simply-luxurious-shower-gel-500ml.jpg" },
  { sku: 1460963, name: "Simply Luxurious Bubble Bath", variant: "vanilla", price: 11, image: "senses-simply-luxurious-bubble-bath-1000ml.jpg" },
  { sku: 1460959, name: "Aloha Monoi Bubble Bath", variant: "coconut", price: 11, image: "senses-aloha-monoi-bubble-bath-1000ml.jpg" },
  { sku: 1468364, name: "Flamingo Sunset Bubble Bath", variant: "tropical", price: 11, image: "senses-flamingo-sunset-bubble-bath-1000ml.jpg" },
  { sku: 1491568, name: "Flamingo Sunset Body Mist", variant: "tropical", price: 6, image: "senses-flamingo-sunset-body-mist-100ml.jpg" },
  { sku: 1491601, name: "Simply Luxurious Body Mist", variant: "vanilla", price: 6, image: "senses-simply-luxurious-body-mist-100ml.jpg" },
  { sku: 1491605, name: "Aloha Monoi Body Mist", variant: "coconut", price: 6, image: "senses-aloha-monoi-body-mist-100ml.jpg" },
];
let cart = [];
let productGrid = document.getElementById("productGrid");

// Add to cart arrow function
const pushToCart = (sku) => {
  let pushToCart = productList.find((item) => item.sku === sku);
  cart.push({ sku: pushToCart.sku, name: pushToCart.name, price: pushToCart.price, image: pushToCart.image });
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload(); // Confirmar si está bien usado
};

productList.forEach(item => {
  let product = document.createElement("div");
  product.innerHTML = `
  <div class="item-wrap fancybox">
  <div class="product-detail">
  <h3>${item.name}</h3>
  <span>${item.variant}</span>
  <div>
  <button id="addToCart${item.sku}" class="btn btn-outline-light" type="button">Add to cart <i class="bi bi-bag-plus"></i></button>
  </div>
  </div>
  <img class="img-fluid" src="./img/${item.image}">
  </div>
  `;
  product.className = `item col-sm-6 col-md-4 col-lg-4 mb-4 ${item.variant}`;
  productGrid.append(product);
  // Add to cart
  let addToCart = document.getElementById(`addToCart${item.sku}`);
  addToCart.addEventListener("click", () => pushToCart(item.sku));
});

// Clear cart function
function fnClearCart() {
  localStorage.clear();
  window.location.reload(); // Confirmar si está bien usado
};

// Cart dropdown
let cartStorage = localStorage.getItem("cart");
let cartList = document.getElementById("cartList");
let cartCount = document.getElementById("cartCount");

if (cartStorage) {
  cart = JSON.parse(cartStorage);
} else {
  let noProducts = document.createElement("li");
  noProducts.innerHTML = `No products`;
  noProducts.className = "dropdown-item";
  cartList.append(noProducts);
}

cart.forEach(item => {
  let product = document.createElement("li");
  product.innerHTML = `${item.name} > €${item.price}`
  product.className = "dropdown-item my-2";
  cartList.append(product);
});

if (cartStorage) {
  // Cart buttons
  let cartButtons = document.createElement("div");
  cartButtons.innerHTML = `
  <button id="checkout" class="btn btn-dark" type="button">Checkout</button>
  <button id="clearCart" class="btn btn-outline-dark" type="button">Clear</button>
  `;
  cartButtons.className = "d-grid gap-2 m-2";
  cartList.append(cartButtons);
  // Cart count
  let lenght = document.createElement("span");
  lenght.innerHTML = `(${cart.length})`
  lenght.className = "badge";
  cartCount.append(lenght);
  // Clear cart
  let clearCart = document.getElementById("clearCart");
  clearCart.addEventListener("click", () => fnClearCart());
} else { };

// Template
(function () {
  "use strict";

  // Easy selector helper function
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  // Easy event listener function
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  // Easy on scroll event listener
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  // Porfolio isotope and filter
  window.addEventListener('load', () => {
    let portfolioContainer = select('#productGrid');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.item',
      });

      let portfolioFilters = select('#filters a', true);

      on('click', '#filters a', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('active');
        });
        this.classList.add('active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  // Testimonials slider
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  // Animation on scroll
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()
// Product list class + new object
class Product {
  constructor(sku, name, variant, price, image) {
    this.sku = sku;
    this.name = name;
    this.variant = variant;
    this.price = price;
    this.image = image;
  }
};

const productList = [];

productList.push(new Product(1463555, "Aloha Monoi Shower Gel", "coconut", 9, "senses-aloha-monoi-shower-gel-500ml.jpg"));
productList.push(new Product(1469365, "Flamingo Sunset Shower Gel", "tropical", 9, "senses-flamingo-sunset-shower-gel-500ml.jpg"));
productList.push(new Product(1466568, "Simply Luxurious Shower Gel", "vanilla", 9, "senses-simply-luxurious-shower-gel-500ml.jpg"));
productList.push(new Product(1460963, "Simply Luxurious Bubble Bath", "vanilla", 11, "senses-simply-luxurious-bubble-bath-1000ml.jpg"));
productList.push(new Product(1460959, "Aloha Monoi Bubble Bath", "coconut", 11, "senses-aloha-monoi-bubble-bath-1000ml.jpg"));
productList.push(new Product(1468364, "Flamingo Sunset Bubble Bath", "tropical", 11, "senses-flamingo-sunset-bubble-bath-1000ml.jpg"));
productList.push(new Product(1491568, "Flamingo Sunset Body Mist", "tropical", 6, "senses-flamingo-sunset-body-mist-100ml.jpg"));
productList.push(new Product(1491601, "Simply Luxurious Body Mist", "vanilla", 6, "senses-simply-luxurious-body-mist-100ml.jpg"));
productList.push(new Product(1491605, "Aloha Monoi Body Mist", "coconut", 6, "senses-aloha-monoi-body-mist-100ml.jpg"));

let productGrid = document.getElementById("productGrid");
let cartList = document.getElementById("cartList");
let cartCount = document.getElementById("cartCount");

const cart = JSON.parse(localStorage.getItem("cart")) || [];
cart.length === 0 ? fnEmptyCart() : fnFetchCart();

// Add to cart arrow function
const pushToCart = (sku) => {
  let pushToCart = productList.find((item) => item.sku === sku);
  cart.push({ sku: pushToCart.sku, name: pushToCart.name, price: pushToCart.price, image: pushToCart.image });
  localStorage.setItem("cart", JSON.stringify(cart));
  fnFetchCart();
};

// Fetch cart function
function fnFetchCart() {
  if (cart.length === 0) {
    fnEmptyCart();/*  */
  } else {
    cartList.innerHTML = "";
    cartCount.innerHTML = "";
    // Cart dropdown products
    cart.forEach(item => {
      let product = document.createElement("li");
      product.innerHTML = `${item.name} · €${item.price}`
      product.className = "dropdown-item my-2";
      cartList.append(product);
    });
    // Cart dropdown buttons
    let btnCart = document.createElement("div");
    btnCart.innerHTML = `
    <li><hr class="dropdown-divider"></li>
    <button id="btnCheckout" class="btn btn-dark" type="button">Checkout</button>
    <button id="btnClear" class="btn btn-outline-dark" type="button">Clear</button>
    `;
    btnCart.className = "d-grid gap-2 m-2";
    cartList.append(btnCart);
    // Cart dropdown count
    let lenght = document.createElement("span");
    lenght.innerHTML = `${cart.length}`;
    lenght.className = "badge rounded-pill text-bg-light";
    cartCount.append(lenght);
    // Clear cart
    let btnClear = document.getElementById("btnClear");
    btnClear.addEventListener("click", () => {
      cart.splice(0, cart.length);
      fnFetchCart();
    });
  }
};

// Empty cart function
function fnEmptyCart() {
  cartList.innerHTML = "";
  cartCount.innerHTML = "";
  let empty = document.createElement("li");
  empty.innerHTML = `Your cart is currently empty.`;
  empty.className = "dropdown-item";
  cartList.append(empty);
};

productList.forEach(item => {
  let product = document.createElement("div");
  product.innerHTML = `
  <div class="item-wrap fancybox">
  <div class="product-detail">
  <h3>${item.name}</h3>
  <span>${item.variant}</span>
  <div>
  <button id="btnAdd${item.sku}" class="btn btn-outline-light" type="button">Add to cart <i class="bi bi-bag-plus"></i></button>
  </div>
  </div>
  <img class="img-fluid" src="./img/${item.image}">
  </div>
  `;
  product.className = `item col-sm-6 col-md-4 col-lg-4 mb-4 ${item.variant}`;
  productGrid.append(product);
  // Add to cart
  let btnAdd = document.getElementById(`btnAdd${item.sku}`);
  btnAdd.addEventListener("click", () => {
    pushToCart(item.sku);
    Toastify({
      text: "Product added to cart",
      style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
      duration: 3000
    }).showToast();
  });
});


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
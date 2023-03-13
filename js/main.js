let cartList = document.getElementById("cartList");
let cartCount = document.getElementById("cartCount");

const cart = JSON.parse(localStorage.getItem("cart")) || [];
cart.length === 0 ? fnEmptyCart() : fnUpdateCart();

// Fetch products with json
fetch('./json/productList.json')
  .then(response => response.json())
  .then(productList => fnShowProducts(productList))

function fnShowProducts(productList) {
  productList.forEach(item => {
    let productGrid = document.getElementById("productGrid");
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
      <img class="img-fluid" src="./img/${item.imgSrc}" alt="${item.name}">
    </div>
    `;
    product.className = `item col-sm-6 col-md-4 col-lg-4 mb-4 ${item.variant}`;
    productGrid.append(product);

    // Add to cart button
    let btnAdd = document.getElementById(`btnAdd${item.sku}`);
    btnAdd.addEventListener("click", () => { fnAddToCart(item.sku) });
  });

  // Add to cart function
  const fnAddToCart = (sku) => {
    Toastify({
      text: "Added to cart",
      close: true,
      position: "center",
      style: { background: "linear-gradient(to right, rgb(0, 176, 155), rgb(150, 201, 61))" },
      duration: 3000
    }).showToast();
    if (cart.find((item) => item.sku === sku)) {
      const updatedQty = cart.find((item) => item.sku === sku);
      updatedQty.qty++;
      localStorage.setItem("cart", JSON.stringify(cart));
      fnUpdateCart();
    } else {
      const newProduct = productList.find((item) => item.sku === sku);
      cart.push({
        sku: newProduct.sku,
        name: newProduct.name,
        price: newProduct.price,
        imgSrc: newProduct.imgSrc,
        qty: 1,
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      fnUpdateCart();
    }
  };
};

// Update cart function
function fnUpdateCart() {
  if (cart.length === 0) {
    fnEmptyCart();
  } else {
    cartList.innerHTML = "";
    cartCount.innerHTML = "";

    // Cart products
    cart.forEach(item => {
      let itemSubtotal = item.price * item.qty;
      let cartProduct = document.createElement("li");
      cartProduct.innerHTML = `
      <div class="d-flex justify-content-start align-items-center">
        <div class="p-2"><img src="./img/${item.imgSrc}" width="60" alt="${item.name}"></div>
        <div class="p-2 flex-grow-1 d-flex flex-column">
          <div>${item.name}</div>
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <button id="btnReduceQty${item.sku}" type="button" class="btn btn-sm">-</button>
              <span class="text-center">${item.qty}</span>
              <button id="btnIncreaseQty${item.sku}" type="button" class="btn btn-sm">+</button>
              <button id="btnDelete${item.sku}" type="button" class="btn btn-sm"><i class="bi bi-trash3-fill"></i></button>
            </div>
            <div>€${itemSubtotal}</div>
          </div>
        </div>
      </div>
      `;
      cartProduct.className = "list-group-item";
      cartList.append(cartProduct);

      // Reduce qty button
      let btnReduceQty = document.getElementById(`btnReduceQty${item.sku}`);
      btnReduceQty.addEventListener("click", () => { fnReduceQty(item.sku) });

      // Increase qty button
      let btnIncreaseQty = document.getElementById(`btnIncreaseQty${item.sku}`);
      btnIncreaseQty.addEventListener("click", () => { fnIncreaseQty(item.sku) });

      // Delete button
      let btnDelete = document.getElementById(`btnDelete${item.sku}`);
      btnDelete.addEventListener("click", () => { fnDeleteItem(item.sku) });
    });

    // Cart footer
    let totalAmount = 0;
    cart.forEach(item => {
      totalAmount += item.price * item.qty;
    });

    let cartFooter = document.createElement("li");
    cartFooter.innerHTML = `
    <p class="text-center">Subtotal: €${totalAmount}</p>
    <button id="btnCheckout" class="btn btn-dark" type="button">Checkout</button>
    <button id="btnClear" class="btn btn-outline-dark" type="button">Clear</button>
    `;
    cartFooter.className = "list-group-item d-grid gap-2 mt-2";
    cartList.append(cartFooter);

    // Cart count
    let totalQty = 0;
    cart.forEach(item => {
      totalQty += item.qty;
    });

    let count = document.createElement("span");
    count.innerHTML = `${totalQty}`;
    count.className = "badge rounded-pill text-bg-light";
    cartCount.append(count);

    // Clear cart button
    let btnClear = document.getElementById("btnClear");
    btnClear.addEventListener("click", () => fnClearCart());
  };
};

// Increase qty function
const fnIncreaseQty = (sku) => {
  Toastify({
    text: "Quantity updated",
    close: true,
    position: "center",
    style: { background: "linear-gradient(to right, rgb(0, 176, 155), rgb(150, 201, 61))" },
    duration: 3000
  }).showToast();
  const updatedQty = cart.find((item) => item.sku === sku);
  updatedQty.qty++;
  localStorage.setItem("cart", JSON.stringify(cart));
  fnUpdateCart();
};

// Reduce qty function
const fnReduceQty = (sku) => {
  const updatedQty = cart.find((item) => item.sku === sku);
  if (updatedQty.qty > 1) {
    Toastify({
      text: "Quantity updated",
      close: true,
      position: "center",
      style: { background: "linear-gradient(to right, rgb(0, 176, 155), rgb(150, 201, 61))" },
      duration: 3000
    }).showToast();
    updatedQty.qty--;
    localStorage.setItem("cart", JSON.stringify(cart));
    fnUpdateCart();
  } else {
    fnDeleteItem();
  }
};

// Delete item function
const fnDeleteItem = (sku) => {
  Toastify({
    text: "Deleted from cart",
    close: true,
    position: "center",
    style: { background: "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))" },
    duration: 3000
  }).showToast();
  const itemIndex = cart.findIndex((item) => item.sku === sku);
  cart.splice(itemIndex, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  fnUpdateCart();
};

// Clear cart function
function fnClearCart() {
  cart.splice(0, cart.length);
  localStorage.clear();
  fnUpdateCart();
  Toastify({
    text: "Cart cleared",
    close: true,
    position: "center",
    style: { background: "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))" },
    duration: 3000
  }).showToast();
};

// Empty cart function
function fnEmptyCart() {
  cartList.innerHTML = "";
  cartCount.innerHTML = "";
  let empty = document.createElement("li");
  empty.innerHTML = `Your cart is currently empty.`;
  empty.className = "list-group-item";
  cartList.append(empty);
};



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

})();
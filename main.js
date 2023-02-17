const products = [
    { sku: 1491605, variant: "Aloha Monoi", product: "Body Mist", regularPrice: 6, size: "100ml" },
    { sku: 1460959, variant: "Aloha Monoi", product: "Bubble Bath", regularPrice: 11, size: "1lt" },
    { sku: 1463555, variant: "Aloha Monoi", product: "Shower Gel", regularPrice: 9, size: "500ml" },
    { sku: 1491568, variant: "Flamingo Sunset", product: "Body Mist", regularPrice: 6, size: "100ml" },
    { sku: 1468364, variant: "Flamingo Sunset", product: "Bubble Bath", regularPrice: 11, size: "1lt" },
    { sku: 1469365, variant: "Flamingo Sunset", product: "Shower Gel", regularPrice: 9, size: "500ml" },
    { sku: 1491599, variant: "Lavender Calm", product: "Body Mist", regularPrice: 6, size: "100ml" },
    { sku: 1463828, variant: "Lavender Calm", product: "Bubble Bath", regularPrice: 11, size: "1lt" },
    { sku: 1458828, variant: "Lavender Calm", product: "Shower Gel", regularPrice: 9, size: "500ml" },
    { sku: 1491601, variant: "Simply Luxurious", product: "Body Mist", regularPrice: 6, size: "100ml" },
    { sku: 1460963, variant: "Simply Luxurious", product: "Bubble Bath", regularPrice: 11, size: "1lt" },
    { sku: 1466568, variant: "Simply Luxurious", product: "Shower Gel", regularPrice: 9, size: "500ml" },
];

const cart = [];

let flagProduct = true;
let flagVariant = true;
let flagQuantity = true;
let flagAdd = true;
let flagShipping = true;

let customerName = prompt("Bienvenido :) Por favor, ingresá tu nombre.");

while (flagAdd) {
    addProduct = prompt(`${customerName}, por favor ingresá AGREGAR para sumar un producto al carrito, CONTINUAR para avanzar al siguiente paso o CANCELAR para salir.`).toLowerCase();
    if (addProduct === "agregar") {
        fnProduct();
    } else if (addProduct === "continuar") {
        fnShipping();
    } else if (addProduct === "cancelar") {
        flagAdd = false;
    } else {
        alert(`Ouch :( "${addProduct}" no es válido, por favor ingresá un valor válido.`);
    }

    function fnProduct() {
        productType = prompt(`Elegí uno de los siguientes productos o CANCELAR para salir:
        BRUMA CORPORAL
        BAÑO DE BURBUJAS
        GEL DE DUCHA`).toLowerCase();
        while (flagProduct) {
            if (productType === "bruma corporal") {
                product = "Body Mist";
                fnVariant();
                break;
            } else if (productType === "baño de burbujas") {
                product = "Bubble Bath";
                fnVariant();
                break;
            } else if (productType === "jabón de manos") {
                product = "Hand Wash";
                fnVariant();
                break;
            } else if (productType === "gel de ducha") {
                product = "Shower Gel";
                fnVariant();
                break;
            } else if (productType == "cancelar") {
                flagProduct = false;
            } else {
                alert(`Ouch :( "${productType}" no es válido, por favor elegí otro.`);
                productType = prompt(`Elegí uno de los siguientes productos o CANCELAR para salir:
                BRUMA CORPORAL
                BAÑO DE BURBUJAS
                GEL DE DUCHA`).toLowerCase();
            }
        }
    }

    function fnVariant() {
        variantType = prompt(`Ahora seleccioná la fragancia o CANCELAR para salir:
        COCO
        TROPICAL
        LAVANDA
        VAINILLA`).toLowerCase();
        while (flagVariant) {
            if (variantType === "coco") {
                variant = "Aloha Monoi";
                fnQuantity();
                break;
            } else if (variantType === "tropical") {
                variant = "Flamingo Sunset";
                fnQuantity();
                break;
            } else if (variantType === "lavanda") {
                variant = "Lavender Calm";
                fnQuantity();
                break;
            } else if (variantType === "vainilla") {
                variant = "Simply Luxurious";
                fnQuantity();
                break;
            } else if (variantType == "cancelar") {
                flagVariant = false;
            } else {
                alert(`Ouch :( "${variantType}" no es válida, por favor elegí otra.`);
                variantType = prompt(`Ahora seleccioná la fragancia o CANCELAR para salir:
                COCO
                TROPICAL
                LAVANDA
                VAINILLA`).toLowerCase();
            }
        }
    }

    function fnQuantity() {
        quantity = parseInt(prompt("Ingresá la cantidad de unidades o 0 para salir."));
        while (flagQuantity) {
            if (quantity > 0) {
                fnAddToCart();
                break;
            } else if (quantity == 0) {
                flagQuantity = false;
            } else {
                alert("Por favor, ingresá una cantidad válida.");
                quantity = parseInt(prompt("Ingresá la cantidad de unidades o 0 para salir."));
            }
        }
    }

    function fnAddToCart() {
        const addToCart = products.find((addToCart) => addToCart.product === product && addToCart.variant === variant);
        alert(`Súper, excelente elección, se agregó al carrito ${quantity}x ${addToCart.variant} ${addToCart.product} a ${addToCart.regularPrice}€ cada uno.`);
        productAddedToCart = { sku: addToCart.sku, variant: addToCart.variant, product: addToCart.product, regularPrice: addToCart.regularPrice, quantity: quantity };
        cart.push(productAddedToCart);
    }
}

function fnShipping() {
    shipping = prompt("¿El envío es LOCAL o INTERNACIONAL? Podés ingresar CANCELAR si deseás salir.").toLowerCase();
    while (flagShipping) {
        if (shipping === "local") {
            shippingCost = 10;
            fnCheckout();
            break;
        } else if (shipping === "internacional") {
            shippingCost = 50;
            fnCheckout();
            break;
        } else if (shipping == "cancelar") {
            flagShipping = false;
        } else {
            alert("Por favor, ingresá un tipo de envío válido.");
            shipping = prompt("¿El envío es LOCAL o INTERNACIONAL? Podés ingresar CANCELAR si deseás salir.").toLowerCase();
        }
    }
}

function fnCheckout() {
    let totalProducts = cart.reduce((acum, item) => acum + item.regularPrice * item.quantity, 0);
    let totalAmount = totalProducts + shippingCost
    let summary = `¡Muchas gracias, ${customerName}! Este es el resumen de tu pedido:
    Envío ${shipping}: ${shippingCost}€
    Costo total: ${totalAmount}€`;
    cart.forEach((item) => {
        summary += `
        ${item.quantity}x ${item.variant} ${item.product} - Unidad: ${item.regularPrice}€ Total: ` + item.regularPrice * item.quantity + `€`
    });
    alert(summary);
    flagAdd = false;
}
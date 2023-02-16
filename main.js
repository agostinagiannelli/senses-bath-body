const productList = [
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
let addProduct;
let productType;
let variantType;
let quantity;
let productAddToCart;
let shipping;
let shippingCost = 0;

let customerName = prompt("Bienvenido :) Por favor, ingresá tu nombre.");

while (flagAdd) {
    addProduct = prompt(`${customerName}, por favor ingresá aceptar si deseás agregar un producto al carrito o rechazar si deseas continuar. Si deseás salir podés ingresar cancelar.`);
    if (addProduct === "aceptar") {
        fnProduct();
    } else if (addProduct === "rechazar") {
        fnShipping();
    } else if (addProduct === "cancelar") {
        flagAdd = false;
    } else {
        alert(`Ouch :( "${addProduct}" no es válido, por favor ingresá un valor válido.`);
    }

    function fnProduct() {
        productType = prompt("Elegí uno de los siguientes productos: bruma corporal, baño de burbujas o gel de ducha. Si deseás salir ingresá cancelar.").toLowerCase();
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
                productType = prompt("Elegí uno de los siguientes productos: bruma corporal, baño de burbujas o gel de ducha. Si deseás salir ingresá cancelar.").toLowerCase();
            }
        }
    }

    function fnVariant() {
        variantType = prompt("Ahora seleccioná la fragrancia: coco, tropical, lavanda o vainilla. Si deseás salir ingresá cancelar.").toLowerCase();
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
                funcQuantity();
                break;
            } else if (variantType === "vainilla") {
                variant = "Simply Luxurious";
                fnQuantity();
                break;
            } else if (variantType == "cancelar") {
                flagVariant = false;
            } else {
                alert(`Ouch :( "${variantType}" no es válida, por favor elegí otra.`);
                variantType = prompt("Seleccioná la fragrancia: coco, tropical, lavanda o vainilla. Si deseás salir ingresá cancelar.").toLowerCase();
            }
        }
    }

    function fnQuantity() {
        quantity = parseInt(prompt("Ingresá la cantidad de unidades. Para salir ingresá 0."));
        while (flagQuantity) {
            if (quantity > 0) {
                fnAddToCart();
                break;
            } else if (quantity == 0) {
                flagQuantity = false;
            } else {
                alert("Por favor, ingresá una cantidad válida.");
                quantity = parseInt(prompt("Ingresá la cantidad de unidades. Para salir ingresá 0."));
            }
        }
    }

    function fnAddToCart() {
        const addToCart = productList.find((item) => item.product === product && item.variant === variant);
        alert(`Súper, excelente elección: ${quantity}x ${addToCart.variant} ${addToCart.product} - ${addToCart.regularPrice}€ cada uno.`);
        productAddToCart = { sku: addToCart.sku, variant: addToCart.variant, product: addToCart.product, regularPrice: addToCart.regularPrice };
        cart.push(productAddToCart);
        alert(cart);
    }
}

/* function fnShipping() {
    shipping = prompt("¿El envío es local o internacional? Podés ingresar cancelar si deseás salir.").toLowerCase();
    while (flagShipping) {
        if (shipping === "local") {
            shippingCost = 10;
            alert(`Tu costo de envío será de ${shippingCost}€. A continuación verás el resumen de tu pedido.`);
            fnTotalCost();
            break;
        } else if (shipping === "internacional") {
            shippingCost = 50;
            alert(`Tu costo de envío será de ${shippingCost}€. A continuación verás el resumen de tu pedido.`);
            fnTotalCost();
            break;
        } else if (shipping == "cancelar") {
            flagShipping = false;
        } else {
            alert("Por favor, ingresá un tipo de envío válido.");
            shipping = prompt("¿El envío es local o internacional? Podés ingresar cancelar si deseás salir.").toLowerCase();
        }
    }
} */

/* // arrow function para calcular el costo total desde navegador

function fnTotalCost() {
    const add = (a, b) => a + b;
    const multiply = (a, b) => a * b;
    let totalCost = add(multiply(regularPrice, quantity), shippingCost);
    let summary = `¡Muchas gracias, ${customerName}! Este es el resumen de tu pedido: ${quantity}x ${variant} ${product} con envío ${shipping}. El costo total será de ${totalCost}€.`;
    alert(summary);
} */
// function para listar productos con console.log

/* function Product(sku, title, price, size){
    this.sku = sku;
    this.title = title;
    this.price = price;
    this.size = size;
    this.list = function(){console.log(`${this.title} ${this.size} (SKU: ${this.sku}) for ${this.price}€`)};
}

const product01 = new Product(1491605, "Aloha Monoi Body Mist", 6, "100ml");
const product02 = new Product(1460959, "Aloha Monoi Bubble Bath", 11, "1lt");
const product03 = new Product(1463555, "Aloha Monoi Shower Gel", 9, "500ml");

const product04 = new Product(1491568, "Flamingo Sunset Body Mist", 6, "100ml");
const product05 = new Product(1468364, "Flamingo Sunset Bubble Bath", 11, "1lt");
const product06 = new Product(1469365, "Flamingo Sunset Shower Gel", 9, "500ml");

const product07 = new Product(1491599, "Lavender Calm Body Mist", 6, "100ml");
const product08 = new Product(1463828, "Lavender Calm Bubble Bath", 11, "1lt");
const product09 = new Product(1458828, "Lavender Calm Hand Wash", 8, "250ml");

const product10 = new Product(1491601, "Simply Luxurious Body Mist", 6, "100ml");
const product11 = new Product(1460963, "Simply Luxurious Bubble Bath", 11, "1lt");
const product12 = new Product(1466568, "Simply Luxurious Shower Gel", 9, "500ml");

product01.list();
product02.list();
product03.list();
product04.list();
product05.list();
product06.list();
product07.list();
product08.list();
product09.list();
product10.list();
product11.list();
product12.list(); */

// while + if + function para seleccionar producto, cantidad y tipo de envío desde navegador

let flagProduct = true;
let flagVariant = true;
let flagQuantity = true;
let flagShipping = true;
let variantType;
let quantity;
let shipping;
let shippingCost = 0;

let productType = prompt("¿Qué tipo de producto estás buscando? Elegí uno de los siguientes: bruma corporal, baño de burbujas, jabón de manos o gel de ducha. Si deseás salir ingresá cancelar.").toLowerCase();

while (flagProduct) {
    if (productType === "bruma corporal") {
        alert("Súper, excelente elección. Seguimos.");
        product = "Body Mist";
        regularPrice = 6;
        funcVariant();
        break;
    } else if (productType === "baño de burbujas") {
        alert("Súper, excelente elección. Seguimos.");
        product = "Bubble Bath";
        regularPrice = 11;
        funcVariant();
        break;
    } else if (productType === "jabón de manos") {
        alert("Súper, excelente elección. Seguimos.");
        product = "Hand Wash";
        regularPrice = 8;
        funcVariant();
        break;
    } else if (productType === "gel de ducha") {
        alert("Súper, excelente elección. Seguimos.");
        product = "Shower Gel";
        regularPrice = 9;
        funcVariant();
        break;
    } else if (productType == "cancelar") {
        flagProduct = false;
    } else {
        alert(`Ouch :( "${productType}" no es válido, por favor elegí otro.`);
        productType = prompt("¿Qué tipo de producto estás buscando? Elegí uno de los siguientes: bruma corporal, baño de burbujas, jabón de manos o gel de ducha. Si deseás salir ingresá cancelar.").toLowerCase();
    }
}

function funcVariant() {
    variantType = prompt("¿Qué fragancia es la que más te gusta? Elegí una de los siguientes: coco, tropical, lavanda o vainilla. Si deseás salir ingresá cancelar.").toLowerCase();
    while (flagVariant) {
        if (variantType === "coco") {
            alert("Genial, avanzamos al siguiente paso.");
            variant = "Aloha Monoi";
            funcQuantity();
            break;
        } else if (variantType === "tropical") {
            alert("Genial, avanzamos al siguiente paso.");
            variant = "Flamingo Sunset";
            funcQuantity();
            break;
        } else if (variantType === "lavanda") {
            alert("Genial, avanzamos al siguiente paso.");
            variant = "Lavender Calm";
            funcQuantity();
            break;
        } else if (variantType === "vainilla") {
            alert("Genial, avanzamos al siguiente paso.");
            variant = "Simply Luxurious";
            funcQuantity();
            break;
        } else if (variantType == "cancelar") {
            flagVariant = false;
        } else {
            alert(`Ouch :( "${variantType}" no es válida, por favor elegí otra.`);
            variantType = prompt("¿Qué fragancia es la que más te gusta? Elegí una de los siguientes: coco, tropical, lavanda o vainilla. Si deseás salir ingresá cancelar.").toLowerCase();
        }
    }
}

function funcQuantity() {
    quantity = parseInt(prompt("Ingresá la cantidad de unidades. Para salir ingresá 0."));
    while (flagQuantity) {
        if (quantity > 0) {
            alert("Excelente, tenemos esa cantidad disponible. Seguimos.");
            funcShipping();
            break;
        } else if (quantity == 0) {
            flagQuantity = false;
        } else {
            alert("Por favor, ingresá una cantidad válida.");
            quantity = parseInt(prompt("Ingresá la cantidad de unidades. Para salir ingresá 0."));
        }
    }
}

function funcShipping() {
    shipping = prompt("¿El envío es local o internacional? Podés ingresar cancelar si deseás salir.").toLowerCase();
    while (flagShipping) {
        if (shipping === "local") {
            shippingCost = 10;
            alert(`Tu costo de envío será de ${shippingCost}€. A continuación verás el resumen de tu pedido.`);
            funcTotalCost();
            break;
        } else if (shipping === "internacional") {
            shippingCost = 50;
            alert(`Tu costo de envío será de ${shippingCost}€. A continuación verás el resumen de tu pedido.`);
            funcTotalCost();
            break;
        } else if (shipping == "cancelar") {
            flagShipping = false;
        } else {
            alert("Por favor, ingresá un tipo de envío válido.");
            shipping = prompt("¿El envío es local o internacional? Podés ingresar cancelar si deseás salir.").toLowerCase();
        }
    }
}

// arrow function para calcular el costo total desde navegador

function funcTotalCost() {
    const add = (a, b) => a + b;
    const multiply = (a, b) => a * b;
    let totalCost = add(multiply(regularPrice, quantity), shippingCost);
    let summary = `¡Muchas gracias! Este es el resumen de tu pedido: ${quantity}x ${variant} ${product} con envío ${shipping}. El costo total será de ${totalCost}€.`;
    alert(summary);
}
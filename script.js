// --- 2.1. Типы данных: примитивы и объекты ---
const shopName = "Global Trade";
let itemsCount = 150;           
let isOpen = true;               
let saleManager = null;          

// Объект товара
const mainProduct = {
    id: 101,
    title: "Игровой монитор",
    price: 25000,
    category: "Электроника",
    inStock: true
};

console.log("Название магазина:", shopName, "| Тип:", typeof shopName);
console.log("Пример объекта товара:", mainProduct);


// --- 2.2. Приведение типов и ввод данных ---
document.getElementById('btn-input').onclick = function() {
    let userPrice = prompt("Введите желаемую цену товара:", "500");
    
    let numericPrice = Number(userPrice);
    
    if (isNaN(numericPrice)) {
        alert("Ошибка! Вы ввели не число.");
    } else {
        let message = "Цена зафиксирована: " + numericPrice + " руб.";
        document.getElementById('output-board').innerText = message;
        console.log("Тип после приведения:", typeof numericPrice);
    }
};


// --- 2.3. Операторы: арифметика, сравнение, логика ---
function calculateDiscount(price, percent) {
    let discountSum = (price * percent) / 100;
    return price - discountSum;
}


let isPremium = true;
let currentPrice = 5000;
if (currentPrice > 3000 && isPremium) {
    console.log("Доступна бесплатная доставка");
}


// --- 2.4. Условия: ветвление (if/else, switch) ---
document.getElementById('btn-logic').onclick = function() {
    let category = "Электроника";
    let board = document.getElementById('output-board');

    switch (category) {
        case "Электроника":
            board.innerText = "Выбрана категория гаджетов. Скидка 5%.";
            break;
        case "Одежда":
            board.innerText = "Выбрана одежда. Скидка 10%.";
            break;
        default:
            board.innerText = "Категория не определена.";
    }
};


// --- 2.5. Циклы: for, while ---
document.getElementById('btn-loop').onclick = function() {
    const catalog = ["Телефон", "Ноутбук", "Наушники", "Клавиатура"];
    let result = "Список товаров: ";

    for (let i = 0; i < catalog.length; i++) {
        result += (i + 1) + ". " + catalog[i] + " ";
        console.log("Обработка товара:", catalog[i]);
    }

    document.getElementById('output-board').innerText = result;
};


// --- 2.6. Интерактивный вывод ---
console.log("Лабораторная работа №2 успешно инициализирована.");

// 1. Поиск товаров по названию
const searchProducts = (list, query) => {
    return list.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
};

// 2. Фильтрация по категории
const filterByCategory = (list, category) => {
    if (!category || category === "Все") return list;
    return list.filter(item => item.category === category);
};

// 3. Сортировка по цене 
const sortByPrice = (list) => {
    return [...list].sort((a, b) => a.price - b.price);
};

// 4. Агрегация данных 
const calculateTotal = (list) => {
    return list.reduce((sum, item) => sum + item.price, 0);
};

// 5. Регулярные выражения
const titleRegex = /^[a-zA-Zа-яА-Я0-9\s]{3,30}$/; 
const priceRegex = /^\d+$/; 

// 6. Валидация данных нового товара
 
const validateProduct = (title, price, category) => {
    const errors = [];
    
    //  Нормализация 
    const cleanTitle = title.trim();

    if (!titleRegex.test(cleanTitle)) {
        errors.push("Название должно быть от 3 до 30 символов и без спецсимволов.");
    }
    if (!priceRegex.test(price) || parseInt(price) <= 0) {
        errors.push("Цена должна быть целым положительным числом.");
    }
    if (!category) {
        errors.push("Выберите категорию из списка.");
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
};

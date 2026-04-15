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
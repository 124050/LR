// 1. Находим основные элементы на странице
const outputBoard = document.getElementById('output-board');
const messageBox = document.getElementById('message');
const categorySelect = document.getElementById('category-select');

/**
* Основная функция отрисовки списка товаров
* @param {Array} items 
*/

function renderList(items) {
    // Очищаем контейнер перед отрисовкой
    outputBoard.innerHTML = '';

    // Если массив пустой — выводим уведомление
    if (items.length === 0) {
        outputBoard.innerHTML = '<p class="empty-msg">Товары не найдены или категория пуста.</p>';
        messageBox.textContent = 'Результатов: 0. Сумма: 0 руб.';
        return;
    }

    // Проходим по массиву и создаем карточки 
    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        // Наполняем карточку шаблоном. 
        card.innerHTML = `
            <h3>${product.title}</h3>
            <div class="info">
                <p>Категория: <span>${product.category}</span></p>
                <p>Цена: <strong>${product.price} руб.</strong></p>
            </div>
            <button class="delete-btn" data-id="${product.id}">Удалить товар</button>
        `;

        outputBoard.appendChild(card);
    });

    // Обновляем статистику 
    const total = calculateTotal(items); 
    messageBox.textContent = `Показано товаров: ${items.length}. Общая стоимость: ${total} руб.`;
}

// --- ОБРАБОТЧИКИ СОБЫТИЙ ---

// 2. Кнопка "Показать все"
document.getElementById('btn-show-all').onclick = () => {
    categorySelect.value = "Все"; 
    renderList(catalog);
};

// 3. Динамический фильтр по категориям 
categorySelect.onchange = () => {
    const selectedValue = categorySelect.value;
    const filtered = filterByCategory(catalog, selectedValue); 
    renderList(filtered);
};

// 4. Кнопка "Поиск по названию"
document.getElementById('btn-search').onclick = () => {
    const query = prompt("Введите название товара (или его часть):");
    if (query !== null) {
        const results = searchProducts(catalog, query); 
        renderList(results);
    }
};

// 5. Кнопка "Сортировать по цене"
document.getElementById('btn-sort-price').onclick = () => {
    const sorted = sortByPrice(catalog); 
    renderList(sorted);
};

// 6. Удаление товара 
outputBoard.onclick = (event) => {
    
    if (event.target.classList.contains('delete-btn')) {
        const idToDelete = parseInt(event.target.dataset.id);
        
        // Находим индекс в массиве данных
        const index = catalog.findIndex(item => item.id === idToDelete);
        
        if (index !== -1) {
            // Удаляем из исходного массива
            catalog.splice(index, 1);
            
            // Перерисовываем список с учетом текущего фильтра
            const currentCategory = categorySelect.value;
            const updatedList = filterByCategory(catalog, currentCategory);
            renderList(updatedList);
        }
    }
};

// Первичная отрисовка при загрузке страницы
window.onload = () => {
    renderList(catalog);
};

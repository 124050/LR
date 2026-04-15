// 1. Находим основные элементы на странице 
const outputBoard = document.getElementById('product-list'); 
const messageBox = document.getElementById('message');
const categorySelect = document.getElementById('filter-select'); 
const sortBtn = document.getElementById('sort-btn');

// 2. Элементы формы
const addForm = document.getElementById('add-product-form');
const errorBlock = document.getElementById('form-errors');

/**
* 3. Основная функция отрисовки списка товаров
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

        // Наполняем карточку шаблоном
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

// 4. Динамический фильтр по категориям 
categorySelect.onchange = () => {
    const selectedValue = categorySelect.value;
    const filtered = filterByCategory(catalog, selectedValue); 
    renderList(filtered);
};

// 5. Кнопка "Сортировать по цене"
sortBtn.onclick = () => {
    const sorted = sortByPrice(catalog); 
    renderList(sorted);
};

// 6. Удаление товара 
outputBoard.onclick = (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const idToDelete = parseInt(event.target.dataset.id);
        const index = catalog.findIndex(item => item.id === idToDelete);
        
        if (index !== -1) {
            catalog.splice(index, 1);
            const currentCategory = categorySelect.value;
            const updatedList = filterByCategory(catalog, currentCategory);
            renderList(updatedList);
        }
    }
};

// 7. Асинхронная инициализация данных 
 
async function loadDataAsync() {
    messageBox.textContent = "Синхронизация с базой данных...";
    
    try {
        // Имитируем сетевую задержку
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        // Рендерим начальный массив данных
        renderList(catalog);
        messageBox.textContent = "Данные успешно загружены.";
    } catch (error) {
        messageBox.textContent = "Ошибка при получении данных из системы.";
        console.error("Fetch error:", error);
    }
}

// 8. Обработка формы добавления товара
 
if (addForm) {
    addForm.onsubmit = (event) => {
        event.preventDefault(); 
        errorBlock.innerHTML = ''; 

        // Получаем значения
        const titleInput = document.getElementById('form-title').value;
        const priceInput = document.getElementById('form-price').value;
        const categoryInput = document.getElementById('form-category').value;

        // Вызываем валидацию 
        const validation = validateProduct(titleInput, priceInput, categoryInput);

        if (validation.isValid) {
            // Создаем объект 
            const newProduct = {
                id: Date.now(),
                title: titleInput.trim(),
                price: parseInt(priceInput),
                category: categoryInput
            };

            // Добавляем в общий массив 
            catalog.push(newProduct);
            
            // Сбрасываем фильтр и показываем всё
            categorySelect.value = "";
            renderList(catalog);
            
            addForm.reset();
            alert("Товар добавлен в каталог!");
        } else {
            // Вывод ошибок пользователю
            validation.errors.forEach(err => {
                const errorItem = document.createElement('p');
                errorItem.textContent = `• ${err}`;
                errorBlock.appendChild(errorItem);
            });
        }
    };
}

// 9. Запуск 
window.onload = () => {
    loadDataAsync();
};

// --- Блок A: Регулярные выражения: проверка формата ---

// Задача A1: Проверка даты YYYY-MM-DD
function isValidDateYMD(s) {
    const re = /^\d{4}-\d{2}-\d{2}$/;
    return re.test(s);
}
console.log("A1: 2026-02-18 ->", isValidDateYMD("2026-02-18")); // true
console.log("A1: 18.02.2026 ->", isValidDateYMD("18.02.2026")); // false
console.log("A1: Пустая строка ->", isValidDateYMD(""));         // false

// Задача A2: Запрет служебных символов < > { } ;
function isValidTitle(s) {
    const re = /[<>{};]/;
    return !re.test(s); 
}
console.log("A2: Обычная строка ->", isValidTitle("Hello World")); // true
console.log("A2: Строка с < ->", isValidTitle("Заголовок <script>")); // false
console.log("A2: Строка с ; ->", isValidTitle("Title;"));          // false


// --- Блок B: Извлечение и нормализация ---

// Задача B1: Извлечение чисел
function extractIds(text) {
    const matches = text.match(/\d+/g);
    return matches ? matches.map(Number) : [];
}
console.log("B1: Извлечение из 'id=5; id=12; id=30' ->", extractIds("id=5; id=12; id=30")); // [5, 12, 30]

// Задача B2: Нормализация пробелов
function normalizeSpaces(s) {
    return s.replace(/\s+/g, " ").trim();
}
console.log("B2: Нормализация '  A  B\t\tC  ' ->", `"${normalizeSpaces("  A  B\t\tC  ")}"`); // "A B C"


// --- Блок C: Формы и валидация ---

// Задача C1: Обязательное поле
function validateRequired(value, fieldName) {
    if (!value || value.trim() === "") {
        return `Поле ${fieldName} обязательно`;
    }
    return null;
}
console.log("C1: Проверка 'ok' ->", validateRequired("ok", "Заголовок")); // null
console.log("C1: Проверка '' ->", validateRequired("", "Заголовок"));   // "Поле Заголовок обязательно"

// Задача C2: Диапазон чисел
function validateNumberRange(n, min, max, fieldName) {
    const num = parseFloat(n);
    if (isNaN(num) || num < min || num > max) {
        return `Поле ${fieldName} должно быть числом от ${min} до ${max}`;
    }
    return null;
}
console.log("C2: Число 10 (0-100) ->", validateNumberRange(10, 0, 100, "Цена")); // null
console.log("C2: Число -1 (0-100) ->", validateNumberRange(-1, 0, 100, "Цена")); // Ошибка
console.log("C2: NaN ->", validateNumberRange(NaN, 0, 100, "Цена"));             // Ошибка


// --- Блок D: Чистые функции ---

// Задача D1: Создание записи
function buildRecordFromForm(raw) {
    return {
        title: normalizeSpaces(raw.title),
        value: Number(raw.value),
        status: raw.status,
        createdAt: raw.createdAt
    };
}
const rawInput = { title: "  Новый   товар  ", value: "1500", status: "active", createdAt: "2026-04-16" };
console.log("D1: Сборка объекта ->", buildRecordFromForm(rawInput));

// Задача D2: Сбор ошибок
function collectErrors(record) {
    const errors = [];
    const errTitle = validateRequired(record.title, "Заголовок");
    const errValue = validateNumberRange(record.value, 1, 1000000, "Цена");
    
    if (errTitle) errors.push(errTitle);
    if (errValue) errors.push(errValue);
    return errors;
}
console.log("D2: Валидный объект ->", collectErrors({ title: "Товар", value: 500 })); // []
console.log("D2: Объект с ошибкой ->", collectErrors({ title: "", value: -5 }));    // [ошибки]


// --- Блок E: Асинхронность ---

// Задача E1: Задержка
const delay = (ms) => new Promise(res => setTimeout(res, ms));
async function testDelay() {
    await delay(500);
    console.log("E1: done (через 500мс)");
}
testDelay();

// Задача E2: Безопасный fetch
async function safeFetchJson(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Ошибка сети");
        const data = await response.json();
        return { ok: true, data };
    } catch (error) {
        return { ok: false, error: error.message };
    }
}
safeFetchJson("https://jsonplaceholder.typicode.com/todos/1")
    .then(res => console.log("E2: Результат fetch ->", res));


// --- Блок F: JSON и контроль ошибок ---

// Задача F1: Безопасный парсинг JSON
function tryParseJson(text) {
    try {
        return { ok: true, data: JSON.parse(text) };
    } catch (e) {
        return { ok: false, error: e.message };
    }
}
console.log("F1: Корректный JSON ->", tryParseJson('{"a":1}'));
console.log("F1: Некорректный JSON ->", tryParseJson('{a:1}'));

// Задача F2: Нормализация API значений
function normalizeApiValue(x) {
    const num = Number(x);
    return isNaN(num) || x === null ? 0 : num;
}
console.log("F2: 10 ->", normalizeApiValue(10));       // 10
console.log("F2: '20' ->", normalizeApiValue("20"));   // 20
console.log("F2: null ->", normalizeApiValue(null));   // 0
console.log("F2: 'abc' ->", normalizeApiValue("abc")); // 0
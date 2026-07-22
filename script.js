const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const paletteContainer = document.getElementById('palette');
const sourceImage = document.getElementById('sourceImage');

let currentColor = '#000000';
let isDrawing = false;

// 1. Генерируем 25 случайных цветов для палитры
function generatePalette() {
    paletteContainer.innerHTML = ''; // Очищаем перед созданием
    for (let i = 0; i < 25; i++) {
        const color = `hsl(${Math.random() * 360}, 70%, 50%)`;
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = color;

        swatch.onclick = () => {
            // Убираем класс active у всех
            document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
            // Добавляем активному
            swatch.classList.add('active');
            currentColor = color;
        };

        paletteContainer.appendChild(swatch);
    }


// Делаем первый цвет активным по умолчанию paletteContainer.firstChild.classList.add('active'); currentColor = paletteContainer.firstChild.style.backgroundColor; }
// 2. Логика рисования function startDrawing(e) { isDrawing = true; draw(e); }
function stopDrawing() { isDrawing = false; ctx.beginPath(); // Чтобы линии не соединялись }
function draw(e) { if (!isDrawing) return;
// Получаем координаты клика относительно холста
const rect = canvas.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

ctx.lineWidth = 10;
ctx.lineCap = 'round';
ctx.strokeStyle = currentColor;

ctx.lineTo(x, y);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(x, y);
}
function clearCanvas() { ctx.clearRect(0, 0, canvas.width, canvas.height); }
// 3. Инициализация canvas.addEventListener('mousedown', startDrawing); canvas.addEventListener('mousemove', draw); canvas.addEventListener('mouseup', stopDrawing); canvas.addEventListener('mouseout', stopDrawing);
// Запуск generatePalette();
// Проверка загрузки картинки sourceImage.onload = () => { console.log("Фото успешно загружено!"); }; sourceImage.onerror = () => { console.error("Ошибка: Файл photo.jpg не найден. Проверьте имя файла в GitHub."); sourceImage.alt = "Файл photo.jpg не найден!"; };
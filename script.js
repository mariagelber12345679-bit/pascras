const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const paletteContainer = document.getElementById('palette');
const sourceImage = document.getElementById('sourceImage');

let currentColor = '#000000';
let isDrawing = false;

// 1. Генерируем 25 случайных цветов
function generatePalette() {
    paletteContainer.innerHTML = '';
    for (let i = 0; i < 25; i++) {
        const color = `hsl(${Math.random() * 360}, 70%, 50%)`;
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = color;

        swatch.onclick = () => {
            document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            currentColor = color;
        };
        paletteContainer.appendChild(swatch);
    }
    // Делаем первый цвет активным
    if (paletteContainer.firstChild) {
        paletteContainer.firstChild.classList.add('active');
        currentColor = paletteContainer.firstChild.style.backgroundColor;
    }
}

// 2. Логика рисования
function startDrawing(e) {
    isDrawing = true;
    draw(e); // Рисуем точку при клике
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath(); // Сбрасываем путь, чтобы линии не соединялись
}

function draw(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath(); // Начинаем новый сегмент
    ctx.moveTo(x, y); // Перемещаемся в текущую точку
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 3. Инициализация
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

generatePalette();

sourceImage.onload = () => console.log("Фото успешно загружено!");
sourceImage.onerror = () => console.error("Ошибка: Файл не найден.");
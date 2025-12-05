// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация счетчика
    initializeCounter();
    
    // Инициализация счетчика посетителей
    initializeVisitorCounter();
    
    // Инициализация даты
    initializeDate();
    
    // Инициализация обработчиков событий
    initializeEventHandlers();
    
    // Показываем приветственное уведомление
    showNotification('Сайт успешно загружен! Добро пожаловать!', 'success');
});

// Работа со счетчиком
let counter = 0;

function initializeCounter() {
    // Загружаем значение из localStorage
    const savedCounter = localStorage.getItem('siteCounter');
    counter = savedCounter ? parseInt(savedCounter) : 0;
    updateCounterDisplay();
}

function updateCounterDisplay() {
    const counterElement = document.getElementById('counter');
    if (counterElement) {
        counterElement.textContent = counter;
        
        // Меняем цвет в зависимости от значения
        if (counter > 0) {
            counterElement.style.color = '#667eea';
        } else if (counter < 0) {
            counterElement.style.color = '#e53e3e';
        } else {
            counterElement.style.color = '#718096';
        }
    }
}

function incrementCounter() {
    counter++;
    localStorage.setItem('siteCounter', counter);
    updateCounterDisplay();
    showNotification(`Счетчик увеличен: ${counter}`, 'info');
}

function decrementCounter() {
    counter--;
    localStorage.setItem('siteCounter', counter);
    updateCounterDisplay();
    showNotification(`Счетчик уменьшен: ${counter}`, 'info');
}

function resetCounter() {
    counter = 0;
    localStorage.setItem('siteCounter', counter);
    updateCounterDisplay();
    showNotification('Счетчик сброшен!', 'warning');
}

// Счетчик посетителей
function initializeVisitorCounter() {
    let visitorCount = localStorage.getItem('visitorCount') || 0;
    visitorCount = parseInt(visitorCount) + 1;
    localStorage.setItem('visitorCount', visitorCount);
    
    const visitorElement = document.getElementById('visitorCount');
    if (visitorElement) {
        visitorElement.textContent = visitorCount;
    }
}

// Дата и время
function initializeDate() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
    };
    
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString('ru-RU', options);
    }
}

// Работа с изображением
let imageRotation = 0;
let isGrayscale = false;

function applyImageEffects() {
    const image = document.getElementById('demoImage');
    if (!image) return;
    
    let filter = '';
    if (isGrayscale) {
        filter += 'grayscale(100%) ';
    }
    
    image.style.filter = filter.trim();
    image.style.transform = `rotate(${imageRotation}deg)`;
}

function toggleGrayscale() {
    isGrayscale = !isGrayscale;
    applyImageEffects();
    showNotification(isGrayscale ? 'Ч/Б фильтр включен' : 'Ч/Б фильтр выключен', 'info');
}

function rotateImage() {
    imageRotation += 90;
    if (imageRotation >= 360) {
        imageRotation = 0;
    }
    applyImageEffects();
    showNotification(`Изображение повернуто на ${imageRotation}°`, 'info');
}

function resetImage() {
    imageRotation = 0;
    isGrayscale = false;
    applyImageEffects();
    showNotification('Изображение сброшено', 'warning');
}

// Уведомления
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    // Устанавливаем цвет в зависимости от типа
    const colors = {
        success: '#48bb78',
        error: '#e53e3e',
        warning: '#ed8936',
        info: '#4299e1'
    };
    
    notification.style.background = colors[type] || colors.info;
    notificationText.textContent = message;
    notification.style.display = 'block';
    
    // Автоматически скрываем через 3 секунды
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Обработчики событий
function initializeEventHandlers() {
    // Кнопки счетчика
    const incrementBtn = document.getElementById('incrementBtn');
    const decrementBtn = document.getElementById('decrementBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    if (incrementBtn) {
        incrementBtn.addEventListener('click', incrementCounter);
    }
    
    if (decrementBtn) {
        decrementBtn.addEventListener('click', decrementCounter);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetCounter);
    }
    
    // Кнопки изображения
    const grayscaleBtn = document.getElementById('grayscaleBtn');
    const rotateBtn = document.getElementById('rotateBtn');
    const resetImageBtn = document.getElementById('resetImageBtn');
    
    if (grayscaleBtn) {
        grayscaleBtn.addEventListener('click', toggleGrayscale);
    }
    
    if (rotateBtn) {
        rotateBtn.addEventListener('click', rotateImage);
    }
    
    if (resetImageBtn) {
        resetImageBtn.addEventListener('click', resetImage);
    }
    
    // Клики по изображениям
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('click', function() {
            showNotification(`Изображение: ${this.alt}`, 'info');
        });
    });
    
    // Ссылки в футере
    document.querySelectorAll('.footer-section a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                showNotification('Это демонстрационная ссылка', 'info');
            } else {
                showNotification('Открываем внешнюю ссылку...', 'info');
            }
        });
    });
    
    // Отслеживание взаимодействий
    trackUserInteractions();
}

// Отслеживание взаимодействий пользователя
function trackUserInteractions() {
    let interactions = 0;
    
    function trackInteraction() {
        interactions++;
        console.log(`Взаимодействий пользователя: ${interactions}`);
    }
    
    // Отслеживаем различные типы взаимодействий
    document.addEventListener('click', trackInteraction);
    document.addEventListener('keydown', trackInteraction);
    
    // Отслеживаем скролл (с debounce)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(trackInteraction, 100);
    });
}

// Экспортируем функции для тестирования
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        incrementCounter,
        decrementCounter,
        resetCounter,
        toggleGrayscale,
        rotateImage,
        resetImage
    };
}
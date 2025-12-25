// script.js - исправленная версия

// Таймер Чекиста
let cheshSeconds = 0;
const cheshTimer = document.getElementById('cheshTimer');

setInterval(() => {
    cheshSeconds++;
    cheshTimer.textContent = cheshSeconds;
}, 1000);

// Глобальные переменные для аудио
let clickSound, errorSound;

// Инициализация звуков при взаимодействии пользователя
function initSounds() {
    // Создаем звуки только после первого взаимодействия пользователя
    if (!clickSound) {
        clickSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3');
        clickSound.volume = 0.3;
        
        errorSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-windows-error-2571.mp3');
        errorSound.volume = 0.5;
    }
}

// Функция для воспроизведения звука с обработкой ошибок
function playSound(sound) {
    if (!sound) return;
    
    sound.currentTime = 0; // Перемотка в начало
    
    sound.play().catch(error => {
        console.log("Браузер заблокировал звук:", error);
        // Можно показать сообщение, что нужно взаимодействие с сайтом
    });
}

// Зачеркивание пунктов при клике
document.querySelectorAll('.discription li').forEach(item => {
    item.addEventListener('click', function(event) {
        // Инициализируем звуки при первом клике
        initSounds();
        
        this.classList.toggle('clicked');
        
        // Воспроизводим звук клика
        playSound(clickSound);
        
        // Случайный комментарий
        const comments = [
            "Зачёркнуто!",
            "Исправлено по Костиной!",
            "Чекист одобрил!",
            "Вайб халвы!",
            "Аперль заполнен!",
            "Делов на 5 минут!",
            "Отклонено Эдуардом",
            "Открыжим"
        ];
        const comment = comments[Math.floor(Math.random() * comments.length)];
        
        // Создаем всплывающую подсказку
        const tooltip = document.createElement('div');
        tooltip.textContent = comment;
        tooltip.className = 'tooltip-popup';
        
        // Позиционируем относительно клика
        const x = event.clientX;
        const y = event.clientY;
        
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y - 50}px`;
        
        document.body.appendChild(tooltip);
        
        // Удаляем через 2 секунды
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 2000);
    });
});

// Вращение букв при клике (дополнительный интерактив)
document.querySelectorAll('.letter').forEach(letter => {
    letter.addEventListener('click', function() {
        initSounds();
        playSound(clickSound);
        
        // Добавляем класс для анимации
        this.classList.add('letter-spin');
        
        // Убираем класс после анимации
        setTimeout(() => {
            this.classList.remove('letter-spin');
        }, 1000);
    });
});

// Ошибка печати
function showPrintError() {
    // Инициализируем звуки
    initSounds();
    
    // Воспроизводим звук ошибки
    playSound(errorSound);
    
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.className = 'print-modal-overlay';
    
    modal.innerHTML = `
        <div class="print-modal">
            <div class="modal-header">
                <h2>❌ ОШИБКА ПЕЧАТИ ❌</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <p class="error-message">Принтер "УРАЛ-ОЭА" не отвечает.</p>
                <p>Причина: Чекист использует его для печати писем.</p>
                <div class="modal-gif">
                    <img src="https://i.gifer.com/origin/6e/6e78cba47b8e4c4e4d4c4d4d4d4d4d4.gif" alt="Error" width="100">
                </div>
            </div>
            <div class="modal-footer">
                <button class="modal-btn retry-btn">[ ПОВТОРИТЬ ]</button>
                <button class="modal-btn cancel-btn">[ ОТМЕНА ]</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Закрытие модалки
    const closeBtn = modal.querySelector('.close-modal');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const retryBtn = modal.querySelector('.retry-btn');
    
    const closeModal = () => {
        document.body.removeChild(modal);
    };
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    retryBtn.addEventListener('click', () => {
        // Воспроизводим звук снова
        playSound(errorSound);
        // Можно добавить другую анимацию или сообщение
        const errorMsg = modal.querySelector('.error-message');
        errorMsg.textContent = "Всё равно не работает! Чекист не отдаёт принтер!";
        errorMsg.style.color = "red";
        errorMsg.style.fontWeight = "bold";
    });
    
    // Закрытие по клику на фон
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}

// Добавляем звук при наведении на буквы (по желанию)
document.querySelectorAll('.letter').forEach(letter => {
    letter.addEventListener('mouseenter', function() {
        // Только если звуки уже инициализированы
        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.volume = 0.1; // Тише для ховера
            playSound(clickSound);
        }
    });
});

// Стили для всплывающих подсказок и модалки
const tooltipStyles = document.createElement('style');
tooltipStyles.textContent = `
    .tooltip-popup {
        position: fixed;
        background: yellow;
        padding: 8px 12px;
        border: 2px solid red;
        border-radius: 5px;
        font-family: 'Comic Sans MS', cursive;
        font-weight: bold;
        z-index: 10000;
        animation: fadeOut 2s forwards;
        pointer-events: none;
        box-shadow: 3px 3px 0 rgba(0,0,0,0.3);
        transform: translate(-50%, 0);
    }
    
    .print-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    }
    
    .print-modal {
        background: white;
        padding: 20px;
        border: 10px double red;
        border-radius: 10px;
        max-width: 500px;
        width: 90%;
        font-family: 'Times New Roman', serif;
        box-shadow: 0 0 50px rgba(255,0,0,0.5);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    
    .modal-header h2 {
        color: red;
        font-size: 24px;
        margin: 0;
    }
    
    .close-modal {
        background: none;
        border: none;
        font-size: 30px;
        cursor: pointer;
        color: red;
    }
    
    .modal-body {
        text-align: center;
        margin: 20px 0;
    }
    
    .modal-footer {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-top: 20px;
    }
    
    .modal-btn {
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        border: 3px solid #333;
        border-radius: 5px;
        font-weight: bold;
        transition: all 0.3s;
    }
    
    .retry-btn {
        background: red;
        color: white;
    }
    
    .cancel-btn {
        background: grey;
        color: white;
    }
    
    .modal-btn:hover {
        transform: scale(1.1);
    }
    
    @keyframes fadeOut {
        0% { opacity: 1; transform: translate(-50%, 0) scale(1); }
        70% { opacity: 1; transform: translate(-50%, -20px) scale(1.1); }
        100% { opacity: 0; transform: translate(-50%, -40px) scale(1.2); }
    }
    
    .letter-spin {
        animation: spin 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.3); }
        100% { transform: rotate(360deg) scale(1); }
    }
`;
document.head.appendChild(tooltipStyles);

// Активация звуков при любом взаимодействии с сайтом
document.addEventListener('click', initSounds, { once: true });
document.addEventListener('touchstart', initSounds, { once: true });
document.addEventListener('keydown', initSounds, { once: true });
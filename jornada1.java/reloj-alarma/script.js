/* ====================================
   RELOJ DIGITAL CON ALARMA - LÓGICA
   ==================================== */

// ===== VARIABLES GLOBALES =====
let alarmActive = false; // Indica si la alarma está activa
let alarmTime = null; // Hora de la alarma (formato HH:MM)
let alarmSounded = false; // Previene múltiples activaciones de alarma
let format24h = true; // Formato de hora (24h o 12h)

// Nombres de los meses en español
const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Nombres de los días en español
const dayNames = [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 
    'Jueves', 'Viernes', 'Sábado'
];

// ===== ELEMENTOS DEL DOM =====
const timeDisplay = document.getElementById('time');
const dateDisplay = document.getElementById('date');
const greetingDisplay = document.getElementById('greeting');
const alarmTimeInput = document.getElementById('alarmTime');
const setAlarmBtn = document.getElementById('setAlarmBtn');
const cancelAlarmBtn = document.getElementById('cancelAlarmBtn');
const toggleFormatBtn = document.getElementById('toggleFormat');
const alarmMessage = document.getElementById('alarmMessage');
const alarmIndicator = document.getElementById('alarmIndicator');
const notificationArea = document.getElementById('notificationArea');
const alarmNotification = document.getElementById('alarmNotification');
const dismissAlarmBtn = document.getElementById('dismissAlarmBtn');

// ===== FUNCIÓN: Obtener hora actual formateada =====
/**
 * Obtiene la hora actual y la formatea como HH:MM:SS o HH:MM:SS AM/PM
 * @returns {string} Hora formateada
 */
function getFormattedTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    
    // Aplicar formato 12h si está seleccionado
    let period = '';
    if (!format24h) {
        period = hours >= 12 ? ' PM' : ' AM';
        hours = hours % 12 || 12; // Convertir 0 a 12
    }
    
    // Añadir ceros a la izquierda
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}${period}`;
}

// ===== FUNCIÓN: Obtener fecha actual formateada =====
/**
 * Obtiene la fecha actual y la formatea como: "Dia, DD de Mes de YYYY"
 * @returns {string} Fecha formateada en español
 */
function getFormattedDate() {
    const now = new Date();
    const dayName = dayNames[now.getDay()];
    const day = String(now.getDate()).padStart(2, '0');
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    
    return `${dayName}, ${day} de ${month} de ${year}`;
}

// ===== FUNCIÓN: Obtener saludo según hora del día =====
/**
 * Retorna un saludo diferente según la hora del día
 * @returns {string} Saludo apropiado
 */
function getGreeting() {
    const now = new Date();
    const hours = now.getHours();
    
    if (hours >= 6 && hours < 12) {
        return '☀️ Buenos Días';
    } else if (hours >= 12 && hours < 18) {
        return '🌤️ Buenas Tardes';
    } else {
        return '🌙 Buenas Noches';
    }
}

// ===== FUNCIÓN: Actualizar reloj =====
/**
 * Actualiza el display del reloj, fecha y saludo
 * Se llama cada segundo mediante setInterval
 */
function updateClock() {
    // Actualizar hora
    timeDisplay.textContent = getFormattedTime();
    
    // Actualizar fecha cada minuto
    const now = new Date();
    if (now.getSeconds() === 0) {
        dateDisplay.textContent = getFormattedDate();
        greetingDisplay.textContent = getGreeting();
    }
    
    // Verificar si la alarma debe sonar
    checkAlarm();
}

// ===== FUNCIÓN: Verificar si la alarma debe sonar =====
/**
 * Compara la hora actual con la hora de alarma configurada
 * Si coinciden y la alarma está activa, dispara la alarma
 */
function checkAlarm() {
    // Solo ejecutar si hay alarma activa
    if (!alarmActive || !alarmTime || alarmSounded) {
        return;
    }
    
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    // Si la hora actual coincide con la alarma
    if (currentTime === alarmTime) {
        triggerAlarm();
    }
}

// ===== FUNCIÓN: Disparar alarma =====
/**
 * Se ejecuta cuando la alarma debe sonar
 * - Muestra notificación visual
 * - Reproduce sonido (simulado con alert)
 * - Activa animación de parpadeo
 */
function triggerAlarm() {
    alarmSounded = true;
    
    // Mostrar notificación
    notificationArea.classList.add('active');
    alarmNotification.classList.add('active');
    timeDisplay.classList.add('alarm-blink');
    
    // Reproducir sonido (simulación con alert)
    // En un proyecto real, se usaría Web Audio API o etiqueta <audio>
    playAlarmSound();
}

// ===== FUNCIÓN: Reproducir sonido de alarma =====
/**
 * Reproduce sonido de alarma usando Web Audio API
 * Crea un tono de frecuencia variable para simular alarma
 */
function playAlarmSound() {
    try {
        // Crear contexto de audio
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Crear oscilador y ganancia
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // Conectar oscilador a ganancia y ganancia a altavoz
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Configurar frecuencia y volumen
        oscillator.frequency.value = 800; // Frecuencia en Hz
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        
        // Hacer que el sonido suba y baje (efecto de alarma)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
        
        // Variar frecuencia
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.linearRampToValueAtTime(1000, audioContext.currentTime + 0.5);
        oscillator.frequency.linearRampToValueAtTime(800, audioContext.currentTime + 1);
        
        // Iniciar y detener sonido
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 2);
    } catch (e) {
        // Si Web Audio API no está disponible, usar alert como fallback
        alert('¡ALARMA! La alarma ha sonado a las ' + alarmTime);
    }
}

// ===== FUNCIÓN: Desactivar alarma =====
/**
 * Desactiva la notificación de alarma y limpia los estilos
 */
function dismissAlarm() {
    notificationArea.classList.remove('active');
    alarmNotification.classList.remove('active');
    timeDisplay.classList.remove('alarm-blink');
    
    // Desactivar alarma completamente
    alarmActive = false;
    alarmTime = null;
    alarmSounded = false;
    
    // Actualizar UI
    updateAlarmUI();
}

// ===== FUNCIÓN: Establecer alarma =====
/**
 * Valida y establece la alarma con la hora introducida
 * - Verifica que la hora sea válida y futura
 * - Activa el indicador de alarma
 * - Desactiva el input y botón "Establecer"
 */
function setAlarm() {
    const inputValue = alarmTimeInput.value;
    
    // Validar que se haya introducido una hora
    if (!inputValue) {
        alert('Por favor, introduce una hora');
        return;
    }
    
    // Validar que sea una hora futura
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    if (inputValue <= currentTime) {
        alert('La hora debe ser futura. Por favor, elige una hora posterior a la actual.');
        return;
    }
    
    // Establecer alarma
    alarmTime = inputValue;
    alarmActive = true;
    alarmSounded = false;
    
    // Actualizar UI
    updateAlarmUI();
}

// ===== FUNCIÓN: Cancelar alarma =====
/**
 * Desactiva la alarma establecida
 * - Limpia la hora de alarma
 * - Desactiva el indicador
 * - Habilita los controles nuevamente
 */
function cancelAlarm() {
    alarmActive = false;
    alarmTime = null;
    alarmSounded = false;
    
    // Limpiar notificación si está activa
    dismissAlarm();
    
    // Actualizar UI
    updateAlarmUI();
}

// ===== FUNCIÓN: Actualizar UI de alarma =====
/**
 * Actualiza los estilos y textos del indicador de alarma
 * Habilita/desactiva botones según el estado
 */
function updateAlarmUI() {
    if (alarmActive && alarmTime) {
        // Alarma activa
        alarmIndicator.classList.add('active');
        alarmMessage.classList.add('active');
        alarmMessage.textContent = `Alarma activa a las ${alarmTime}`;
        
        setAlarmBtn.disabled = true;
        cancelAlarmBtn.disabled = false;
        alarmTimeInput.disabled = true;
    } else {
        // Alarma inactiva
        alarmIndicator.classList.remove('active');
        alarmMessage.classList.remove('active');
        alarmMessage.textContent = 'Sin alarma activa';
        
        setAlarmBtn.disabled = false;
        cancelAlarmBtn.disabled = true;
        alarmTimeInput.disabled = false;
    }
}

// ===== FUNCIÓN: Cambiar formato de hora =====
/**
 * Alterna entre formato 24h y 12h
 * Actualiza el botón y el reloj
 */
function toggleFormat() {
    format24h = !format24h;
    toggleFormatBtn.textContent = format24h ? '24h' : '12h';
    updateClock();
}

// ===== EVENT LISTENERS =====

// Botón establecer alarma
setAlarmBtn.addEventListener('click', setAlarm);

// Botón cancelar alarma
cancelAlarmBtn.addEventListener('click', cancelAlarm);

// Botón desactivar notificación
dismissAlarmBtn.addEventListener('click', dismissAlarm);

// Botón cambiar formato
toggleFormatBtn.addEventListener('click', toggleFormat);

// Permitir establecer alarma con Enter
alarmTimeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        setAlarm();
    }
});

// ===== INICIALIZACIÓN =====

/**
 * Inicializa la aplicación cuando se carga la página
 * - Actualiza reloj inmediatamente
 * - Inicia actualización cada segundo
 * - Inicializa UI de alarma
 */
document.addEventListener('DOMContentLoaded', () => {
    // Actualizar inmediatamente
    updateClock();
    
    // Actualizar cada segundo
    setInterval(updateClock, 1000);
    
    // Inicializar UI
    updateAlarmUI();
});

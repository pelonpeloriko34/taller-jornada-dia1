/**
 * ANALIZADOR DE TEXTO - Aplicación de análisis en tiempo real
 * Proporciona estadísticas detalladas sobre el texto ingresado por el usuario
 */

// ============================================
// ELEMENTOS DEL DOM
// ============================================

const textInput = document.getElementById('textInput');
const charCountEl = document.getElementById('charCount');
const charNoSpaceCountEl = document.getElementById('charNoSpaceCount');
const wordCountEl = document.getElementById('wordCount');
const sentenceCountEl = document.getElementById('sentenceCount');
const readingTimeEl = document.getElementById('readingTime');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');

// ============================================
// FUNCIONES DE CONTEO Y ANÁLISIS
// ============================================

/**
 * Cuenta el número total de caracteres incluyendo espacios
 * @param {string} text - Texto a analizar
 * @returns {number} Número total de caracteres
 */
function countCharacters(text) {
    try {
        return text.length;
    } catch (error) {
        console.error('Error al contar caracteres:', error);
        return 0;
    }
}

/**
 * Cuenta el número de caracteres excluyendo espacios en blanco
 * @param {string} text - Texto a analizar
 * @returns {number} Número de caracteres sin espacios
 */
function countCharactersWithoutSpaces(text) {
    try {
        // Elimina todos los espacios en blanco (espacios, tabulaciones, saltos de línea)
        return text.replace(/\s/g, '').length;
    } catch (error) {
        console.error('Error al contar caracteres sin espacios:', error);
        return 0;
    }
}

/**
 * Cuenta el número de palabras en el texto
 * Considera múltiples espacios y caracteres especiales
 * @param {string} text - Texto a analizar
 * @returns {number} Número total de palabras
 */
function countWords(text) {
    try {
        // Validación: retorna 0 si el texto está vacío o solo contiene espacios
        if (!text || text.trim().length === 0) {
            return 0;
        }
        
        // Divide el texto por espacios en blanco (uno o más)
        // \s+ coincide con uno o más espacios en blanco
        const words = text.trim().split(/\s+/);
        
        // Filtra palabras vacías (por si acaso)
        return words.filter(word => word.length > 0).length;
    } catch (error) {
        console.error('Error al contar palabras:', error);
        return 0;
    }
}

/**
 * Cuenta el número de oraciones en el texto
 * Se basa en puntos finales, signos de interrogación y exclamación
 * @param {string} text - Texto a analizar
 * @returns {number} Número total de oraciones
 */
function countSentences(text) {
    try {
        // Validación: retorna 0 si el texto está vacío
        if (!text || text.trim().length === 0) {
            return 0;
        }
        
        // Busca oraciones que terminan con: . ! ?
        // [.!?] - coincide con cualquiera de estos caracteres
        const sentences = text.match(/[.!?]+/g);
        
        // Si no encuentra coincidencias, retorna 0; de lo contrario, retorna la cantidad
        return sentences ? sentences.length : 0;
    } catch (error) {
        console.error('Error al contar oraciones:', error);
        return 0;
    }
}

/**
 * Calcula el tiempo estimado de lectura basado en 200 palabras por minuto
 * @param {number} wordCount - Número total de palabras
 * @returns {number} Tiempo estimado en minutos (redondeado)
 */
function calculateReadingTime(wordCount) {
    try {
        // Velocidad de lectura promedio: 200 palabras por minuto
        const WORDS_PER_MINUTE = 200;
        
        // Calcula el tiempo dividiendo palabras entre velocidad
        // Si es menor a 1 minuto, retorna 0
        const time = wordCount / WORDS_PER_MINUTE;
        
        // Redondea hacia arriba para mostrar siempre al menos 1 minuto si hay contenido
        return Math.max(0, Math.round(time * 10) / 10);
    } catch (error) {
        console.error('Error al calcular tiempo de lectura:', error);
        return 0;
    }
}

// ============================================
// FUNCIONES DE ACTUALIZACIÓN DE INTERFAZ
// ============================================

/**
 * Actualiza todas las estadísticas en tiempo real
 * Se ejecuta cada vez que el usuario escribe en el textarea
 */
function updateStatistics() {
    try {
        // Obtiene el texto del textarea
        const text = textInput.value;
        
        // Calcula todas las métricas
        const charCount = countCharacters(text);
        const charNoSpaceCount = countCharactersWithoutSpaces(text);
        const words = countWords(text);
        const sentences = countSentences(text);
        const readingTime = calculateReadingTime(words);
        
        // Actualiza el DOM con los nuevos valores
        updateElement(charCountEl, charCount);
        updateElement(charNoSpaceCountEl, charNoSpaceCount);
        updateElement(wordCountEl, words);
        updateElement(sentenceCountEl, sentences);
        updateElement(readingTimeEl, readingTime);
        
    } catch (error) {
        console.error('Error al actualizar estadísticas:', error);
        showNotification('Error al procesar el texto', 'error');
    }
}

/**
 * Actualiza un elemento del DOM con animación
 * @param {HTMLElement} element - Elemento a actualizar
 * @param {string|number} value - Nuevo valor a mostrar
 */
function updateElement(element, value) {
    try {
        if (element.textContent !== String(value)) {
            element.textContent = value;
            // Añade animación mediante la clase CSS
            element.style.animation = 'none';
            // Fuerza un reflow para reiniciar la animación
            setTimeout(() => {
                element.style.animation = 'slideUp 0.3s ease';
            }, 10);
        }
    } catch (error) {
        console.error('Error al actualizar elemento:', error);
    }
}

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

/**
 * Genera una cadena con las estadísticas formateadas
 * @returns {string} Estadísticas en formato texto
 */
function generateStatisticsText() {
    try {
        const stats = `
📊 ANÁLISIS DE TEXTO
════════════════════════════════════════════
📝 Caracteres (con espacios): ${charCountEl.textContent}
🔤 Caracteres (sin espacios): ${charNoSpaceCountEl.textContent}
📄 Palabras: ${wordCountEl.textContent}
✍️ Oraciones: ${sentenceCountEl.textContent}
⏱️ Tiempo de lectura: ${readingTimeEl.textContent} minutos
════════════════════════════════════════════
Generado: ${new Date().toLocaleString('es-ES')}
        `.trim();
        
        return stats;
    } catch (error) {
        console.error('Error al generar estadísticas:', error);
        return 'Error al generar estadísticas';
    }
}

/**
 * Copia las estadísticas al portapapeles
 */
function copyStatistics() {
    try {
        // Genera el texto con las estadísticas
        const statsText = generateStatisticsText();
        
        // Usa la API moderna del portapapeles
        navigator.clipboard.writeText(statsText)
            .then(() => {
                showNotification('✅ Estadísticas copiadas al portapapeles', 'success');
            })
            .catch(err => {
                console.error('Error al copiar al portapapeles:', err);
                // Fallback para navegadores más antiguos
                fallbackCopyToClipboard(statsText);
            });
    } catch (error) {
        console.error('Error al copiar estadísticas:', error);
        showNotification('❌ Error al copiar las estadísticas', 'error');
    }
}

/**
 * Alternativa para copiar al portapapeles en navegadores antiguos
 * @param {string} text - Texto a copiar
 */
function fallbackCopyToClipboard(text) {
    try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification('✅ Estadísticas copiadas al portapapeles (método alternativo)', 'success');
    } catch (error) {
        console.error('Error en fallback:', error);
        showNotification('❌ No se pudo copiar las estadísticas', 'error');
    }
}

/**
 * Limpia el textarea y reinicia todas las estadísticas
 */
function clearAll() {
    try {
        // Limpia el textarea
        textInput.value = '';
        
        // Reinicia todas las estadísticas a 0
        charCountEl.textContent = '0';
        charNoSpaceCountEl.textContent = '0';
        wordCountEl.textContent = '0';
        sentenceCountEl.textContent = '0';
        readingTimeEl.textContent = '0';
        
        // Enfoca el textarea para mejor UX
        textInput.focus();
        
        showNotification('🗑️ Texto limpiado correctamente', 'success');
    } catch (error) {
        console.error('Error al limpiar:', error);
        showNotification('❌ Error al limpiar el texto', 'error');
    }
}

/**
 * Muestra una notificación temporal en la pantalla
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación: 'success' o 'error'
 */
function showNotification(message, type = 'success') {
    try {
        // Crea el elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Lo añade al body
        document.body.appendChild(notification);
        
        // Lo elimina después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    } catch (error) {
        console.error('Error al mostrar notificación:', error);
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

/**
 * Listener para actualizar estadísticas en tiempo real
 * Se ejecuta cada vez que el usuario escribe, borra o pega texto
 */
textInput.addEventListener('input', () => {
    updateStatistics();
});

/**
 * Listener para pegar texto (asegura actualización correcta)
 */
textInput.addEventListener('paste', () => {
    // Usa setTimeout para asegurar que el texto se haya pegado antes de actualizar
    setTimeout(updateStatistics, 10);
});

/**
 * Listener para el botón de copiar estadísticas
 */
copyBtn.addEventListener('click', () => {
    // Valida que haya contenido antes de copiar
    if (textInput.value.trim().length === 0) {
        showNotification('⚠️ No hay texto para copiar estadísticas', 'error');
        return;
    }
    copyStatistics();
});

/**
 * Listener para el botón de limpiar
 */
clearBtn.addEventListener('click', () => {
    clearAll();
});

/**
 * Listener de error global para manejo robusto de errores
 */
window.addEventListener('error', (event) => {
    console.error('Error global:', event.error);
    showNotification('❌ Ocurrió un error inesperado', 'error');
});

// ============================================
// INICIALIZACIÓN
// ============================================

// Log de inicialización en consola (útil para debugging)
console.log('✅ Analizador de Texto - Aplicación iniciada correctamente');
console.log('📝 Escribe o pega tu texto en el textarea para comenzar el análisis');

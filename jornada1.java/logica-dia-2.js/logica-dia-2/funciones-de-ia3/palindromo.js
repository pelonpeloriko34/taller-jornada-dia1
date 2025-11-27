//ejercicio: detector de palíndromos
//objetivo: crea una logica compleja emcapsulada en una funcion
//un ejemplo de palindromo es "anilina" o "reconocer", oso
//1. crea una funcion que reciba un texto y retorne true si es palindromo o false si no lo es
/**
 * Comprueba si una cadena es un palíndromo.
 *
 * Esta función elimina todos los espacios en blanco y normaliza la cadena a
 * minúsculas antes de comparar los caracteres desde los extremos hacia el centro.
 * Así permite detectar palíndromos en frases que contienen espacios y diferencias
 * de mayúsculas/minúsculas.
 *
 * @param {string} texto - Cadena a evaluar.
 * @returns {boolean} Devuelve true si la cadena (ignorando espacios y mayúsculas)
 *                    es un palíndromo; en caso contrario, devuelve false.
 *
 * @example
 * // true
 * esPalindromo('Anita lava la tina');
 *
 * @example
 * // false
 * esPalindromo('Hola mundo');
 */
function esPalindromo(texto) {
    // Asegura que sea cadena, elimina espacios en blanco y normaliza mayúsculas/minúsculas
    texto = texto == null ? '' : String(texto);
    const textoLimpio = texto.replace(/\s+/g, '').toLowerCase();
    const longitud = textoLimpio.length;
    for (let i = 0; i < longitud / 2; i++) {
        if (textoLimpio[i] !== textoLimpio[longitud - 1 - i]) {
            return false;
        }
    }
    return true;
}
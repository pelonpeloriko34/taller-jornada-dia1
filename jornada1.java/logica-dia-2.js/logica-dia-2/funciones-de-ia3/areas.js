//crea una funcionn para calcular el area de un circulo dado su radio
/**
 * Calcula el área de un círculo a partir de su radio.
 * @param {number} radio - Radio del círculo (misma unidad que el área resultante).
 * @returns {number} Área del círculo.
 *
 * Fórmula: área = π * radio^2
 * Se utiliza Math.PI para π y Math.pow(radio, 2) para elevar al cuadrado.
 */
function areaCirculo(radio) {
    // Si se desea, validar el radio: debe ser número y no negativo.
    // if (typeof radio !== 'number' || radio < 0) throw new Error('Radio inválido');
    return Math.PI * Math.pow(radio, 2);
}
 //crea una funcion para calcular el area de un rectangulo dado su base y altura
/**
 * Calcula el área de un rectángulo a partir de su base y su altura.
 *
 * Realiza la operación matemática base × altura y devuelve el resultado.
 * No realiza validación de tipos ni conversión explícita: si se pasan
 * valores no numéricos, el resultado podrá ser NaN o comportarse según
 * las reglas de coerción de JavaScript.
 *
 * @param {number} base - Longitud de la base del rectángulo (en unidades de longitud).
 * @param {number} altura - Altura del rectángulo (en las mismas unidades que la base).
 * @returns {number} El área del rectángulo (base por altura).
 *
 * @example
 * // Área de un rectángulo de base 5 y altura 3 -> 15
 * // areaRectangulo(5, 3) // 15
 *
 * @example
 * // Si se pasan valores no numéricos el resultado puede ser NaN:
 * // areaRectangulo("5", null) // NaN (o 0 en algunos casos por coerción)
 */
/**
 * Calcula el área de un rectángulo a partir de su base y su altura.
 *
 * @param {number} base - Longitud de la base del rectángulo (en unidades de longitud).
 * @param {number} altura - Altura del rectángulo (en las mismas unidades que la base).
 * @returns {number} El área del rectángulo (base por altura).
 *
 * Nota:
 * - No se realiza validación estricta de tipos: si se pasan valores no numéricos
 *   el resultado podrá ser NaN o producir coerciones de JavaScript.
 * - Si se desea, se puede añadir validación para asegurar que base y altura sean
 *   números no negativos (por ejemplo lanzando un Error o convirtiendo con Number()).
 *
 * Ejemplo:
 * // areaRectangulo(5, 3) -> 15
 */
function areaRectangulo(base, altura) {
    // cálculo directo: base × altura
    return base * altura;
}const areaTriangulo = (base, altura) => (base * altura) / 2;
//vamos a calcular el volumen de un cilinddro
//el volumen es area de la base (circulo) por la altura
/**
 * Calcula el volumen de un cilindro a partir de su radio y altura.
 *
 * El volumen se determina multiplicando el área de la base (que es un círculo)
 * por la altura del cilindro.
 *
 * @param {number} radio - Radio de la base del cilindro (en las mismas unidades que la altura).
 * @param {number} altura - Altura del cilindro (en las mismas unidades que el radio).
 * @returns {number} Volumen del cilindro.
 *
 * @example
 * // Volumen de un cilindro con radio 3 y altura 5
 * // volumenCilindro(3, 5) // 28.274333882308138
 */
function volumenCilindro(radio, altura) {
    const areaBase = areaCirculo(radio); // Calcula el área de la base circular
    return areaBase * altura; // Multiplica el área de la base por la altura para obtener el volumen
}
//crea una funcion para calcular una derivada simple de una funcion polinomial de la forma ax^n
/**
 * Calcula la derivada de una función polinómica simple de la forma ax^n.
 *
 * La derivada se calcula utilizando la regla de
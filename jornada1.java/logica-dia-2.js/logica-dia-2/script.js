// Ejercicio array y objetivos
//1. array(lista)
// crea una lista de 3 comidas favoritas
const comidasFavoritas = ['Pizza', 'Sushi', 'Tacos'];
//2. objetivos(key y value)
var persona = {
    nombre: 'Juan',
    edad: 30,
    ciudad: 'Madrid',
    habilidades: ['programacion', 'dibujo', 'Cocina'],
    estatura: 1.75,
    programador: true
};
//3. como accedo a la propiedad nombre del objeto persona?
console.log("nombre",persona.nombre); // Accediendo a la propiedad 'nombre' del objeto 'persona'
//como accedo a la propiedad habilidades del objeto persona?
console.log("habilidades",persona.habilidades); // Accediendo a la propiedad 'habilidades' del objeto 'persona'
//4. como accedo a la segunda habilidad del objeto persona?
console.log("habilidd de dibujo",persona.habilidades[1]); // Accediendo a la segunda habilidad del objeto 'persona'

//3. array de objetos
// crea una lista de 3 alumnos (objetos) con nombre y calificacion
const alumnos = [
    { nombre: 'Ana', calificacion: 85 },
    { nombre: 'Luis', calificacion: 92 },
    { nombre: 'Marta', calificacion: 78 }
];
//escribe un bucle que rrecorra el array de alumnos solo los que tengan calificacion mayor a 80
for (let i = 0; i < alumnos.length; i++) {
    if (alumnos[i].calificacion > 80) {
        console.log('Alumno:', alumnos[i].nombre, 'Calificación:', alumnos[i].calificacion);
    }
}

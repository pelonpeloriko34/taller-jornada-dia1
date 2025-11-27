#!/usr/bin/env node
/*
	Calculadora simple en Node.js
	- Modo 1: pasar una expresión como argumento: `node index.js "2+3*4"`
	- Modo interactivo (REPL): `node index.js` y escribir expresiones en el prompt `calc>`

	La evaluación es limitada y segura: solo se permiten dígitos, espacios y los operadores
	+ - * / % . ( ) y ** para exponentes. No se permiten letras ni accesos a objetos.
*/

const readline = require('readline');

function safeEvaluate(expr) {
	if (typeof expr !== 'string') throw new Error('Expresión inválida');
	const trimmed = expr.trim();
	if (trimmed.length === 0) throw new Error('Expresión vacía');

	// Permitir sólo caracteres: dígitos, espacios, operadores básicos, paréntesis y punto
	const allowed = /^[0-9+\-*/%().\s]+$/;
	if (!allowed.test(trimmed)) {
		throw new Error('Caracteres no permitidos. Usa sólo números y operadores + - * / % ( ) y punto.');
	}

	// Evaluar en un contexto aislado
	try {
		// Usamos Function para evaluar la expresión; la regex anterior evita nombres y accesos.
		const fn = new Function('return (' + trimmed + ');');
		const result = fn();
		return result;
	} catch (err) {
		throw new Error('Error al evaluar la expresión: ' + err.message);
	}
}

function runExpressionFromArg() {
	const expr = process.argv.slice(2).join(' ');
	try {
		const res = safeEvaluate(expr);
		console.log(res);
		process.exit(0);
	} catch (err) {
		console.error('Error:', err.message);
		process.exit(1);
	}
}

function runRepl() {
	const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: 'calc> ' });
	console.log('Calculadora interactiva. Escribe una expresión y pulsa Enter. Escribe "exit" o Ctrl+C para salir.');
	rl.prompt();
	rl.on('line', (line) => {
		const trimmed = line.trim();
		if (trimmed === '' ) { rl.prompt(); return; }
		if (trimmed.toLowerCase() === 'exit' || trimmed.toLowerCase() === 'quit') { rl.close(); return; }
		try {
			const res = safeEvaluate(trimmed);
			console.log(res);
		} catch (err) {
			console.error('Error:', err.message);
		}
		rl.prompt();
	}).on('close', () => {
		console.log('\nSaliendo.');
		process.exit(0);
	});
}

// Si se pasan argumentos, evaluar la expresión pasada; si no, abrir REPL
if (process.argv.length > 2) {
	runExpressionFromArg();
} else {
	runRepl();
}

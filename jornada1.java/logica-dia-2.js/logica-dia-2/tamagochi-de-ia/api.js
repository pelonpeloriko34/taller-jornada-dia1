// Estado inicial de Taco
let taco = {
    hambre: 100,           // 100 = sin hambre, 0 = mucha hambre
    energia: 100,          // 100 = descansado, 0 = muy cansado
    felicidad: 100,        // 100 = muy feliz, 0 = muy infeliz
    vivo: true,
    edad: 0
};

// Frases que Taco "piensa" según su estado
const pensamientos = {
    hambriento: [
        "¡Tengo mucha hambre! 😿",
        "Mi estómago está vacío... 🍽️",
        "¿Dónde está la comida? 😫",
        "¡Comiiidaaaa! 🍔"
    ],
    cansado: [
        "Estoy muy cansado... 😴",
        "Me muero por dormir 🛏️",
        "Necesito descansar 😪",
        "¡Qué sueño! 💤"
    ],
    infeliz: [
        "Estoy muy triste 😢",
        "¿Jugamos un poco? 😞",
        "Me siento solo 💔",
        "¿Puedes pasar tiempo conmigo? 😭"
    ],
    feliz: [
        "¡Estoy muy feliz! 😸",
        "¡La vida es hermosa! 🌟",
        "¡Gracias por cuidarme! 💕",
        "¡Me siento increíble! ✨"
    ],
    normal: [
        "Estoy bien 😺",
        "¿Qué tal estás? 😸",
        "Todo va bien 😻",
        "Aquí ando 😸"
    ]
};

// Función principal que hace que Taco "piense"
function pensarTaco() {
    let pensamiento = "";
    
    // IA básica: Taco piensa según su estado
    if (taco.hambre <= 30) {
        pensamiento = pensamientos.hambriento[Math.floor(Math.random() * pensamientos.hambriento.length)];
    } else if (taco.energia <= 30) {
        pensamiento = pensamientos.cansado[Math.floor(Math.random() * pensamientos.cansado.length)];
    } else if (taco.felicidad <= 30) {
        pensamiento = pensamientos.infeliz[Math.floor(Math.random() * pensamientos.infeliz.length)];
    } else if (taco.felicidad >= 80) {
        pensamiento = pensamientos.feliz[Math.floor(Math.random() * pensamientos.feliz.length)];
    } else {
        pensamiento = pensamientos.normal[Math.floor(Math.random() * pensamientos.normal.length)];
    }
    
    return pensamiento;
}

// Función que Taco come
function tacocome() {
    if (!taco.vivo) {
        alert("😿 Taco ya no está aquí...");
        return;
    }

    taco.hambre = Math.min(100, taco.hambre + 30);
    taco.energia = Math.max(0, taco.energia - 5);
    taco.felicidad = Math.max(0, taco.felicidad - 2);

    mostrarAnimacion("😋");
    mostrarMensaje("success", "¡Ñam ñam! Taco comió delicioso 🍔");
    
    actualizar();
}

// Función que Taco duerme
function tacoduerme() {
    if (!taco.vivo) {
        alert("😿 Taco ya no está aquí...");
        return;
    }

    taco.energia = Math.min(100, taco.energia + 40);
    taco.hambre = Math.max(0, taco.hambre - 20);
    taco.felicidad = Math.max(0, taco.felicidad - 5);

    mostrarAnimacion("😴");
    mostrarMensaje("success", "Taco está descansando... Zzzzz 💤");
    
    actualizar();
}

// Función que Taco juega
function tacojuega() {
    if (!taco.vivo) {
        alert("😿 Taco ya no está aquí...");
        return;
    }

    if (taco.energia < 20) {
        mostrarMensaje("warning", "Taco está muy cansado para jugar 😴");
        return;
    }

    taco.felicidad = Math.min(100, taco.felicidad + 25);
    taco.energia = Math.max(0, taco.energia - 30);
    taco.hambre = Math.max(0, taco.hambre - 15);

    const juegos = ["¡Atrapé la pelota! 🎾", "¡Ganamos! 🎮", "¡Fue divertido! 🎉"];
    mostrarAnimacion("🎮");
    mostrarMensaje("success", juegos[Math.floor(Math.random() * juegos.length)]);
    
    actualizar();
}

// Actualizar el estado de Taco constantemente
function actualizarEstado() {
    if (!taco.vivo) return;

    // El tiempo pasa, Taco tiene hambre, se cansa
    taco.hambre = Math.max(0, taco.hambre - 1);
    taco.energia = Math.max(0, taco.energia - 0.5);
    taco.felicidad = Math.max(0, taco.felicidad - 0.3);
    taco.edad++;

    // Verificar si Taco muere
    if (taco.hambre <= 0 || taco.energia <= 0 || taco.felicidad <= 0) {
        tacoMuere();
    }

    actualizar();
}

// Función que muestra si Taco necesita algo urgentemente
function verificarAlertas() {
    const alertasDiv = document.getElementById("alertas");
    alertasDiv.innerHTML = "";

    if (taco.hambre <= 30) {
        alertasDiv.innerHTML += '<div class="alerta warning">⚠️ ¡Taco tiene mucha hambre!</div>';
    }
    if (taco.energia <= 30) {
        alertasDiv.innerHTML += '<div class="alerta warning">⚠️ ¡Taco está muy cansado!</div>';
    }
    if (taco.felicidad <= 30) {
        alertasDiv.innerHTML += '<div class="alerta danger">⚠️ ¡Taco está muy triste!</div>';
    }
}

// Cuando Taco muere
function tacoMuere() {
    taco.vivo = false;
    document.getElementById("gatoEmoji").textContent = "🪦";
    document.getElementById("pensamiento").textContent = "Taco se ha ido al cielo gato... 😿";
    document.getElementById("estado").textContent = "Taco ha muerto 😢";
    document.getElementById("estado").classList.remove("vivo");
    document.getElementById("estado").classList.add("muerto");
    mostrarMensaje("danger", "¡Oh no! No cuidaste bien a Taco... 💔");
}

// Mostrar animación en el gato
function mostrarAnimacion(emoji) {
    const gato = document.getElementById("gatoEmoji");
    gato.classList.remove("animacion");
    gato.offsetHeight; // Fuerza redibujado
    gato.classList.add("animacion");
}

// Mostrar mensajes de alerta
function mostrarMensaje(tipo, mensaje) {
    const alertasDiv = document.getElementById("alertas");
    const div = document.createElement("div");
    div.className = `alerta ${tipo}`;
    div.textContent = mensaje;
    alertasDiv.insertBefore(div, alertasDiv.firstChild);

    setTimeout(() => {
        div.remove();
    }, 3000);
}

// Actualizar la interfaz
function actualizar() {
    // Actualizar valores numéricos
    document.getElementById("hambre").textContent = Math.round(taco.hambre);
    document.getElementById("energia").textContent = Math.round(taco.energia);
    document.getElementById("felicidad").textContent = Math.round(taco.felicidad);

    // Actualizar barras de progreso
    document.getElementById("hambreBar").style.width = taco.hambre + "%";
    document.getElementById("energiaBar").style.width = taco.energia + "%";
    document.getElementById("felicidadBar").style.width = taco.felicidad + "%";

    // Cambiar emoji según el estado
    const gato = document.getElementById("gatoEmoji");
    if (taco.hambre <= 30) {
        gato.textContent = "🐱‍👓";
    } else if (taco.energia <= 30) {
        gato.textContent = "😴";
    } else if (taco.felicidad <= 30) {
        gato.textContent = "😿";
    } else if (taco.felicidad >= 80) {
        gato.textContent = "😸";
    } else {
        gato.textContent = "🐱";
    }

    // Actualizar pensamiento de Taco
    document.getElementById("pensamiento").textContent = pensarTaco();

    // Verificar alertas
    verificarAlertas();

    // Actualizar estado general
    if (taco.vivo) {
        document.getElementById("estado").textContent = `Taco está vivo y activo ✨ (${taco.edad} ticks)`;
        document.getElementById("estado").classList.add("vivo");
    }
}

// Reiniciar el juego
function reiniciar() {
    taco = {
        hambre: 100,
        energia: 100,
        felicidad: 100,
        vivo: true,
        edad: 0
    };

    document.getElementById("gatoEmoji").textContent = "🐱";
    document.getElementById("pensamiento").textContent = "¡Hola de nuevo! Soy Taco 😸";
    document.getElementById("estado").textContent = "Taco está vivo y feliz ✨";
    document.getElementById("estado").classList.remove("muerto");
    document.getElementById("estado").classList.add("vivo");
    document.getElementById("alertas").innerHTML = "";

    mostrarMensaje("success", "¡Juego reiniciado! Bienvenido de nuevo Taco 🐱");
    actualizar();
}

// Ejecutar actualización cada 2 segundos (el tiempo pasa para Taco)
setInterval(actualizarEstado, 2000);

// Actualizar interfaz cuando se carga la página
window.addEventListener("load", actualizar);

//ejercicio: consumo de APIs con fetch
//objetivo:  buscar un pokemon con pokeAPI y mostrar su nombre en consola
//1. crea una function llamada obtenerPokemon que reciba un nombre de pokemon, consulte la pokeAPI y devuelva los datos en JSON e improima en consola
function obtenerPokemon(nombre) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al obtener el Pokémon: ${response.statusText}`);
        }   
        return response.json();
    })
    .catch(error => {
        console.error('Error:', error.message);
        throw error;
    });
}

// Función para mostrar el Pokémon en la página
function mostrarPokemon(data) {
    const contenedor = document.getElementById('app');
    
    if (!data) return;
    
    const tipos = data.types.map(tipo => tipo.type.name).join(', ');
    const habilidades = data.abilities.map(habilidad => habilidad.ability.name).join(', ');
    
    const html = `
        <div class="pokemon-card">
            <div class="pokemon-header">
                <h1>${data.name.toUpperCase()}</h1>
                <p class="pokemon-id">#${data.id}</p>
            </div>
            <div class="pokemon-image">
                <img src="${data.sprites.other['official-artwork'].front_default || data.sprites.front_default}" alt="${data.name}">
            </div>
            <div class="pokemon-stats">
                <div class="stat-row">
                    <span>Peso:</span>
                    <span>${(data.weight / 10).toFixed(1)} kg</span>
                </div>
                <div class="stat-row">
                    <span>Altura:</span>
                    <span>${(data.height / 10).toFixed(1)} m</span>
                </div>
                <div class="stat-row">
                    <span>Tipos:</span>
                    <span>${tipos}</span>
                </div>
                <div class="stat-row">
                    <span>Habilidades:</span>
                    <span>${habilidades}</span>
                </div>
            </div>
            <div class="pokemon-abilities">
                <h3>Estadísticas Base:</h3>
                <div class="abilities-list">
                    ${data.stats.map(stat => `
                        <div class="ability">
                            <span>${stat.stat.name.replace('-', ' ').toUpperCase()}</span>
                            <div class="ability-bar">
                                <div class="ability-fill" style="width: ${(stat.base_stat / 150) * 100}%"></div>
                            </div>
                            <span>${stat.base_stat}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    contenedor.innerHTML = html;
}

// Función para buscar un Pokémon
function buscarPokemon() {
    const input = document.getElementById('searchInput');
    const nombre = input.value.trim();
    
    if (!nombre) {
        alert('Por favor, ingresa un nombre de Pokémon');
        return;
    }
    
    obtenerPokemon(nombre)
        .then(data => {
            mostrarPokemon(data);
        })
        .catch(error => {
            document.getElementById('app').innerHTML = `<p class="error">No se encontró el Pokémon "${nombre}". Intenta de nuevo.</p>`;
        });
}

// Permitir búsqueda con Enter
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            buscarPokemon();
        }
    });
});

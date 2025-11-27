// API URL
const API_URL = 'https://rickandmortyapi.com/api/character';

// Elementos del DOM
const container = document.getElementById('container');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchBn = document.getElementById('searchBn');

// Variables globales
let allCharacters = [];

// Función para obtener personajes de la API
async function fetchCharacters(name = '') {
    try {
        container.innerHTML = '<div class="loading">Cargando personajes...</div>';
        
        let url = API_URL;
        if (name.trim()) {
            url += `?name=${encodeURIComponent(name)}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) {
                container.innerHTML = '<div class="no-results">No se encontraron personajes con ese nombre</div>';
                return;
            }
            throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        allCharacters = data.results;
        renderCharacters(allCharacters);
    } catch (error) {
        console.error('Error al obtener personajes:', error);
        container.innerHTML = '<div class="error">Error al cargar los personajes. Intenta de nuevo.</div>';
    }
}

// Función para renderizar las tarjetas de personajes
function renderCharacters(characters) {
    if (!characters || characters.length === 0) {
        container.innerHTML = '<div class="no-results">No hay personajes que mostrar</div>';
        return;
    }
    
    container.innerHTML = '';
    
    characters.forEach(character => {
        const card = createCard(character);
        container.appendChild(card);
    });
}

// Función para crear una tarjeta de personaje
function createCard(character) {
    const card = document.createElement('div');
    card.className = 'card';
    
    // Determinar clase de estado
    const statusClass = character.status.toLowerCase();
    
    card.innerHTML = `
        <img src="${character.image}" alt="${character.name}" loading="lazy">
        <div class="card-content">
            <div class="card-name">${character.name}</div>
            <div class="card-info">
                <span class="card-label">Estado:</span>
                <span class="status ${statusClass}">${character.status}</span>
            </div>
            <div class="card-info">
                <span class="card-label">Especie:</span>
                <span>${character.species}</span>
            </div>
            <div class="card-info">
                <span class="card-label">Ubicación:</span>
                <span>${character.location.name}</span>
            </div>
        </div>
    `;
    
    return card;
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value;
    fetchCharacters(searchTerm);
});

searchBn.addEventListener('click', () => {
    searchInput.value = '';
    fetchCharacters();
});

// Búsqueda al presionar Enter
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = searchInput.value;
        fetchCharacters(searchTerm);
    }
});

// Cargar personajes al iniciar
fetchCharacters();

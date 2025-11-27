// URL base de la API Dog CEO
const API_URL = 'https://dog.ceo/api';

// Elementos del DOM
const newDogBtn = document.getElementById('newDogBtn');
const multipleDogsBtn = document.getElementById('multipleDogsBtn');
const breedSelect = document.getElementById('breedSelect');
const dogImage = document.getElementById('dogImage');
const dogBreed = document.getElementById('dogBreed');
const loadingSpinner = document.getElementById('loadingSpinner');
const gallery = document.getElementById('gallery');
const multiGallery = document.getElementById('multiGallery');

// Event listeners
newDogBtn.addEventListener('click', fetchRandomDog);
multipleDogsBtn.addEventListener('click', fetchMultipleDogs);
breedSelect.addEventListener('change', fetchDogByBreed);

// Cargar razas disponibles al iniciar
document.addEventListener('DOMContentLoaded', loadBreeds);

/**
 * Obtener todas las razas disponibles
 */
async function loadBreeds() {
    try {
        const response = await fetch(`${API_URL}/breeds/list/all`);
        const data = await response.json();
        
        if (data.status === 'success') {
            const breeds = Object.keys(data.message);
            populateBreedSelect(breeds);
        }
    } catch (error) {
        console.error('Error cargando razas:', error);
    }
}

/**
 * Llenar el selector de razas
 */
function populateBreedSelect(breeds) {
    breeds.sort().forEach(breed => {
        const option = document.createElement('option');
        option.value = breed;
        option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
        breedSelect.appendChild(option);
    });
}

/**
 * Mostrar el spinner de carga
 */
function showLoading() {
    loadingSpinner.classList.remove('hidden');
    gallery.style.opacity = '0.5';
}

/**
 * Ocultar el spinner de carga
 */
function hideLoading() {
    loadingSpinner.classList.add('hidden');
    gallery.style.opacity = '1';
}

/**
 * Obtener un perro aleatorio
 */
async function fetchRandomDog() {
    showLoading();
    try {
        const response = await fetch(`${API_URL}/breeds/image/random`);
        const data = await response.json();
        
        if (data.status === 'success') {
            const breedName = extractBreedName(data.message);
            displayDog(data.message, breedName);
            multiGallery.innerHTML = ''; // Limpiar galería múltiple
        }
    } catch (error) {
        console.error('Error obteniendo perro:', error);
        dogImage.src = '';
        dogBreed.textContent = 'Error cargando la imagen';
    } finally {
        hideLoading();
    }
}

/**
 * Obtener 6 perros aleatorios
 */
async function fetchMultipleDogs() {
    showLoading();
    multiGallery.innerHTML = '';
    
    try {
        // Obtener 6 perros de forma paralela
        const promises = Array(6).fill().map(() => 
            fetch(`${API_URL}/breeds/image/random`).then(r => r.json())
        );
        
        const results = await Promise.all(promises);
        
        results.forEach(data => {
            if (data.status === 'success') {
                const breedName = extractBreedName(data.message);
                createDogCard(data.message, breedName);
            }
        });
    } catch (error) {
        console.error('Error obteniendo múltiples perros:', error);
        multiGallery.innerHTML = '<p style="color: white; grid-column: 1/-1; text-align: center;">Error cargando las imágenes</p>';
    } finally {
        hideLoading();
    }
}

/**
 * Obtener perro por raza seleccionada
 */
async function fetchDogByBreed() {
    const breed = breedSelect.value;
    
    if (!breed) {
        return;
    }
    
    showLoading();
    try {
        const response = await fetch(`${API_URL}/breed/${breed}/images/random`);
        const data = await response.json();
        
        if (data.status === 'success') {
            const breedName = breed.charAt(0).toUpperCase() + breed.slice(1);
            displayDog(data.message, breedName);
            multiGallery.innerHTML = ''; // Limpiar galería múltiple
        }
    } catch (error) {
        console.error('Error obteniendo perro por raza:', error);
        dogImage.src = '';
        dogBreed.textContent = 'Error cargando la imagen';
    } finally {
        hideLoading();
    }
}

/**
 * Mostrar un perro en la galería principal
 */
function displayDog(imageUrl, breedName) {
    dogImage.src = imageUrl;
    dogBreed.textContent = `Raza: ${breedName}`;
}

/**
 * Crear una tarjeta de perro para la galería múltiple
 */
function createDogCard(imageUrl, breedName) {
    const card = document.createElement('div');
    card.className = 'dog-card';
    card.innerHTML = `
        <img src="${imageUrl}" alt="Imagen de ${breedName}" />
        <p class="breed-name">${breedName}</p>
    `;
    multiGallery.appendChild(card);
}

/**
 * Extraer nombre de raza de la URL
 */
function extractBreedName(url) {
    // Ejemplo: https://images.dog.ceo/breeds/husky/n02110185_11186.jpg
    const parts = url.split('/');
    const breed = parts[4];
    
    if (breed) {
        return breed.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
    
    return 'Perro';
}

// Cargar un perro aleatorio al iniciar
setTimeout(fetchRandomDog, 500);

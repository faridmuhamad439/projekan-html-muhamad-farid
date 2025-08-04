document.addEventListener('DOMContentLoaded', () => {
    let allRawImages = [];
    let characterList = [];
    let activeCharacterFilter = 'all';
    let activeOrientationFilter = 'all';
    let currentPage = 1;
    const imagesPerPage = 30;

    // Definisikan semua referensi DOM di sini
    const grid = document.getElementById('character-grid');
    const animeTitleHeader = document.getElementById('anime-title');
    const characterFiltersContainer = document.getElementById('character-filter-buttons');
    const orientationFiltersContainer = document.getElementById('orientation-filter-buttons');
    const paginationContainer = document.getElementById('pagination-container');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const pageInfo = document.getElementById('page-info');

    function initializePage() {
        displayMessage('Memuat galeri...');
        const params = new URLSearchParams(window.location.search);
        const animeId = params.get('animeId');
        if (!animeId) {
            displayMessage("ID Anime tidak ditemukan.", true);
            return;
        }

        fetch(`https://api-galeri-anime.onrender.com/api/anime/${animeId}`)
            .then(response => response.json())
            .then(anime => {
                processApiData(anime);
                createCharacterFilterButtons();
                displayFilteredImages();
            })
            .catch(error => {
                displayMessage(error.message, true);
            });
    }

    function displayFilteredImages() {
        clearElement(grid);
        let imagesToDisplay = allRawImages;

        if (activeCharacterFilter !== 'all') {
            imagesToDisplay = imagesToDisplay.filter(img => img.characterName === activeCharacterFilter);
        }
        if (activeOrientationFilter !== 'all') {
            imagesToDisplay = imagesToDisplay.filter(img => img.orientation === activeOrientationFilter);
        }

        // Panggil fungsi dari page.js dengan semua elemen yang dibutuhkan
        setupPagination({
            container: paginationContainer,
            prevButton: prevButton,
            nextButton: nextButton,
            pageInfo: pageInfo,
            currentPage: currentPage,
            totalItems: imagesToDisplay.length,
            itemsPerPage: imagesPerPage,
            onPageChange: (newPage) => {
                currentPage = newPage;
                displayFilteredImages();
            }
        });

        const startIndex = (currentPage - 1) * imagesPerPage;
        const paginatedImages = imagesToDisplay.slice(startIndex, startIndex + imagesPerPage);

        if (paginatedImages.length === 0) {
            displayMessage('Tidak ada gambar yang cocok.');
            return;
        }

        paginatedImages.forEach(image => {
            const item = document.createElement('div');
            item.className = 'character-item';
            const img = document.createElement('img');
            img.src = image.imageUrl;
            img.alt = image.characterName;
            img.loading = 'lazy';
            const infoDiv = document.createElement('div');
            infoDiv.className = 'item-info';
            const charNameDiv = document.createElement('div');
            charNameDiv.className = 'info-char';
            charNameDiv.textContent = image.characterName;
            infoDiv.appendChild(charNameDiv);
            item.appendChild(img);
            item.appendChild(infoDiv);
            item.addEventListener('click', () => {
                window.openModal(image.imageUrl);
            });
            grid.appendChild(item);
        });
    }

    characterFiltersContainer.addEventListener('click', (e) => {
        if (e.target.matches('.filter-btn')) {
            currentPage = 1;
            activeCharacterFilter = e.target.dataset.filter;
            characterFiltersContainer.querySelector('.active')?.classList.remove('active');
            e.target.classList.add('active');
            displayFilteredImages();
        }
    });

    orientationFiltersContainer.addEventListener('click', (e) => {
        if (e.target.matches('.filter-btn')) {
            currentPage = 1;
            activeOrientationFilter = e.target.dataset.filter;
            orientationFiltersContainer.querySelector('.active')?.classList.remove('active');
            e.target.classList.add('active');
            displayFilteredImages();
        }
    });

    // --- Kode Helper (tidak berubah) ---
    function processApiData(anime){ animeTitleHeader.textContent = anime.title; const processedImages = []; const characterSet = new Set(); anime.data?.forEach(character => { characterSet.add(character.characterName); const addImage = (url, orientation) => { if (url) processedImages.push({ imageUrl: url, characterName: character.characterName, orientation: orientation, }); }; character.characterImage?.potrait?.forEach(url => addImage(url, 'potrait')); character.characterImage?.square?.forEach(url => addImage(url, 'square')); character.characterImage?.landScape?.forEach(url => addImage(url, 'landScape')); }); allRawImages = processedImages; characterList = ['all', ...characterSet]; }
    function createCharacterFilterButtons() { clearElement(characterFiltersContainer); characterList.forEach(characterName => { const button = document.createElement('button'); button.className = 'filter-btn'; button.dataset.filter = characterName; button.textContent = (characterName === 'all') ? 'Semua Karakter' : characterName; if (characterName === activeCharacterFilter) button.classList.add('active'); characterFiltersContainer.appendChild(button); }); }
    function clearElement(element) { while (element.firstChild) { element.removeChild(element.firstChild); }}
    function displayMessage(message, isError = false) { clearElement(grid); const p = document.createElement('p'); p.textContent = message; if (isError) p.style.color = 'red'; grid.appendChild(p); }
    initializePage();
});
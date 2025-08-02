// explore.js (versi yang telah disesuaikan)

document.addEventListener('DOMContentLoaded', () => {
    let allImageData = [];
    let activeOrientationFilter = 'all';
    let currentSearchTerm = '';
    let currentPage = 1;
    const imagesPerPage = 30;

    const grid = document.getElementById('explore-character-grid');
    const filterButtonsContainer = document.getElementById('orientation-filter-buttons');
    const paginationContainer = document.getElementById('pagination-container');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const pageInfo = document.getElementById('page-info');

    function initPage() {
        displayMessage('Memuat gambar, mohon tunggu...');
        fetch("https://api-galeri-anime.onrender.com/api/anime")
            .then(response => response.json())
            .then(data => {
                processApiData(data);
                displayImages();
            })
            .catch(error => {
                displayMessage(`Gagal memuat data: ${error.message}`, true);
            });
    }

    function displayImages() {
        clearGrid();
        let filteredImages = allImageData;

        if (currentSearchTerm) {
            const searchTerm = currentSearchTerm.toLowerCase();
            filteredImages = filteredImages.filter(image =>
                image.animeTitle.toLowerCase().includes(searchTerm) ||
                image.characterName.toLowerCase().includes(searchTerm)
            );
        }
        
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (activeOrientationFilter === 'likes') {
            const likes = JSON.parse(localStorage.getItem(`likedImages_${loggedInUser}`) || '[]');
            filteredImages = filteredImages.filter(image => likes.includes(image.imageUrl));
        } else if (activeOrientationFilter === 'favorites') {
            const favorites = JSON.parse(localStorage.getItem(`favoritedImages_${loggedInUser}`) || '[]');
            filteredImages = filteredImages.filter(image => favorites.includes(image.imageUrl));
        } else if (activeOrientationFilter !== 'all') {
            filteredImages = filteredImages.filter(image => image.orientation === activeOrientationFilter);
        }

        setupPagination({
            container: paginationContainer,
            prevButton: prevButton,
            nextButton: nextButton,
            pageInfo: pageInfo,
            currentPage: currentPage,
            totalItems: filteredImages.length,
            itemsPerPage: imagesPerPage,
            onPageChange: (newPage) => {
                currentPage = newPage;
                displayImages();
            }
        });

        const startIndex = (currentPage - 1) * imagesPerPage;
        const paginatedImages = filteredImages.slice(startIndex, startIndex + imagesPerPage);

        if (paginatedImages.length === 0) {
            displayMessage('Tidak ada gambar yang cocok dengan kriteria Anda.');
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
            const animeNameDiv = document.createElement('div');
            animeNameDiv.className = 'info-anime';
            animeNameDiv.textContent = image.animeTitle;
            infoDiv.appendChild(charNameDiv);
            infoDiv.appendChild(animeNameDiv);
            item.appendChild(img);
            item.appendChild(infoDiv);
            item.addEventListener('click', () => {
                // Pastikan fungsi openModal ada di scope global, mungkin dari script.js
                if (window.openModal) {
                    window.openModal(image.imageUrl);
                }
            });
            grid.appendChild(item);
        });
    }

    filterButtonsContainer.addEventListener('click', (e) => {
        if (e.target.matches('button[data-filter]')) {
            currentPage = 1;
            activeOrientationFilter = e.target.dataset.filter;
            filterButtonsContainer.querySelector('.active')?.classList.remove('active');
            e.target.classList.add('active');
            displayImages();
        }
    });
    
    // ===============================================
    // PERUBAHAN: Menggunakan modul search.js
    // ===============================================
    // Panggil fungsi dari search.js, berikan ID input dan fungsi callback-nya.
    initializeSearch('explore-search-input', (searchTerm) => {
        // Logika ini akan dijalankan setiap kali pengguna mengetik di explore.html.
        currentPage = 1;
        currentSearchTerm = searchTerm;
        displayImages();
    });

    function processApiData(apiData) { const processedData = []; const filteredAnime = apiData.filter(anime => anime.id >= 1 && anime.id <= 11); filteredAnime.forEach(anime => { if (!anime.data) return; anime.data.forEach(character => { if (!character.characterImage) return; const addImage = (url, orientation) => { if (url) processedData.push({ imageUrl: url, orientation, characterName: character.characterName, animeTitle: anime.title }); }; character.characterImage.potrait?.forEach(url => addImage(url, 'potrait')); character.characterImage.square?.forEach(url => addImage(url, 'square')); character.characterImage.landScape?.forEach(url => addImage(url, 'landScape')); }); }); allImageData = processedData; }
    function clearGrid() { while (grid.firstChild) { grid.removeChild(grid.firstChild); } }
    function displayMessage(message, isError = false) { clearGrid(); const p = document.createElement('p'); p.textContent = message; if (isError) p.style.color = 'red'; grid.appendChild(p); }
    
    initPage();
});
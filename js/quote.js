// ==================================================
//    QUOTE.JS (TERINTEGRASI DENGAN MODAL & PAGE)
// ==================================================

document.addEventListener('DOMContentLoaded', () => {
    // --- Elemen & Variabel Utama ---
    const characterGrid = document.getElementById('character-grid');
    const animeTitle = document.getElementById('anime-title');
    let currentAnimeData = null;

    // --- Variabel BARU untuk paginasi ---
    let currentPage = 1;
    const imagesPerPage = 30; // Anda bisa sesuaikan jumlah ini

    // --- Referensi DOM BARU untuk paginasi ---
    const paginationContainer = document.getElementById('pagination-container');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const pageInfo = document.getElementById('page-info');

    // --- Fungsi Helper ---
    const getAnimeId = () => '11';
    const clearCharacterGrid = () => {
        while (characterGrid.firstChild) {
            characterGrid.removeChild(characterGrid.firstChild);
        }
    };

    // Fungsi untuk menambahkan gambar ke grid
    function addImageToGrid(url) {
        const item = document.createElement('div');
        item.className = 'character-item';
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Anime character image';
        img.loading = 'lazy';
        
        // Tambahkan event listener modal di sini
        item.addEventListener('click', () => {
            window.openModal(url); // Panggil fungsi modal dari modal.js
        });
        
        item.appendChild(img);
        characterGrid.appendChild(item);
    }

    // --- Fungsi Utama ---

    // Modifikasi fungsi display untuk mendukung paginasi
    function updateDisplay() {
        if (!currentAnimeData) return;
        clearCharacterGrid();

        // 1. Kumpulkan semua URL gambar potrait
        const portraitImages = [];
        currentAnimeData.data.forEach(character => {
            if (character.characterImage && character.characterImage.potrait) {
                character.characterImage.potrait.forEach(url => portraitImages.push(url));
            }
        });
        
        // 2. Panggil fungsi paginasi dari page.js
        setupPagination({
            container: paginationContainer,
            prevButton: prevButton,
            nextButton: nextButton,
            pageInfo: pageInfo,
            currentPage: currentPage,
            totalItems: portraitImages.length,
            itemsPerPage: imagesPerPage,
            onPageChange: (newPage) => {
                currentPage = newPage;
                updateDisplay(); // Panggil ulang fungsi ini saat halaman berubah
            }
        });

        // 3. Potong array gambar sesuai halaman saat ini
        const startIndex = (currentPage - 1) * imagesPerPage;
        const paginatedImages = portraitImages.slice(startIndex, startIndex + imagesPerPage);

        // 4. Tampilkan gambar untuk halaman ini
        paginatedImages.forEach(url => addImageToGrid(url));
    }

    // Fungsi untuk memuat data dari API
    function loadCharacterImages() {
        const animeId = getAnimeId();
        fetch("https://api-galeri-anime.onrender.com/api/anime")
            .then(response => {
                if (!response.ok) throw new Error('Gagal memuat data dari API');
                return response.json();
            })
            .then(result => {
                const anime = result.find(a => a.id == animeId);
                if (!anime) throw new Error('Anime dengan ID ' + animeId + ' tidak ditemukan');
                
                currentAnimeData = anime;
                animeTitle.textContent = `${anime.title} Gallery`;
                updateDisplay();
            })
            .catch(error => {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error';
                errorDiv.style.color = 'red';
                errorDiv.style.textAlign = 'center';
                errorDiv.textContent = error.message;
                clearCharacterGrid();
                characterGrid.appendChild(errorDiv);
            });
    }

    // Hapus kode modal lama dari sini
    // const modal = document.getElementById("image-modal");
    // ... dan semua event listener terkaitnya ...

    // --- Navigasi Hamburger ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Inisialisasi saat halaman dimuat
    loadCharacterImages();
});
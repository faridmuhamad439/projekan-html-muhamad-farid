// const h2 = document.createElement('h2');
// h2.textContent='Find Your Favorite Anime';
// const section = document.getElementsByClassName('size');
// section.appendChild(h2);


// Elemen DOM
const animeGallery = document.getElementById('anime-gallery');

// Fungsi untuk memuat data anime
function loadAnimeData() {

    // Ambil data dari API
    fetch("https://api-galeri-anime.onrender.com/api/anime")
        .then(response => response.json())
        .then(result => {
            // Filter hanya anime dengan ID 1-11
            const filteredAnime = result.filter(anime => anime.id >= 1 && anime.id <= 11);

            // Tampilkan anime di halaman
            showAnime(filteredAnime);
        })
        .catch(error => {


        });
}

// Fungsi untuk menampilkan anime
function showAnime(animeList) {

    // Buat card untuk setiap anime
    animeList.forEach(anime => {
        // Buat elemen card
        const card = document.createElement('div');
        card.className = 'landscape-card';

        // Buat gambar
        const img = document.createElement('img');
        img.className = 'landscape-image';
        img.src = anime.imageCover;
        img.alt = anime.title;

        // Buat overlay untuk judul
        const overlay = document.createElement('div');
        overlay.className = 'card-overlay';

        // Buat judul anime
        const title = document.createElement('div');
        title.className = 'card-title';
        title.textContent = anime.title;

        // Buat badge ID
        const idBadge = document.createElement('div');
        idBadge.className = 'card-id';
        idBadge.textContent = anime.id;

        // Gabungkan semua elemen
        overlay.appendChild(title);
        card.appendChild(img);
        card.appendChild(overlay);
        card.appendChild(idBadge);

        // Ketika card di klik, buka halaman anime.html
        card.addEventListener('click', () => {
            window.location.href = `anime.html?animeId=${anime.id}`;
        });

        // Tambahkan card ke galeri
        animeGallery.appendChild(card);
    });
}

function setupSearch() {
    const searchForm = document.getElementById('searchBox');
    const searchInput = document.getElementById('search-input');
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        performSearch();
    });
    
    searchInput.addEventListener('input', function() {
        performSearch();
    });
}

function performSearch() {
    const searchTerm = document.getElementById('search-input').value.trim().toLowerCase();
    
    if (!window.allAnimeData) return;
    
    if (searchTerm === '') {
        showAnime(window.allAnimeData);
        return;
    }
    
    const filteredAnime = window.allAnimeData.filter(anime => 
        anime.title.toLowerCase().includes(searchTerm)
    );
    
    showAnime(filteredAnime);
}


// Ketika halaman selesai dimuat
// Muat data anime
loadAnimeData();


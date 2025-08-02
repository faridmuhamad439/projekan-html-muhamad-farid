// home.js (versi yang telah disesuaikan)

// PENTING: GANTI DENGAN PATH VIDEO LOKAL ANDA
const localVideoPaths = [
    "../asset/bg_animme.mp4",
    "../asset/jujutsu3.mp4",
    "../asset/boku.mp4",
    "../asset/hunter.mp4",
    "../asset/punch.mp4",
];

let currentVideoIndex = 0;
let autoAdvanceTimer; // Variabel untuk menyimpan timer

// Referensi elemen DOM
const mainVideo = document.getElementById('main-video');
const prevBtn = document.getElementById('prev-video-btn');
const nextBtn = document.getElementById('next-video-btn');

function updateVideoPlayer(index) {
    if (localVideoPaths.length === 0) return;
    clearTimeout(autoAdvanceTimer);
    mainVideo.src = localVideoPaths[index];
    mainVideo.load();
    mainVideo.play().catch(e => console.error("Gagal memutar video:", e));
    autoAdvanceTimer = setTimeout(() => {
        goToNextVideo();
    }, 30000);
}

function goToNextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % localVideoPaths.length;
    updateVideoPlayer(currentVideoIndex);
}

function goToPrevVideo() {
    currentVideoIndex = (currentVideoIndex - 1 + localVideoPaths.length) % localVideoPaths.length;
    updateVideoPlayer(currentVideoIndex);
}

if(prevBtn && nextBtn){
    prevBtn.addEventListener('click', goToPrevVideo);
    nextBtn.addEventListener('click', goToNextVideo);
}

// ISI
const animeGallery = document.getElementById('anime-gallery');
let allAnimeData = [];

function loadAnimeData() {
    fetch("https://api-galeri-anime.onrender.com/api/anime")
        .then(response => {
            if (!response.ok) {
                throw new Error('Gagal mengambil data dari server.');
            }
            return response.json();
        })
        .then(result => {
            const filteredAnime = result.filter(anime => anime.id >= 1 && anime.id <= 11);
            allAnimeData = filteredAnime;
            showAnime(allAnimeData);
        })
        .catch(error => {
            if (animeGallery) {
                const p = document.createElement('p');
                p.textContent = error.message;
                p.style.color = 'red';
                p.style.textAlign = 'center';
                animeGallery.appendChild(p);
            }
        });
}

function showAnime(animeList) {
    if (!animeGallery) return;
    while(animeGallery.firstChild) animeGallery.removeChild(animeGallery.firstChild);

    if (animeList.length === 0) {
        const p = document.createElement('p');
        p.textContent = 'Anime tidak ditemukan.';
        p.style.textAlign = 'center';
        animeGallery.appendChild(p);
        return;
    }

    animeList.forEach(anime => {
        const card = document.createElement('div');
        card.className = 'landscape-card';
        const img = document.createElement('img');
        img.className = 'landscape-image';
        img.src = anime.imageCover;
        img.alt = anime.title;
        img.loading = 'lazy';
        const overlay = document.createElement('div');
        overlay.className = 'card-overlay';
        const title = document.createElement('div');
        title.className = 'card-title';
        title.textContent = anime.title;
        const idBadge = document.createElement('div');
        idBadge.className = 'card-id';
        idBadge.textContent = anime.id;
        overlay.appendChild(title);
        card.appendChild(img);
        card.appendChild(overlay);
        card.appendChild(idBadge);
        card.addEventListener('click', () => {
            if (anime.id == 11) {
                window.location.href = `quote.html?id=${anime.id}`;
            } else {
                window.location.href = `anime.html?animeId=${anime.id}`;
            }
        });
        animeGallery.appendChild(card);
    });
}

// --- Inisialisasi Halaman ---
document.addEventListener('DOMContentLoaded', () => {
    // Jalankan video slider jika elemennya ada
    if (mainVideo) {
        if(localVideoPaths.length > 0) {
            updateVideoPlayer(currentVideoIndex);
        } else {
            console.log("Tidak ada video dalam daftar putar.");
        }
    }
    
    // Jalankan galeri anime jika elemennya ada
    if (animeGallery) {
        loadAnimeData();
    }
    
    // ===============================================
    // PERUBAHAN: Menggunakan modul search.js
    // ===============================================
    // Panggil fungsi dari search.js, berikan ID input dan fungsi callback-nya.
    initializeSearch('search-input', (searchTerm) => {
        // Logika ini (dari `performSearch` lama) akan dijalankan setiap kali pengguna mengetik.
        const searchResult = allAnimeData.filter(anime =>
            anime.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        showAnime(searchResult);
    });
});
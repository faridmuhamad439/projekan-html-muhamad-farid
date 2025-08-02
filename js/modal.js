// ===============================================
//           KODE BERSAMA UNTUK MODAL
//         (Disimpan sebagai modal.js)
// ===============================================

// Variabel ini akan diakses oleh skrip lain (explore.js & anime.js)
let currentModalImageUrl = null;

document.addEventListener('DOMContentLoaded', () => {
    // Referensi Elemen DOM Modal
    const modal = document.getElementById("image-modal");
    // Jika tidak ada modal di halaman ini, hentikan eksekusi skrip
    if (!modal) return;

    const modalImg = document.getElementById("modal-image");
    const closeBtn = document.querySelector(".close");
    const modalLikeBtn = document.getElementById("modal-like-btn");
    const modalFavoriteBtn = document.getElementById("modal-favorite-btn");
    const downloadBtn = document.getElementById("modal-download-btn");

    const loggedInUser = localStorage.getItem("loggedInUser");

    // Fungsi Helper untuk Local Storage
    function getLikes() { return JSON.parse(localStorage.getItem(`likedImages_${loggedInUser}`) || '[]'); }
    function saveLikes(likesArray) { localStorage.setItem(`likedImages_${loggedInUser}`, JSON.stringify(likesArray)); }
    function getFavorites() { return JSON.parse(localStorage.getItem(`favoritedImages_${loggedInUser}`) || '[]'); }
    function saveFavorites(favoritesArray) { localStorage.setItem(`favoritedImages_${loggedInUser}`, JSON.stringify(favoritesArray)); }

    // Fungsi untuk memperbarui status tombol Suka/Favorit di dalam modal
    // Dibuat global agar bisa dipanggil dari explore.js dan anime.js
    window.updateModalButtonStates = function() {
        if (!currentModalImageUrl) return;
        const likes = getLikes();
        const favorites = getFavorites();

        modalLikeBtn.textContent = likes.includes(currentModalImageUrl) ? '❤️ Disukai' : '🤍 Suka';
        modalLikeBtn.classList.toggle('liked', likes.includes(currentModalImageUrl));
        
        modalFavoriteBtn.textContent = favorites.includes(currentModalImageUrl) ? '🌟 Favorit' : '⭐ Favorit';
        modalFavoriteBtn.classList.toggle('favorited', favorites.includes(currentModalImageUrl));
    }
    
    // Fungsi untuk membuka modal, dibuat global
    window.openModal = function(imageUrl) {
        currentModalImageUrl = imageUrl;
        modalImg.src = imageUrl;
        modal.style.display = "flex";
        window.updateModalButtonStates();
    }

    // --- Event Listeners untuk Tombol di Dalam Modal ---

    closeBtn.onclick = () => { modal.style.display = "none"; };
    window.addEventListener('click', (e) => { if (e.target == modal) modal.style.display = "none"; });

    modalLikeBtn.addEventListener('click', () => {
        if (!loggedInUser) { alert("Anda harus login untuk menyukai gambar."); window.location.href = "regist.html"; return; }
        let likes = getLikes();
        likes.includes(currentModalImageUrl) ? likes = likes.filter(url => url !== currentModalImageUrl) : likes.push(currentModalImageUrl);
        saveLikes(likes);
        window.updateModalButtonStates();
    });

    modalFavoriteBtn.addEventListener('click', () => {
        if (!loggedInUser) { alert("Anda harus login untuk memfavoritkan gambar."); window.location.href = "regist.html"; return; }
        let favorites = getFavorites();
        favorites.includes(currentModalImageUrl) ? favorites = favorites.filter(url => url !== currentModalImageUrl) : favorites.push(currentModalImageUrl);
        saveFavorites(favorites);
        window.updateModalButtonStates();
    });

    downloadBtn.addEventListener('click', () => { alert('Gagal mengunduh file. Kemungkinan besar karena kebijakan keamanan server (CORS). Coba klik kanan dan "Simpan Gambar Sebagai...".'); });

    
});
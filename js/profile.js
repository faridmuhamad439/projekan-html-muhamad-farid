
// ===============================================
//  JAVASCRIPT UNTUK HALAMAN PROFIL
// ===============================================

// BAGIAN 1: Referensi Elemen & Variabel Global
const loggedInUser = localStorage.getItem("loggedInUser");
let allImageData = []; // Untuk menyimpan semua data gambar dari API

const profileContent = document.getElementById('profile-content');
const loginPrompt = document.getElementById('login-prompt');
const profileUsername = document.getElementById('profile-username');
const profileHandle = document.getElementById('profile-handle');
const profileTabs = document.getElementById('profile-tabs');
const grid = document.getElementById('profile-grid');

// BAGIAN 2: Fungsi-fungsi Helper (Sama seperti di halaman explore)
function getLikes() {
    if (!loggedInUser) return [];
    const key = `likedImages_${loggedInUser}`;
    const likes = localStorage.getItem(key);
    return likes ? JSON.parse(likes) : [];
}

function getFavorites() {
    if (!loggedInUser) return [];
    const key = `favoritedImages_${loggedInUser}`;
    const favorites = localStorage.getItem(key);
    return favorites ? JSON.parse(favorites) : [];
}

// BAGIAN 3: Fungsi Utama untuk Menampilkan Gambar

// Fungsi untuk mengambil dan memproses data API menjadi daftar gambar
function fetchAndProcessImages() {
    // Kita fetch ulang data agar punya informasi lengkap (judul anime, dll) untuk setiap gambar
    return fetch("https://api-galeri-anime.onrender.com/api/anime")
        .then(response => response.json())
        .then(data => {
            const processedData = [];
            const filteredAnime = data.filter(anime => anime.id >= 1 && anime.id <= 11);
            filteredAnime.forEach(anime => {
                if (anime.data) {
                    anime.data.forEach(character => {
                        if (character.characterImage) {
                            const addImage = (url, orientation) => {
                                if (url) processedData.push({ imageUrl: url, orientation, characterName: character.characterName, animeTitle: anime.title });
                            };
                            character.characterImage.potrait?.forEach(url => addImage(url, 'potrait'));
                            character.characterImage.square?.forEach(url => addImage(url, 'square'));
                            character.characterImage.landScape?.forEach(url => addImage(url, 'landScape'));
                        }
                    });
                }
            });
            allImageData = processedData; // Simpan hasilnya ke variabel global
        });
}

// Fungsi untuk menampilkan gambar berdasarkan daftar URL tanpa menggunakan innerHTML
function renderGrid(imageUrlList, emptyMessage) {
    // Cara modern dan direkomendasikan untuk membersihkan semua isi elemen
    grid.replaceChildren();

    /* * Alternatif cara klasik untuk membersihkan isi elemen:
     * while (grid.firstChild) {
     *     grid.removeChild(grid.firstChild);
     * }
    */

    // Filter data gambar lengkap berdasarkan daftar URL yang kita punya
    const imagesToDisplay = allImageData.filter(imgData => imageUrlList.includes(imgData.imageUrl));

    if (imagesToDisplay.length === 0) {
        // 1. Buat elemen <p> baru
        const messageElement = document.createElement('p');

        // 2. Isi teksnya dengan aman menggunakan textContent
        messageElement.textContent = emptyMessage;

        // 3. Tambahkan elemen <p> tersebut ke dalam grid
        grid.appendChild(messageElement);
        return;
    }

    imagesToDisplay.forEach(image => {
        const item = document.createElement('div');
        item.className = 'character-item';

        const img = document.createElement('img');
        img.src = image.imageUrl;
        img.alt = `${image.characterName} dari ${image.animeTitle}`;
        img.loading = 'lazy';

        item.appendChild(img);
        grid.appendChild(item);
    });
}

// BAGIAN 4: Logika Inisialisasi Halaman
document.addEventListener('DOMContentLoaded', () => {
    // Cek apakah ada pengguna yang login
    if (!loggedInUser) {
        // Jika tidak, sembunyikan konten profil dan tampilkan pesan login
        profileContent.style.display = 'none';
        loginPrompt.style.display = 'block';
        return; // Hentikan eksekusi skrip
    }

    // Jika ada yang login, lanjutkan
    // 1. Tampilkan nama pengguna di profil
    profileUsername.textContent = loggedInUser;
    profileHandle.textContent = `@${loggedInUser}`;

    // 2. Ambil data gambar dari API, lalu tampilkan tab default (Disukai)
    grid.textContent = "Memuat gambar...";
    fetchAndProcessImages().then(() => {
        // Setelah semua data gambar siap, tampilkan gambar yang disukai
        renderGrid(getLikes(), "Anda belum menyukai gambar apapun.");
    }).catch(error => {
        grid.textContent = `style="color:red;">Gagal memuat data gambar.`
    });

    // 3. Tambahkan event listener untuk tab
    profileTabs.addEventListener('click', (event) => {
        if (event.target.matches('.tab-btn')) {
            const tab = event.target.dataset.tab;

            // Hapus class 'active' dari tab sebelumnya
            profileTabs.querySelector('.active').classList.remove('active');
            // Tambahkan class 'active' ke tab yang diklik
            event.target.classList.add('active');

            if (tab === 'liked') {
                renderGrid(getLikes(), "Anda belum menyukai gambar apapun.");
            } else if (tab === 'favorites') {
                renderGrid(getFavorites(), "Anda belum memfavoritkan gambar apapun.");
            }
        }
    });
});

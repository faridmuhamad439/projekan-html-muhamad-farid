// js/search.js

/**
 * Menginisialisasi fungsionalitas pencarian pada sebuah input.
 * @param {string} inputId - ID dari elemen input pencarian (misal: 'explore-search-input').
 * @param {function(string): void} callback - Fungsi yang akan dipanggil setiap kali ada input,
 * dengan membawa nilai dari input sebagai parameternya.
 */
function initializeSearch(inputId, callback) {
    // 1. Dapatkan elemen input berdasarkan ID yang diberikan.
    const searchInput = document.getElementById(inputId);

    // 2. Pastikan elemennya ada sebelum melanjutkan.
    if (!searchInput) {
        console.error(`Elemen input dengan ID "${inputId}" tidak ditemukan.`);
        return;
    }
    
    // 3. Dapatkan elemen form terdekat yang membungkus input.
    const searchForm = searchInput.closest('form');

    // 4. Tambahkan event listener 'input' untuk pencarian real-time.
    // Event ini akan aktif setiap kali pengguna mengetik sesuatu.
    searchInput.addEventListener('input', () => {
        // Ambil nilai dari input, hapus spasi di awal/akhir, dan jadikan huruf kecil.
        const searchTerm = searchInput.value.trim();
        
        // Panggil fungsi 'callback' yang diberikan dari halaman lain (explore.js atau home.js)
        // dan kirimkan kata kunci pencariannya.
        callback(searchTerm);
    });

    // 5. Jika input ada di dalam form, cegah form dari me-reload halaman.
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Mencegah aksi default (reload halaman).
        });
    }
}
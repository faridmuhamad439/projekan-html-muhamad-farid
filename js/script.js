// --- Skrip untuk Hamburger Menu (asumsi dari script.js Anda) ---
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu"); // Pastikan nav-menu punya ID ini di CSS Anda
if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        // Contoh logika sederhana, sesuaikan dengan implementasi Anda
        navMenu.classList.toggle("active");
    });
}


//LOG OUT
// Menunggu semua elemen HTML dimuat
document.addEventListener('DOMContentLoaded', () => {

    // 1. Cari elemen link Log Out berdasarkan ID yang kita buat
    const logoutButton = document.getElementById("logout-button");

    // 2. Pastikan elemen tersebut ada di halaman sebelum menambahkan aksi
    if (logoutButton) {

        // 3. Tambahkan "pendengar" yang akan aktif saat link di-klik
        logoutButton.addEventListener('click', function (event) {

            // 4. Mencegah link dari aksi default-nya (pindah halaman) untuk sementara
            event.preventDefault();

            // 5. Tampilkan pesan konfirmasi (opsional, tapi disarankan)
            const confirmation = confirm("Apakah Anda yakin ingin keluar?");

            // 6. Jika pengguna mengklik "OK" (true)
            if (confirmation) {

                // 7. Hapus data sesi login dari penyimpanan browser
                localStorage.removeItem("loggedInUser");

                // 8. Beri notifikasi bahwa logout berhasil
                alert("Anda telah berhasil log out.");

                // 9. Arahkan pengguna ke halaman index.html
                window.location.href = "/index.html";
            }
            // Jika pengguna mengklik "Cancel", tidak terjadi apa-apa
        });
    }
});

// back
// Menunggu semua elemen HTML dimuat
document.addEventListener('DOMContentLoaded', () => {

    // 1. Cari elemen tombol kembali berdasarkan ID-nya
    const backButton = document.getElementById("back-button");

    // 2. Pastikan tombolnya ada di halaman ini
    if (backButton) {

        // 3. Tambahkan "pendengar" yang akan aktif saat tombol di-klik
        backButton.addEventListener('click', () => {

            // 4. Perintahkan browser untuk kembali ke halaman sebelumnya
            history.back();
        });
    }
});

// --- Skrip untuk Memuat Pratinjau Galeri ---
document.addEventListener('DOMContentLoaded', () => {
    const showcaseContainer = document.getElementById('image-showcase');

    if (showcaseContainer) {
        fetch("https://api-galeri-anime.onrender.com/api/anime")
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                const previewImages = [];
                // Ambil beberapa gambar acak untuk pratinjau
                data.slice(0, 6).forEach(anime => {
                    if (anime.data && anime.data.length > 0) {
                        const character = anime.data[0];
                        if (character.characterImage?.potrait?.[0]) {
                            previewImages.push(character.characterImage.potrait[0]);
                        } else if (character.characterImage?.landScape?.[0]) {
                            previewImages.push(character.characterImage.landScape[0]);
                        }
                    }
                });

                // Tampilkan gambar ke showcase
                previewImages.slice(0, 12).forEach(url => { // Batasi maksimal 12 gambar
                    const item = document.createElement('div');
                    item.className = 'showcase-item';
                    const img = document.createElement('img');
                    img.src = url;
                    img.loading = 'lazy';
                    item.appendChild(img);
                    showcaseContainer.appendChild(item);
                });
            })
            .catch(error => {
                console.error('Error fetching gallery preview:', error);
                showcaseContainer.textContent = 'Gagal memuat pratinjau galeri.';
            });
    }
});

// theme
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggler Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    // On page load, apply the saved theme
    if (currentTheme) {
        body.classList.add(currentTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent link from navigating
            body.classList.toggle('light-theme');

            // Save the user's preference to localStorage
            if (body.classList.contains('light-theme')) {
                localStorage.setItem('theme', 'light-theme');
            } else {
                localStorage.removeItem('theme'); // Default is dark, so no class is needed
            }
        });
    }
});






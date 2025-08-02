// header
// const hamburger = document.querySelector(".hamburger");
// const menu = document.querySelector(".nav-menu");
// const overlay = document.querySelector(".nav-blur-overlay");

// hamburger.addEventListener("click", () => {
//     menu.classList.toggle("show");
//     overlay.classList.toggle("show");
// });

  // --- Skrip untuk Hamburger Menu (asumsi dari script.js Anda) ---
        const hamburger = document.getElementById("hamburger");
        const navMenu = document.getElementById("navMenu"); // Pastikan nav-menu punya ID ini di CSS Anda
        if (hamburger && navMenu) {
            hamburger.addEventListener("click", () => {
                // Contoh logika sederhana, sesuaikan dengan implementasi Anda
                navMenu.classList.toggle("active");
            });
        }

// kata kata homepage
// kata = document.getElementById('kata');

// const h1 = document.createElement('h1');
// h1.textContent = 'Tempat Terbaik Untuk Menikmati Gambar Anime Favoritmu!';

// const p = document.createElement('p');
// p.textContent = 'Jelajahi ribuan gambar anime berkualitas tinggi dari berbagai genre. Update setiap hari dan gratis diakses kapan saja!';
// const a = document.createElement('a');
// a.className = "mulai"
// a.href = "/html/home.html";

// const button = document.createElement('button');
// button.textContent = 'Mulai Sekarang →';


// kata.appendChild(h1);
// kata.appendChild(p);
// kata.appendChild(a);
// a.appendChild(button);


//LOG OUT
// Menunggu semua elemen HTML dimuat
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Cari elemen link Log Out berdasarkan ID yang kita buat
    const logoutButton = document.getElementById("logout-button");

    // 2. Pastikan elemen tersebut ada di halaman sebelum menambahkan aksi
    if (logoutButton) {
        
        // 3. Tambahkan "pendengar" yang akan aktif saat link di-klik
        logoutButton.addEventListener('click', function(event) {
            
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






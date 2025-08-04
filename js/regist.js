 document.addEventListener("DOMContentLoaded", function () {

            // --- Bagian 1: Referensi ke semua elemen penting ---
            const loginSection = document.getElementById("loginSection");
            const registerSection = document.getElementById("registerSection");
            const loginForm = document.getElementById("loginForm");
            const registerForm = document.getElementById("registerForm");
            const showRegisterLink = document.getElementById("showRegisterLink");
            const showLoginLink = document.getElementById("showLoginLink");

            // --- Bagian 2: Logika untuk beralih antar form ---
            showRegisterLink.addEventListener("click", function (e) {
                e.preventDefault(); // Mencegah link melakukan aksi default
                loginSection.classList.add("hidden"); // Sembunyikan form login
                registerSection.classList.remove("hidden"); // Tampilkan form registrasi
            });

            showLoginLink.addEventListener("click", function (e) {
                e.preventDefault(); // Mencegah link melakukan aksi default
                registerSection.classList.add("hidden"); // Sembunyikan form registrasi
                loginSection.classList.remove("hidden"); // Tampilkan form login
            });

            // --- Bagian 3: Logika untuk form registrasi ---
            registerForm.addEventListener("submit", function (e) {
                e.preventDefault();
                const username = document.getElementById("regUsername").value;
                const password = document.getElementById("regPassword").value;

                if (localStorage.getItem(username)) {
                    alert("Username sudah terdaftar! Silakan gunakan username lain.");
                } else {
                    localStorage.setItem(username, JSON.stringify({ password: password }));
                    alert("Registrasi berhasil! Silakan login.");
                    registerForm.reset();
                    // Otomatis pindah ke form login setelah berhasil daftar
                    registerSection.classList.add("hidden");
                    loginSection.classList.remove("hidden");
                }
            });

            // --- Bagian 4: Logika untuk form login ---
            loginForm.addEventListener("submit", function (e) {
                e.preventDefault();
                const username = document.getElementById("loginUsername").value;
                const password = document.getElementById("loginPassword").value;
                const userDataString = localStorage.getItem(username);

                if (!userDataString) {
                    alert("Username tidak ditemukan.");
                } else {
                    const user = JSON.parse(userDataString);
                    if (user.password !== password) {
                        alert("Password salah.");
                    } else {
                        alert("Login berhasil!");
                        localStorage.setItem("loggedInUser", username);
                        // Arahkan ke halaman utama setelah berhasil login
                        window.location.href = "/html/home.html";
                    }
                }
            });
        });
        // ==================================== */
        //         JAVASCRIPT LENGKAP           */
        // ==================================== */

        // Elemen DOM
        const characterGrid = document.getElementById('character-grid');
        const animeTitle = document.getElementById('anime-title');
        const characterFilterContainer = document.getElementById('character-filter-buttons');
        const orientationFilterContainer = document.getElementById('orientation-filter-buttons');

        // Menyimpan data anime dan status filter
        let currentAnimeData = null;
        let activeCharacterFilter = 'all';
        let activeOrientationFilter = 'all';

        // Fungsi untuk mendapatkan ID anime dari URL
        function getAnimeId() {
            const urlParams = new URLSearchParams(window.location.search);
            // Default ke ID 1 (Jujutsu Kaisen) jika tidak ada parameter di URL
            return urlParams.get('animeId') || '1';
        }

        // Fungsi untuk membersihkan grid
        function clearCharacterGrid() {
            while (characterGrid.firstChild) {
                characterGrid.removeChild(characterGrid.firstChild);
            }
        }

        // Fungsi untuk menambahkan gambar ke grid
        function addImageToGrid(url) {
            const item = document.createElement('div');
            item.className = 'character-item';
            const img = document.createElement('img');
            img.src = url;
            img.alt = 'Anime character image';
            img.loading = 'lazy';
            item.appendChild(img);
            characterGrid.appendChild(item);
        }

        // Fungsi untuk menampilkan gambar berdasarkan filter aktif
        function updateDisplay() {
            if (!currentAnimeData) return;
            clearCharacterGrid();
            currentAnimeData.data.forEach(character => {
                if (activeCharacterFilter === 'all' || activeCharacterFilter === character.characterName) {
                    if (activeOrientationFilter === 'all' || activeOrientationFilter === 'square') {
                        character.characterImage.square.forEach(url => addImageToGrid(url));
                    }
                    if (activeOrientationFilter === 'all' || activeOrientationFilter === 'potrait') {
                        character.characterImage.potrait.forEach(url => addImageToGrid(url));
                    }
                    if (activeOrientationFilter === 'all' || activeOrientationFilter === 'landScape') {
                        character.characterImage.landScape.forEach(url => addImageToGrid(url));
                    }
                }
            });
        }

        // Fungsi untuk membuat tombol filter karakter dari data API
        function populateCharacterFilters(anime) {
            characterFilterContainer.innerHTML = '';

            const allButton = document.createElement('button');
            allButton.className = 'filter-btn active';
            allButton.dataset.filter = 'all';
            allButton.textContent = 'Semua Karakter';
            characterFilterContainer.appendChild(allButton);

            anime.data.forEach(character => {
                const imageUrl = character.characterImage.square && character.characterImage.square.length > 0 ?
                    character.characterImage.square[0] :
                    'https://via.placeholder.com/55'; // Gambar cadangan

                const charButton = document.createElement('button');
                charButton.className = 'filter-btn char-filter-btn';
                charButton.dataset.filter = character.characterName;
                charButton.dataset.tooltip = character.characterName;

                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = `Filter for ${character.characterName}`;
                img.loading = 'lazy';

                charButton.appendChild(img);
                characterFilterContainer.appendChild(charButton);
            });
        }

        // Fungsi utama untuk memuat data dari API
        function loadCharacterImages() {
            const animeId = getAnimeId();
            fetch("https://api-galeri-anime.onrender.com/api/anime")
                .then(response => {
                    if (!response.ok) throw new Error('Gagal memuat data dari API');
                    return response.json();
                })
                .then(result => {
                    const anime = result.find(a => a.id == animeId);
                    if (!anime) throw new Error('Anime tidak ditemukan');
                    currentAnimeData = anime;
                    animeTitle.textContent = `${anime.title} Gallery`;
                    populateCharacterFilters(anime);
                    updateDisplay();
                })
                .catch(error => {
                    characterGrid.innerHTML = `<div class="error" style="color: red;">${error.message}</div>`;
                });
        }

        // --- Event Listeners ---

        characterFilterContainer.addEventListener('click', function(event) {
            const button = event.target.closest('button');
            if (button) {
                activeCharacterFilter = button.dataset.filter;
                characterFilterContainer.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                updateDisplay();
            }
        });

        orientationFilterContainer.addEventListener('click', function(event) {
            if (event.target.tagName === 'BUTTON') {
                activeOrientationFilter = event.target.dataset.filter;
                orientationFilterContainer.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                event.target.classList.add('active');
                updateDisplay();
            }
        });

        // --- Fungsionalitas Modal & Hamburger ---
        const modal = document.getElementById("image-modal");
        const modalImg = document.getElementById("modal-image");
        const closeBtn = document.querySelector(".close");
        const downloadBtn = document.querySelector(".modal .button");

        characterGrid.addEventListener('click', function(event) {
            if (event.target.tagName === 'IMG') {
                modal.style.display = "flex";
                modalImg.src = event.target.src;
            }
        });
        
        closeBtn.onclick = function() {
            modal.style.display = "none";
        }
        
        downloadBtn.addEventListener('click', function() {
            alert('Fitur download masih dalam tahap pengembangan.');
        });
        
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Inisialisasi saat halaman dimuat
        loadCharacterImages();
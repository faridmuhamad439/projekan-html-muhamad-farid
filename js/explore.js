document.addEventListener('DOMContentLoaded', function () {
    const characterGallery = document.getElementById('character-gallery');
    const animeCount = document.getElementById('anime-count');
    const characterCount = document.getElementById('character-count');
    const imageCount = document.getElementById('image-count');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Variabel untuk menyimpan semua gambar
    let allImages = [];
    let totalCharacters = 0;
    let totalImages = 0;

    // Function to create gallery items
    function createGalleryItems(images) {
        // Clear existing content
        characterGallery.innerHTML = '';

        // If no images, show message
        if (images.length === 0) {
            characterGallery.innerHTML = `
                        <div class="error">
                            <i class="fas fa-exclamation-circle"></i>
                            <p>Tidak ada gambar karakter yang ditemukan</p>
                        </div>
                    `;
            return;
        }

        // Animate items with staggered delay
        let delay = 0;

        images.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery-item ${item.type}`;
            galleryItem.style.animationDelay = `${delay}ms`;

            const img = document.createElement('img');
            img.src = item.url;
            img.alt = `${item.characterName} - ${item.animeTitle}`;
            img.loading = 'lazy';

            // Add error handling for images
            img.onerror = function () {
                this.onerror = null;
                this.src = 'https://via.placeholder.com/300x400?text=Image+Not+Available';
            };

            const animeBadge = document.createElement('div');
            animeBadge.className = 'anime-badge';
            animeBadge.textContent = item.animeTitle;

            const idBadge = document.createElement('div');
            idBadge.className = 'character-id';
            idBadge.textContent = item.animeId;

            galleryItem.appendChild(img);
            galleryItem.appendChild(animeBadge);
            galleryItem.appendChild(idBadge);

            characterGallery.appendChild(galleryItem);

            // Increase delay for next card
            delay += 50;
        });
    }

    // Function to filter images
    function filterImages(type) {
        if (type === 'all') {
            createGalleryItems(allImages);
        } else {
            const filteredImages = allImages.filter(item => item.type === type);
            createGalleryItems(filteredImages);
        }
    }

    // Function to collect all images
    function collectAllImages(apiData) {
        allImages = [];
        totalCharacters = 0;
        totalImages = 0;

        // Filter anime with id 1 to 11
        const filteredAnime = apiData.filter(anime => anime.id >= 1 && anime.id <= 11);

        // Update anime count
        animeCount.textContent = `${filteredAnime.length} Anime`;

        // Process each anime
        filteredAnime.forEach(anime => {
            // Skip anime with no data array
            if (!anime.data || !Array.isArray(anime.data)) {
                console.warn(`Skipping anime ${anime.id}: No data array`);
                return;
            }

            // Process each character
            anime.data.forEach(character => {
                // Skip character with no characterImage
                if (!character.characterImage) {
                    console.warn(`Skipping character: No characterImage`);
                    return;
                }

                totalCharacters++;

                // Helper function to process image arrays
                const processImageArray = (images, type) => {
                    if (Array.isArray(images)) {
                        images.forEach(url => {
                            if (typeof url === 'string' && url.trim() !== '') {
                                allImages.push({
                                    url,
                                    type,
                                    animeId: anime.id,
                                    animeTitle: anime.title,
                                    characterName: character.characterName
                                });
                                totalImages++;
                            }
                        });
                    }
                };

                // Process square images
                processImageArray(character.characterImage.square, 'square');

                // Process portrait images
                processImageArray(character.characterImage.potrait, 'potrait');

                // Process landscape images
                processImageArray(character.characterImage.landScape, 'landScape');
            });
        });

        // Update counts
        characterCount.textContent = `${totalCharacters} Karakter`;
        imageCount.textContent = `${totalImages} Gambar`;

        // Create gallery with all images
        createGalleryItems(allImages);

        // Add event listeners to filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Filter images
                filterImages(this.dataset.filter);
            });
        });
    }

    // Fetch data from API
    fetch("https://api-galeri-anime.onrender.com/api/anime")
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((result) => {
            // Check if result is an array
            if (!Array.isArray(result)) {
                throw new Error('API response is not an array');
            }

            collectAllImages(result);
        })
        .catch((error) => {
            // Clear loading message
            characterGallery.innerHTML = '';

            // Show error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error';
            errorDiv.innerHTML = `
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>Gagal memuat data: ${error.message}</p>
                        <p>Silakan coba lagi nanti</p>
                        <button id="retry-btn">Coba Lagi</button>
                    `;
            characterGallery.appendChild(errorDiv);

            // Add retry button event
            document.getElementById('retry-btn').addEventListener('click', function () {
                location.reload();
            });

            console.error('Error fetching data:', error);
        });
});
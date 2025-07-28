// header
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".nav-menu");
const overlay = document.querySelector(".nav-blur-overlay");

hamburger.addEventListener("click", () => {
    menu.classList.toggle("show");
    overlay.classList.toggle("show");
});


// kata kata homepage
kata = document.getElementById('kata');

const h1 = document.createElement('h1');
h1.textContent = 'Tempat Terbaik Untuk Menikmati Gambar Anime Favoritmu!';

const p = document.createElement('p');
p.textContent = 'Jelajahi ribuan gambar anime berkualitas tinggi dari berbagai genre. Update setiap hari dan gratis diakses kapan saja!';
const a = document.createElement('a');
a.className = "mulai"
a.href = "/html/home.html";

const button = document.createElement('button');
button.textContent = 'Mulai Sekarang →';


kata.appendChild(h1);
kata.appendChild(p);
kata.appendChild(a);
a.appendChild(button);






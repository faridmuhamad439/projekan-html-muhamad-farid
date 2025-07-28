// Ambil elemen target
const section = document.getElementById('sec');
const messageContainer = document.createElement('div');
messageContainer.id = "yaya"

// Buat elemen h2
const h2 = document.createElement('h2');
h2.textContent = 'Send Your Message';

// Buat form
const form = document.createElement('form');

// ===== Name =====
const labelName = document.createElement('label');

labelName.textContent = 'Name :';

const inputName = document.createElement('input');
inputName.type = 'text';
inputName.id = 'name';
inputName.placeholder = 'Type Your Name';

// // ===== Email =====
const labelEmail = document.createElement('label');
labelEmail.textContent = 'Email :';

const inputEmail = document.createElement('input');
inputEmail.type = 'email';
inputEmail.id = 'email';
inputEmail.placeholder = 'Type Your Email';

// // ===== Message =====
const labelMsg = document.createElement('label');
labelMsg.textContent = 'Message :';

const textarea = document.createElement('textarea');
textarea.rows = 5;
textarea.placeholder = 'Send Your Message';

// // ===== Submit Button =====
const buttonm = document.createElement('button');
buttonm.type = 'submit';
buttonm.textContent = 'Submit';
buttonm.addEventListener('click'
    , function () {
        alert('TERIMA KASIH. PESAN ANDA SUDAH TERKIRIM!');
    });

// // Gabungkan ke form
form.appendChild(labelName);
form.appendChild(inputName);
form.appendChild(labelEmail);
form.appendChild(inputEmail);
form.appendChild(labelMsg);
form.appendChild(textarea);
form.appendChild(buttonm);

// Gabungkan ke dalam container
messageContainer.appendChild(h2);
messageContainer.appendChild(form);
section.appendChild(messageContainer);

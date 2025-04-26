document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  header.classList.add('flash');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
  });

  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('a');
    toggle.addEventListener('click', e => {
      e.preventDefault();
      dropdowns.forEach(d => {
        if (d !== dropdown) d.classList.remove('show');
      });
      dropdown.classList.toggle('show');
    });
  });

  document.addEventListener('click', e => {
    if (![...dropdowns].some(d => d.contains(e.target))) {
      dropdowns.forEach(d => d.classList.remove('show'));
    }
  });
});

const form = document.getElementById('edit-form');
const inputs = form.querySelectorAll('input');
const saveBtn = document.getElementById('saveBtn');
const successMsg = document.getElementById('successMsg');

// دالة للتحقق من صحة النموذج
function validateForm() {
  const first = document.getElementById('firstName').value.trim();
  const last = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();
  const category = document.getElementById('category').value.trim();

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneValid = /^[0-9]{10,15}$/.test(phone);

  return first && last && emailValid && phoneValid && address && category;
}

// تعطيل زر "حفظ" حتى يتم التحقق من صحة النموذج
inputs.forEach(input => {
  input.addEventListener('input', () => {
    saveBtn.disabled = !validateForm();
  });
});

// معالجة إرسال النموذج
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const data = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    phone: form.phone.value,
    address: form.address.value,
    category: form.category.value,
  };

  localStorage.setItem('profileData', JSON.stringify(data));
  successMsg.style.display = 'block';

  setTimeout(() => {
    successMsg.style.display = 'none';
  }, 3000);
});

// التعامل مع تغيير الصورة الجديدة
const profilePictureInput = document.getElementById('profile-picture-input');
const profileImg = document.getElementById('profile-img');

profilePictureInput.addEventListener('change', (event) => {
  const file = event.target.files[0]; // الحصول على الملف
  const reader = new FileReader();

  reader.onload = (e) => {
    profileImg.src = e.target.result; // تغيير src للصورة
  };

  if (file) {
    reader.readAsDataURL(file); // قراءة محتوى الملف
  }
});

function handleSubmit(event) {
  event.preventDefault(); // يمنع التحميل التلقائي

  // إخفاء الفورم تدريجيًا
  const form = document.querySelector('.subscribe');
  form.style.transition = 'opacity 0.5s ease';
  form.style.opacity = '0';

  setTimeout(() => {
    form.style.display = 'none';
    
    // عرض الرسالة بتأثير
    const message = document.getElementById('message');
    message.style.display = 'block';
    
    // تشغيل الحركة بعد وقت بسيط
    setTimeout(() => {
      message.classList.add('show');
    }, 50);
  }, 500); // الانتظار لحين اختفاء الفورم
  }
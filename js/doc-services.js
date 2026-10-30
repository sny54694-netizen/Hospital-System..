const modal = document.getElementById('serviceModal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const confirmBtn = document.getElementById('confirmService');
const serviceMsg = document.getElementById('serviceMsg');
const userName = document.getElementById('userName');
const userPhone = document.getElementById('userPhone');

let selectedService = "";

document.querySelectorAll('.serviceBtn').forEach(btn => {
    btn.addEventListener('click', () => {
        selectedService = btn.getAttribute('data-service');
        modalTitle.textContent = selectedService + " Service";
        modal.style.display = "flex";
        serviceMsg.textContent = "";
    });
});

closeModal.addEventListener('click', () => modal.style.display = "none");
window.addEventListener('click', (e) => { if(e.target === modal) modal.style.display = "none"; });

confirmBtn.addEventListener('click', () => {
    if(userName.value.trim() === "" || userPhone.value.trim() === ""){
        serviceMsg.textContent = "نام اور فون نمبر لکھیں";
        serviceMsg.style.color = "red";
        return;
    }
    const booking = {
        service: selectedService,
        name: userName.value,
        phone: userPhone.value,
        time: new Date().toLocaleString()
    };
    let bookings = JSON.parse(localStorage.getItem('serviceBookings') || "[]");
    bookings.push(booking);
    localStorage.setItem('serviceBookings', JSON.stringify(bookings));

    serviceMsg.textContent = "✅ " + selectedService + " booked! ہم رابطہ کریں گے";
    serviceMsg.style.color = "green";
    userName.value = ""; userPhone.value = "";
    
    setTimeout(()=> modal.style.display="none", 1500);
});
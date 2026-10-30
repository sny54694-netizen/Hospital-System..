// Appointment Booking Logic
const fullName = document.getElementById('fullName');
const phone = document.getElementById('phone');
const service = document.getElementById('service');
const date = document.getElementById('date');
const message = document.getElementById('message');
const confirmBtn = document.getElementById('confirmBtn');
const msg = document.getElementById('msg');

// Appointment button se form tak scroll
document.querySelectorAll('.btn-blue').forEach(btn => {
    if(btn.textContent.includes('Appointment')){
        btn.addEventListener('click', () => {
            document.querySelector('.booking-side').scrollIntoView({behavior: 'smooth'});
        });
    }
});

confirmBtn.addEventListener('click', () => {
    // Validation
    if(fullName.value.trim() === ""){
        showMsg("پہلے اپنا پورا نام لکھیں", "red");
        return;
    }
    if(phone.value.trim().length < 10){
        showMsg("صحیح فون نمبر لکھیں", "red");
        return;
    }
    if(service.value === ""){
        showMsg("کوئی سروس سلیکٹ کریں", "red");
        return;
    }
    if(date.value === ""){
        showMsg("تاریخ سلیکٹ کریں", "red");
        return;
    }

    // Save in localStorage (temporary database)
    const appointment = {
        name: fullName.value,
        phone: phone.value,
        service: service.value,
        date: date.value,
        message: message.value,
        time: new Date().toLocaleString()
    };

    let bookings = JSON.parse(localStorage.getItem('bookings') || "[]");
    bookings.push(appointment);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    showMsg("✅ Appointment Confirmed! ہم 30 منٹ میں آپ سے رابطہ کریں گے", "green");
    
    // Form clear
    fullName.value = ""; phone.value = ""; service.value = ""; date.value = ""; message.value = "";

    console.log("All Bookings:", bookings);
});

function showMsg(text, color){
    msg.textContent = text;
    msg.style.color = color;
    setTimeout(()=> msg.textContent = "", 4000);
}
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('dateSlider');
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let selectedDate = "";
  let selectedTime = "09:30 AM";

  function renderDates(){
    if(!slider) return;
    slider.innerHTML = '<button>&lt;</button>';
    for(let i=0; i<5; i++){
      let d = new Date(); d.setDate(new Date().getDate() + i);
      let label = i==0 ? `Today • ${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}` : `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
      let cls = i==0 ? `class="active-date"` : ``;
      slider.innerHTML += `<button ${cls}>${label}</button>`;
    }
    slider.innerHTML += '<button>&gt;</button>';
    
    // تاریخ پر کلک
    document.querySelectorAll('#dateSlider button').forEach(btn => {
      if(btn.textContent === '<' || btn.textContent === '>') return;
      btn.addEventListener('click', () => {
        document.querySelectorAll('#dateSlider button').forEach(b => b.classList.remove('active-date'));
        btn.classList.add('active-date');
        selectedDate = btn.textContent;
      });
    });
    selectedDate = document.querySelector('.active-date')?.textContent || "";
  }
  renderDates();

  // ٹائم پر کلک
  document.querySelectorAll('.time-slots button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.time-slots button').forEach(b => b.classList.remove('time-active'));
      btn.classList.add('time-active');
      selectedTime = btn.textContent;
    });
  });

  // بک بٹن پر کلک - یہ اب 100% کام کرے گا
  document.getElementById('bookAppointmentBtn').addEventListener('click', () => {
    let date = document.querySelector('.active-date')?.textContent;
    let time = document.querySelector('.time-active')?.textContent;
    let msgBox = document.getElementById('bookingMsg');

    if(!date || !time){
      msgBox.textContent = "براہ مہربانی تاریخ اور وقت منتخب کریں";
      msgBox.style.color = "red";
      return;
    }

    let booking = { doctor: "Dr. Jack Miller", date: date, time: time, fee: "$80", bookedAt: new Date().toLocaleString() };
    let allBookings = JSON.parse(localStorage.getItem('doctorBookings') || "[]");
    allBookings.push(booking);
    localStorage.setItem('doctorBookings', JSON.stringify(allBookings));

    msgBox.textContent = `✅ بک ہو گیا! ${date} کو ${time} بجے`;
    msgBox.style.color = "green";
    
    // چیک کرنے کے لیے کہ سیو ہوا یا نہیں
    console.log("سیو ہو گیا:", booking);
    alert("Appointment Booked Successfully!");
  });
});
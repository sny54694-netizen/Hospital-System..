document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('confirmBtn');
    if (!btn) return;

    btn.addEventListener('click', function(e) {
        e.preventDefault();

        let name = document.getElementById('pName').value.trim();
        let phone = document.getElementById('pPhone').value.trim();
        let service = document.getElementById('pService').value;
        let date = document.getElementById('pDate').value;
        let msg = document.getElementById('pMessage').value.trim();

        if(name === "" || phone === "" || date === ""){
            alert("Name, Phone, Date bharna zaroori hai");
            return;
        }

        let id = "APT-" + Math.floor(Math.random()*9000+1000);
        let data = {
            id: id,
            name: name,
            phone: phone,
            service: service,
            date: date,
            message: msg,
            bookingTime: new Date().toLocaleString()
        };

        let oldData = JSON.parse(localStorage.getItem('allAppointments') || "[]");
        oldData.push(data);
        localStorage.setItem('allAppointments', JSON.stringify(oldData));

        alert("Confirmed! ID: " + id);
        
        // Form ke jagah slip dikhana
        document.querySelector('.booking-side').innerHTML = `
            <div style="text-align:center; padding:20px; background:#fff; border-radius:12px;">
                <h2 style="color:green;">✓ Appointment Confirmed</h2>
                <h3 style="background:#eef6ff; padding:10px; border-radius:8px; margin:15px 0; color:#0a68e0;">${id}</h3>
                <p><b>Name:</b> ${name}</p>
                <p><b>Phone:</b> ${phone}</p>
                <p><b>Date:</b> ${date}</p>
                <button onclick="location.reload()" style="margin-top:20px; background:#0a68e0; color:white; border:none; padding:12px 20px; border-radius:6px; cursor:pointer;">New Appointment</button>
            </div>
        `;
    });
});
const sendBtn = document.getElementById('sendBtn');
const cName = document.getElementById('cName');
const cEmail = document.getElementById('cEmail');
const cSubject = document.getElementById('cSubject');
const cMessage = document.getElementById('cMessage');
const cMsg = document.getElementById('cMsg');

sendBtn.addEventListener('click', () => {
    if(cName.value.trim() === "" || cEmail.value.trim() === "" || cMessage.value.trim() === ""){
        cMsg.textContent = "براہ کرم نام، ای میل اور میسج لکھیں";
        cMsg.style.color = "red";
        return;
    }

    const contactData = {
        name: cName.value,
        email: cEmail.value,
        subject: cSubject.value,
        message: cMessage.value,
        time: new Date().toLocaleString()
    };

    let messages = JSON.parse(localStorage.getItem('contactMessages') || "[]");
    messages.push(contactData);
    localStorage.setItem('contactMessages', JSON.stringify(messages));

    cMsg.textContent = "✅ شکریہ! آپ کا میسج بھیج دیا گیا ہے، ہم جلد رابطہ کریں گے";
    cMsg.style.color = "green";

    cName.value = ""; cEmail.value = ""; cSubject.value = ""; cMessage.value = "";
});

document.getElementById('sendBtn').addEventListener('click', function(e){
  e.preventDefault();

  let name = document.getElementById('cName').value.trim();
  let email = document.getElementById('cEmail').value.trim();
  let subject = document.getElementById('cSubject').value.trim();
  let message = document.getElementById('cMessage').value.trim();
  let msgBox = document.getElementById('cMsg');

  if(name === "" || email === "" || message === ""){
    msgBox.innerText = "براہ کرم ساری معلومات پُر کریں";
    msgBox.style.color = "red";
    return;
  }

  let allMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];
  allMessages.push({ name, email, subject, message, date: new Date().toLocaleString() });
  localStorage.setItem('contactMessages', JSON.stringify(allMessages));

  msgBox.innerText = "شکریہ! آپ کا میسج بھیج دیا گیا ہے۔ ہم جلد رابطہ کریں گے";
  msgBox.style.color = "green";
  
  document.getElementById('cName').value = "";
  document.getElementById('cEmail').value = "";
  document.getElementById('cSubject').value = "";
  document.getElementById('cMessage').value = "";
  
  console.log("Saved:", allMessages);
});
// Hospitals page setting

const modal = document.getElementById('detailModal');
const closeModal = document.getElementById('closeModal');
const modalName = document.getElementById('modalName');
const viewButtons = document.querySelectorAll('.viewBtn');

// Jab View Details par click hoga
viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const hospitalName = btn.getAttribute('data-name');
        modalName.textContent = hospitalName;
        modal.style.display = "flex";
    });
});

// Modal band karna
closeModal.addEventListener('click', () => {
    modal.style.display = "none";
});

window.addEventListener('click', (e) => {
    if(e.target === modal){
        modal.style.display = "none";
    }
});
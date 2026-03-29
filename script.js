// Initialize stock from localStorage or set defaults
let inventory = JSON.parse(localStorage.getItem('medStock')) || {
    "Paracetamol": 0,
    "Amoxicillin": 0
};

const ADMIN_PASSWORD = "shree123";

function restockMedicine() {
    const pass = document.getElementById('admin-pass').value;
    const name = document.getElementById('admin-med-name').value;
    const qty = parseInt(document.getElementById('admin-qty').value);

    if (pass !== ADMIN_PASSWORD) {
        alert("Incorrect Admin Password!");
        return;
    }

    if (name && qty > 0) {
        inventory[name] = (inventory[name] || 0) + qty;
        saveAndRefresh();
        alert(`${qty} units of ${name} added! Total: ${inventory[name]}`);
    } else {
        alert("Please enter valid medicine name and quantity.");
    }
}

function buyMedicine() {
    const name = document.getElementById('user-med-name').value;
    const qty = parseInt(document.getElementById('user-qty').value);

    if (inventory[name] >= qty) {
        inventory[name] -= qty;
        saveAndRefresh();
        alert(`Purchase successful! Remaining ${name}: ${inventory[name]}`);
    } else {
        alert(`Insufficient stock! We only have ${inventory[name] || 0} left.`);
    }
}

function saveAndRefresh() {
    localStorage.setItem('medStock', JSON.stringify(inventory));
    console.log("Current Inventory:", inventory);
}

// This replaces the Python backend by saving data in your browser's memory
let stock = JSON.parse(localStorage.getItem('medStock')) || {
    "Paracetamol": 50,
    "Amoxicillin": 20
};

const ADMIN_PASSWORD = "shree123";

function restockMedicine() {
    const password = document.getElementById("admin-pass").value;
    const name = document.getElementById("admin-med-name").value;
    const qty = parseInt(document.getElementById("admin-qty").value);

    if (password !== ADMIN_PASSWORD) {
        alert("Invalid Admin Password!");
        return;
    }

    if (name && qty > 0) {
        stock[name] = (stock[name] || 0) + qty;
        localStorage.setItem('medStock', JSON.stringify(stock));
        alert(`Success! ${name} stock is now ${stock[name]}`);
    } else {
        alert("Please enter a valid name and quantity.");
    }
}

function buyMedicine() {
    const name = document.getElementById("user-med-name").value;
    const qty = parseInt(document.getElementById("user-qty").value);

    if (stock[name] && stock[name] >= qty) {
        stock[name] -= qty;
        localStorage.setItem('medStock', JSON.stringify(stock));
        alert(`Purchase Successful! Remaining ${name}: ${stock[name]}`);
    } else {
        alert(`Stock unavailable! We only have ${stock[name] || 0} units.`);
    }
}

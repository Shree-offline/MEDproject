const API = "/api";

// --- CUSTOMER LOGIC ---
async function calculateTotal() {
    const inputName = document.getElementById('med-select').value.trim();
    const qty = parseFloat(document.getElementById('buy-qty').value);
    const display = document.getElementById('price-display');

    if (!inputName || !qty || qty <= 0) {
        display.innerHTML = "Total: $0.00";
        return;
    }

    try {
        const res = await fetch(`${API}/inventory`);
        const inventory = await res.json();

        // Search case-insensitively
        // This looks through the list and finds the first match regardless of capital letters
        const medKey = Object.keys(inventory).find(
            key => key.toLowerCase() === inputName.toLowerCase()
        );

        if (medKey) {
            const item = inventory[medKey];
            const total = item.price * qty;
            display.innerHTML = `Total: $${total.toFixed(2)}`;
            display.style.color = "#28a745"; // Make it green if found
        } else {
            display.innerHTML = "Medicine not found";
            display.style.color = "#dc3545"; // Make it red if not found
        }
    } catch (err) {
        console.error("Error fetching inventory:", err);
    }
}

// --- ADMIN LOGIC ---
async function loginAdmin() {
    const pass = document.getElementById('admin-pass').value;
    const res = await fetch(`${API}/admin-login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({password: pass})
    });
    if (res.ok) window.location.href = "admin.html";
    else alert("Invalid Password");
}

async function loadAdminTable() {
    try {
        const res = await fetch(`${API}/inventory`);
        const data = await res.json();
        const table = document.getElementById('admin-table');
        if(!table) return; // Exit if not on admin page
        
        table.innerHTML = '';
        for (const [name, info] of Object.entries(data)) {
            table.innerHTML += `<tr><td>${name}</td><td>${info.stock}</td><td>$${info.price}</td></tr>`;
        }
    } catch (e) { console.log("Table load error", e); }
}

async function saveUpdate() {
    const payload = {
        name: document.getElementById('up-name').value,
        quantity: document.getElementById('up-qty').value,
        price: document.getElementById('up-price').value
    };
    await fetch(`${API}/update-inventory`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });
    loadAdminTable();
    // Clear inputs after saving
    document.getElementById('up-name').value = '';
    document.getElementById('up-qty').value = '';
    document.getElementById('up-price').value = '';
}

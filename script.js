const API = "/api";

// Portal Login
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

// Customer: Calculate Total
async function calculateTotal() {
    const name = document.getElementById('med-select').value;
    const qty = document.getElementById('buy-qty').value;
    const res = await fetch(`${API}/inventory`);
    const data = await res.json();
    
    if (data[name]) {
        const total = data[name].price * qty;
        document.getElementById('price-display').innerHTML = `Total: $${total.toFixed(2)}`;
    }
}

// Admin: Load Table
async function loadAdminTable() {
    const res = await fetch(`${API}/inventory`);
    const data = await res.json();
    const table = document.getElementById('admin-table');
    table.innerHTML = '';
    for (const [name, info] of Object.entries(data)) {
        table.innerHTML += `<tr><td>${name}</td><td>${info.stock}</td><td>$${info.price}</td></tr>`;
    }
}

// Admin: Save Change
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
}

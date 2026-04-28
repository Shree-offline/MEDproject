import os
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

# This version is simplified to prevent "Not Found" errors
app = Flask(__name__, static_url_path='', static_folder='.')
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-key-123')
CORS(app)

# --- THE DATABASE ---
inventory_db = {
    "Paracetamol": {"stock": 50, "price": 5.0},
    "Amoxicillin": {"stock": 20, "price": 12.5},
    "Vitamin C": {"stock": 100, "price": 8.0}
}

# --- ROUTES TO SERVE YOUR PAGES ---
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

# This catch-all route helps if you try to visit /customer.html directly
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

# --- API ENDPOINTS ---
@app.route('/api/inventory', methods=['GET'])
def get_inventory():
    return jsonify(inventory_db)

@app.route('/api/admin-login', methods=['POST'])
def admin_login():
    data = request.json
    expected = os.environ.get('ADMIN_PASSWORD', 'admin123')
    if data.get('password') == expected:
        return jsonify({"status": "authorized"}), 200
    return jsonify({"status": "unauthorized"}), 401

@app.route('/api/update-inventory', methods=['POST'])
def update_inventory():
    data = request.json
    name = data.get('name')
    if name:
        inventory_db[name] = {
            "stock": int(data.get('quantity', 0)),
            "price": float(data.get('price', 0))
        }
    return jsonify({"status": "success"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)

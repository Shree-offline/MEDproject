import os
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_url_path='', static_folder='.')
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-key-123')
CORS(app)

# Mock Database with Prices
inventory_db = {
    "Paracetamol": {"stock": 50, "price": 5.0},
    "Amoxicillin": {"stock": 20, "price": 12.5},
    "Vitamin C": {"stock": 100, "price": 8.0}
}

@app.route('/')
def index(): return send_from_directory('.', 'index.html')

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
    inventory_db[name] = {
        "stock": int(data.get('quantity')),
        "price": float(data.get('price'))
    }
    return jsonify({"status": "success"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)

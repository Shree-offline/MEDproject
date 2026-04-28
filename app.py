import os
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_url_path='', static_folder='.')

# SECURITY: Use an environment variable for the secret key.
# On Render, add a 'SECRET_KEY' variable in the dashboard.
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-default-secure-string-123')

# Enable CORS for frontend interaction
CORS(app)

# ---------------------------------------------------------
# ROUTING: SERVING THE UI
# ---------------------------------------------------------

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/admin')
def admin_page():
    return send_from_directory('.', 'admin.html')

@app.route('/customer')
def customer_page():
    return send_from_directory('.', 'customer.html')

# ---------------------------------------------------------
# API ENDPOINTS
# ---------------------------------------------------------

@app.route('/api/inventory', methods=['GET'])
def get_inventory():
    # Mock data - in a real app, this would come from a database
    stock = {
        "Paracetamol": 50,
        "Amoxicillin": 20,
        "Vitamin C": 100
    }
    return jsonify(stock)

@app.route('/api/admin-login', methods=['POST'])
def admin_login():
    data = request.json
    password = data.get('password')
    
    # SECURITY: Compare against an Environment Variable
    # Set ADMIN_PASSWORD in your Render Dashboard
    expected_password = os.environ.get('ADMIN_PASSWORD', 'admin123')
    
    if password == expected_password:
        return jsonify({"status": "authorized"}), 200
    else:
        return jsonify({"status": "unauthorized"}), 401

# ---------------------------------------------------------
# EXECUTION
# ---------------------------------------------------------

if __name__ == "__main__":
    # Render uses the PORT environment variable. Default to 10000 for local testing.
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)

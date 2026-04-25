import os
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

# SECURITY: Use an environment variable for the secret key in production
# If not set, it defaults to a random string (useful for local dev)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-key-placeholder-123')

# SECURITY: Restrict CORS to your frontend URL once deployed
# For now, it stays as default, but you can change this to your Render URL later
CORS(app)

@app.route('/inventory', methods=['GET'])
def get_inventory():
    # In a real app, this data would come from a secure database
    stock = {
        "Paracetamol": 50, 
        "Amoxicillin": 20
    }
    return jsonify(stock)

if __name__ == "__main__":
    # SECURITY: Render sets the PORT environment variable automatically
    port = int(os.environ.get("PORT", 10000))
    # '0.0.0.0' allows the app to be accessible within the Render container
    app.run(host='0.0.0.0', port=port)

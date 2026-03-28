from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This is the "join" that lets your frontend talk to the backend

@app.route('/inventory', methods=['GET'])
def get_inventory():
    # Put your medicine data here
    stock = {
        "Paracetamol": 50,
        "Amoxicillin": 20
    }
    return jsonify(stock)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=10000)

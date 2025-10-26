from flask import Flask, request, jsonify
from flask_cors import CORS  # Allow cross-origin requests
import pickle
import numpy as np

# ---------------------------
# Load trained ML artifacts
# ---------------------------
with open("model_gbc.pkl", "rb") as f:
    model = pickle.load(f)

with open("scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

with open("encoder.pkl", "rb") as f:
    encoder = pickle.load(f)

# ---------------------------
# Initialize Flask app
# ---------------------------
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# ---------------------------
# Routes
# ---------------------------
@app.route("/predict", methods=["POST"])
def predict():
    """
    Expects a JSON payload:
    {
        "N": float,
        "P": float,
        "K": float,
        "temperature": float,
        "humidity": float,
        "ph": float,
        "rainfall": float
    }
    Returns recommended crop as JSON.
    """
    try:
        data = request.get_json()
        
        # Extract features in correct order
        features = np.array([
            data['N'],
            data['P'],
            data['K'],
            data['temperature'],
            data['humidity'],
            data['ph'],
            data['rainfall']
        ]).reshape(1, -1)
        
        # Scale features
        features_scaled = scaler.transform(features)
        
        # Predict crop
        prediction_encoded = model.predict(features_scaled)
        
        # Decode label to actual crop name
        prediction = encoder.inverse_transform(prediction_encoded)[0]
        
        return jsonify({"recommended_crop": prediction})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# ---------------------------
# Run the app
# ---------------------------
if __name__ == "__main__":
    app.run(debug=True)

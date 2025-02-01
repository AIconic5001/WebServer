from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
from routes.api import api as api_blueprint
# from routes.test import test  # Uncomment if needed

app = Flask(__name__, static_folder='static')

# Enable CORS for API routes
CORS(app, resources={r"/api/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE"]}})

# Register the API blueprint
app.register_blueprint(api_blueprint, url_prefix='/api')

# Uncomment if you want to use the test blueprint
# app.register_blueprint(test, url_prefix='/api/test')

# Serve a basic response for the root URL
@app.route('/')
def home():
    return jsonify({"message": "Flask backend is running!"})

# Serve static files (if a frontend exists)
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

if __name__ == '__main__':
    app.run(debug=True)

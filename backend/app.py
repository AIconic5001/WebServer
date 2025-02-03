import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
# from werkzeug.utils import secure_filename
from routes.files import localFiles as files_blueprint
from routes.test import test as test_blueprint
# Create Flask app
app = Flask(__name__, static_folder='frontend/build', static_url_path='/')

# Enable CORS for API routes
# make sure that every API has to be prefixed with /api
CORS(app, resources={r"/api/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE"]}})

# # Set the upload folder
# UPLOAD_FOLDER = 'uploads'
# ALLOWED_EXTENSIONS = {'pdf', 'docx'}
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.register_blueprint(test_blueprint, url_prefix='/api/test')
app.register_blueprint(files_blueprint, url_prefix='/api/files')

@app.route('/')
@cross_origin()
def index():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)

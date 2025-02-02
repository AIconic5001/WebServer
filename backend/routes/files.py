from flask import Flask, request, jsonify, send_from_directory, Blueprint, request, current_app
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from routes.api import api as api_blueprint


# Create a blueprint for auth routes
localFiles = Blueprint('files', __name__, static_folder='uploads')

# Set the upload folder
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'docx'}
# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# get all files
@localFiles.route('/', methods=['GET'])
def list_files():
    files = []
    for filename in os.listdir(UPLOAD_FOLDER):
        files.append({
            'name': filename,
            'url': f'/api/files/download/{filename}'
        })
    return jsonify(files)
# def home():
#     return jsonify({"message": "Frontend placeholder"})

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Post new file
@localFiles.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        return jsonify({"message": "File uploaded successfully", "filename": filename}), 200

    return jsonify({"error": "Invalid file type"}), 400

@localFiles.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename, as_attachment=True)

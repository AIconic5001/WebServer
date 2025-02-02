import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
# from werkzeug.utils import secure_filename
from routes.files import localFiles as files_blueprint
from routes.test import test as test_blueprint
# Create Flask app
app = Flask(__name__, static_folder='static')

# Enable CORS for API routes
# make sure that every API has to be prefixed with /api
CORS(app, resources={r"/api/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE"]}})

# # Set the upload folder
# UPLOAD_FOLDER = 'uploads'
# ALLOWED_EXTENSIONS = {'pdf', 'docx'}
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.register_blueprint(test_blueprint, url_prefix='/api/test')
app.register_blueprint(files_blueprint, url_prefix='/api/files')

# @app.route('/')
# def home():
#     return jsonify({"message": "Frontend placeholder"})

# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# @app.route('/api/upload', methods=['POST'])
# def upload_file():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file part"}), 400

#     file = request.files['file']

#     if file.filename == '':
#         return jsonify({"error": "No selected file"}), 400

#     if file and allowed_file(file.filename):
#         filename = secure_filename(file.filename)
#         file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#         file.save(file_path)
#         return jsonify({"message": "File uploaded successfully", "filename": filename}), 200

#     return jsonify({"error": "Invalid file type"}), 400

# @app.route('/api/download/<filename>', methods=['GET'])
# def download_file(filename):
#     return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)

import os
import logging
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
from werkzeug.exceptions import RequestEntityTooLarge

# Initialize Flask app
app = Flask(__name__, static_folder=None)
CORS(app)

# Configuration
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
MAX_FILE_SIZE = 16 * 1024 * 1024  # 16MB

app.config.from_mapping(
    UPLOAD_FOLDER=UPLOAD_FOLDER,
    MAX_CONTENT_LENGTH=MAX_FILE_SIZE
)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('FileUpload')

# Create uploads directory if not exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
logger.info(f"Upload directory configured at: {UPLOAD_FOLDER}")

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.errorhandler(RequestEntityTooLarge)
def handle_file_too_large(error):
    """Handle file size limit errors"""
    return jsonify({
        "error": f"File size exceeds {MAX_FILE_SIZE//(1024*1024)}MB limit"
    }), 413

@app.route('/api/test', methods=['GET', 'POST'])
def handle_test():
    """Test endpoint for connection checks"""
    if request.method == 'POST':
        data = request.get_json()
        logger.info(f"Received POST data: {data}")
        return jsonify({"message": "POST received", "data": data}), 200
    
    return jsonify({"test": "GET working"})

@app.route('/api/upload', methods=['POST'])
def upload_file():
    """Handle file uploads"""
    try:
        if 'file' not in request.files:
            logger.error("No file part in request")
            return jsonify({"error": "No file part"}), 400
            
        file = request.files['file']
        
        if file.filename == '':
            logger.error("Empty filename submitted")
            return jsonify({"error": "No selected file"}), 400

        if not (file and allowed_file(file.filename)):
            logger.error(f"Disallowed file type: {file.filename}")
            return jsonify({"error": "File type not allowed"}), 400

        filename = secure_filename(file.filename)
        save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        logger.info(f"Saving file: {filename}")
        file.save(save_path)
        logger.info(f"File saved successfully: {save_path}")
        
        return jsonify({
            "message": "File uploaded successfully",
            "filename": filename,
            "size": os.path.getsize(save_path)
        }), 200

    except Exception as e:
        logger.error(f"Upload failed: {str(e)}")
        return jsonify({
            "error": "File upload failed",
            "details": str(e)
        }), 500

@app.route('/api/files', methods=['GET'])
def list_files():
    """List uploaded files"""
    try:
        files = os.listdir(app.config['UPLOAD_FOLDER'])
        return jsonify({
            "files": files,
            "count": len(files)
        })
    except Exception as e:
        logger.error(f"File list error: {str(e)}")
        return jsonify({"error": "Could not retrieve files"}), 500

@app.route('/api/files/<filename>', methods=['GET'])
def download_file(filename):
    """Download a specific file"""
    try:
        return send_from_directory(
            app.config['UPLOAD_FOLDER'],
            filename,
            as_attachment=True
        )
    except FileNotFoundError:
        logger.error(f"File not found: {filename}")
        return jsonify({"error": "File not found"}), 404
    except Exception as e:
        logger.error(f"Download error: {str(e)}")
        return jsonify({"error": "File download failed"}), 500

# Serve React app in production
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    """Serve static files for React app in production"""
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    # Configure static folder for production
    app.static_folder = os.path.join(os.path.dirname(__file__), 'frontend', 'build')
    app.run(debug=True, port=5000)
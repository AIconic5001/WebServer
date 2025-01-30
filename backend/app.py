from flask import Flask, send_from_directory
from flask_cors import CORS
from routes.api import api as api_blueprint
# from routes.test import test

app = Flask(__name__, static_folder='static')

CORS(app, resoures={r"/api/*": {"origins": "*", "methods":["GET", "POST", "PUT", "DELETE"]}})


# Register the API blueprint
app.register_blueprint(api_blueprint, url_prefix='/api')

# # Test api
# app.register_blueprint(test, url_prefix='/api/test')

if __name__ == '__main__':
    app.run(debug=True)
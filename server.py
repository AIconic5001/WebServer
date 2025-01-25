from flask import Flask, render_template
from flask import request
import os
# Create a new Flask instance
app = Flask(__name__)

# Define the folder where uploaded files will be saved
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Create the folder if it doesn't exist

# Define a route
@app.route('/')
def hello_world():
    return render_template('index.html')



@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        file = request.files['file']
        if file:
            filename = file.filename
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            return f'File saved to {filepath}'
    return render_template('upload.html')


@app.route('/save', methods=['POST'])
def save():
    data = request.json
    with open('data.json', 'w') as f:
        f.write(str(data))
    return '<h1>Data saved successfully</h1>'
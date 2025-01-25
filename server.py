from flask import Flask, render_template
from flask import request
# Create a new Flask instance
app = Flask(__name__)

# Define a route
@app.route('/')
def hello_world():
    return '<h1>Hello, World!</h1>'

@app.route('/user/<username>')
def user(username):
    return '<h1>Hello {}</h1>!!!'.format(username)

@app.route('/about')
def about():
    return '<h1>This is about page! some changes are made</h1>'


@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        file = request.files['file']
        print(file)
        if file:
            file.save(f"/save/{file.filename}")
            return '<h1>File uploaded successfully</h1>'
    return render_template('index.html')


@app.route('/save', methods=['POST'])
def save():
    data = request.json
    with open('data.json', 'w') as f:
        f.write(str(data))
    return '<h1>Data saved successfully</h1>'
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return {"<p>Hello, World!</p>"}

@app.route("/about")
def about():
    return "<p>About</p>"

@app.route("/contact")
def contact():
    return {"contact": "There will be a list of contacts"}

if __name__ == "__main__":
    app.run(debug=True)
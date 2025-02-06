from flask import Flask, Blueprint, jsonify, request

# Create a blueprint for auth routes
test = Blueprint('test', __name__)

@test.route('/', methods=['GET', 'POST'])
def testAPI():
    print(request)
    if request.method == 'GET':
        return jsonify({'test': 'Some test data'})
    elif request.method == 'POST':
        data = request.json
        print(data)
        return jsonify({'message': 'Data received', 'data': data})


from flask import Blueprint, jsonify
from flask import request

api = Blueprint('hello', __name__)


@api.route('/data')
def get_data():
    return jsonify({'data': 'Some data'})

@api.route('/test', methods=['GET', 'POST'])
def test():
    print(request)
    if request.method == 'GET':
        return jsonify({'test': 'Some test data'})
    elif request.method == 'POST':
        data = request.json
        print(data)
        return jsonify({'message': 'Data received', 'data': data})


from flask import Blueprint, jsonify, request

# Create a blueprint for auth routes
test = Blueprint('test', __name__)

@test.route('/', methods=['GET'])
def login():
    return jsonify({'message': 'Tested successfully'})

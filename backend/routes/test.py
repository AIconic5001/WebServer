from flask import Blueprint, jsonify, request

# Create a blueprint for auth routes
auth = Blueprint('test', __name__)

@auth.route('/', methods=['GET'])
def login():
    return jsonify({'message': 'Tested successfully'})

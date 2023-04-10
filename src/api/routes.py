"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    @api.route('/signup', methods=['POST'])
    def create_new_user():
        email = request.json.get('email', None)
        password = request.json.get('password', None)
        is_active = request.json.get('is_active', True)
        
        user=User(email=email, password=password, is_active=is_active)
        db.session.add(user)
        db.session.commit()
        response_body={
            "message": "all ok"
        }

        return jsonify(response_body), 200
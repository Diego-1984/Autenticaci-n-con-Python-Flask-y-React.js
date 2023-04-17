"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


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

@api.route('/login', methods=['POST'])
def login_user():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    user = User.query.filter (email = email, password = password).firts()
    if user is None:
            # user no se encuentra en la base de datos
        return jsonify({"mensage":"error en usuario y/o password"}), 401

    # crear un nuevo token con el usuario encontrado en la base de datos
    access_token = create_access_token (identify = user.id)
    return jsonify({ "token" : access_token}), 200

@api.route('/private', methods = ['GET'])
@jwt_required()
def go_to_private():
    users = Users.query.all()
    users = [user.serialize() for users in users]
    return jsonify({ "users" : users}), 200


from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from dataclasses import dataclass
from flask_cors import CORS

# config
app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://admin:Co7LUH7WtFeL8FaAcA5B@db-parcial.crxiuk7halti.us-east-1.rds.amazonaws.com:3306/ahorcados'  #TO CHANGE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

@dataclass
class Lobby(db.Model):
    id: int
    name: str
    player_id: int
    active: bool

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=True, nullable=False, default=f'lobby {id}')
    player_id = db.Column(db.Integer, db.ForeignKey('player.id'), nullable=False)
    active = db.Column(db.Boolean, nullable=False, default=True)

    def __repr__(self):
        return f'<lobby {self.id}>'


# routes
@app.route('/lobby', methods=['GET', 'POST'])
def route_lobby():
    if request.method == 'GET':
        return get_lobby()
    elif request.method == 'POST':
        return post_lobby()

@app.route('/lobby/<id>', methods=['GET', 'DELETE'])
def route_lobby_id(id):
    if request.method == 'GET':
        return get_lobby_id(id)
    elif request.method == 'DELETE':
        return delete_lobby(id)



def get_lobby():
    lobby = Lobby.query.filter_by(active=True).all()
    return jsonify(lobby)


def post_lobby():
    json = request.get_json()
    lobby = Lobby(name=json['name'], player_id=json['player_id'])
    db.session.add(lobby)
    db.session.commit()
    return {'id': lobby.id}


def get_lobby_id(id):
    lobby = Lobby.query.get(id)
    return jsonify(lobby)


def delete_lobby(id):
    lobby = Lobby.query.get(id)
    lobby.active = False
    db.session.commit()
    return 'SUCCESS'


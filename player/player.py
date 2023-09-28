from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from dataclasses import dataclass
from flask_cors import CORS

# config
app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:utec@localhost/ahorcados_db'  #TO CHANGE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


@dataclass
class Player(db.Model):
    id: int
    username: str
    password: str
    logged_in: bool
    wins: int
    defeats: int
    ties: int

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(20), nullable=False)
    logged_in = db.Column(db.Boolean, nullable=False, default=False)
    wins = db.Column(db.Integer, nullable=False, default=0)
    defeats = db.Column(db.Integer, nullable=False, default=0)
    ties = db.Column(db.Integer, nullable=False, default=0)

    def __repr__(self):
        return f'<player {self.username}>'


# routes
@app.route('/player', methods=['GET', 'POST'])
def route_player():
    if request.method == 'GET':
        return get_player()
    elif request.method == 'POST':
        return post_player()

@app.route('/player/<id>', methods=['GET', 'PUT', 'DELETE'])
def route_player_id(id):
    if request.method == 'GET':
        return get_player_id(id)
    elif request.method == 'PUT':
        return update_player_id(id)
    elif request.method == 'DELETE':
        return delete_player(id)
    
@app.route('/player/login', methods=['POST'])
def route_player_login():
    return player_login()



####################
# Player
####################
def get_player():
    player = Player.query.all()
    return jsonify(player)


def post_player():
    json = request.get_json()
    player = Player.query.filter_by(username=json['username']).first()
    if player is None:
        player = Player(username=json['username'], password=json['password'])
        db.session.add(player)
        db.session.commit()
        return 'SUCCESS'
    else:   
        return 'FAIL'


def get_player_id(id):
    player = Player.query.get(id)
    return jsonify(player)


def update_player_id(id):
    json = request.get_json()
    player = Player.query.get(id)
    player.wins += json['wins']
    player.defeats += json['defeats']
    player.ties += json['ties']
    db.session.commit()
    return 'SUCCESS'


def delete_player(id):
    player = Player.query.get(id)
    db.session.delete(player)
    db.session.commit()
    return 'SUCCESS'

def player_login():
    input_player = request.get_json()
    player = Player.query.filter_by(username=input_player['username']).first()
    if player is not None:
        if player.password == input_player['password']:
            player.logged_in = True
            db.session.commit()
            return jsonify({"response": str(player.id)})
        else:
            return jsonify({"response": "FAIL"})
    else:
        return jsonify({"response": "FAIL"})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)


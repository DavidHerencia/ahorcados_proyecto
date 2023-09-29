from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import DateTime, func
from dataclasses import dataclass
from flask_cors import CORS
from datetime import datetime

# config
app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://admin:Co7LUH7WtFeL8FaAcA5B@db-parcial.crxiuk7halti.us-east-1.rds.amazonaws.com:3306/ahorcados'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


@dataclass
class Game(db.Model):
    id: int
    player1_id: int
    player2_id: int
    word1: str
    word2: str
    lives1: int
    lives2: int
    guesses1: str
    guesses2: str
    outcome: int
    date: str

    id = db.Column(db.Integer, primary_key=True)
    player1_id = db.Column(db.Integer, db.ForeignKey('player.id'), nullable=False)
    player2_id = db.Column(db.Integer, db.ForeignKey('player.id'), nullable=False)
    word1 = db.Column(db.String(20), db.ForeignKey('word.word'), nullable=False)
    word2 = db.Column(db.String(20), db.ForeignKey('word.word'), nullable=False)
    lives1 = db.Column(db.Integer, nullable=False, default=6)
    lives2 = db.Column(db.Integer, nullable=False, default=6)
    guesses1 = db.Column(db.String(20), nullable=False, default='')
    guesses2 = db.Column(db.String(20), nullable=False, default='')
    outcome = db.Column(db.Integer, nullable=False, default=0)
    date = db.Column(DateTime, nullable=False, default=datetime.now())

    def __repr__(self):
        return f'<game {self.id}>'


# routes
@app.route('/game', methods=['GET', 'POST'])
def route_game():
    if request.method == 'GET':
        return get_game()
    elif request.method == 'POST':
        return post_game()

@app.route('/game/<id>', methods=['GET', 'PUT', 'DELETE'])
def route_game_id(id):
    if request.method == 'GET':
        return get_game_id(id)
    elif request.method == 'PUT':
        return update_game_id(id)
    elif request.method == 'DELETE':
        return delete_game(id)

@app.route('/game/<id>/guess', methods=['PUT'])
def route_game_id_guess(id):
    return update_game_id_guess(id)



####################
# Game
####################
def get_game():
    game = Game.query.all()
    return jsonify(game)


def post_game():
    json = request.get_json()
    game = Game(id=json['id'], player1_id=json['player1_id'], player2_id=json['player2_id'], word1=json['word1'], word2=json['word2'])
    db.session.add(game)
    db.session.commit()
    return 'SUCCESS'


def get_game_id(id):
    game = Game.query.get(id)
    return jsonify(game)


def update_game_id(id):
    json = request.get_json()
    game = Game.query.get(id)
    game.outcome = json['outcome']
    db.session.commit()
    return 'SUCCESS'


def update_game_id_guess(id):
    json = request.get_json()
    game = Game.query.get(id)
    # check if guess1 or guess2 was sent
    if 'guesses1' in json:
        game.guesses1 = json['guesses1']
        if game.guesses1[-1] not in game.word1:
            game.lives1 -= 1
        db.session.commit()
        return 'SUCCESS'
    elif 'guesses2' in json:
        game.guesses2 = json['guesses2']
        if game.guesses2[-1] not in game.word2:
            game.lives2 -= 1
        db.session.commit()
        return 'SUCCESS'
    else:
        return 'FAIL'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)


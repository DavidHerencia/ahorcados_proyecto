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
class Word(db.Model):
    word: str
    length: int

    word = db.Column(db.String(20), primary_key=True)
    length = db.Column(db.Integer, nullable=False, default=0)

    def __repr__(self):
        return f'<word {self.word}>'


# routes
@app.route('/word', methods=['GET', 'POST'])
def route_word():
    if request.method == 'GET':
        return get_word()
    elif request.method == 'POST':
        return post_word()


####################
# Word
####################
def get_word():
    word = Word.query.all()
    return jsonify(word)


def post_word():
    json = request.get_json()
    string = json['word'].upper()
    length = len(string)
    word = Word(word=string, length=length)
    db.session.add(word)
    db.session.commit()
    return 'SUCCESS'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)


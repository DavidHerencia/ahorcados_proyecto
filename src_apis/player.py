from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

# config
app = Flask(__name__)


app.config['MYSQL_HOST'] = 'localhost'  #TO CHANGE
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'utec'
app.config['MYSQL_DB'] = 'ahorcados_db'


mysql = MySQL(app)



CORS(app)

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
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM player') 
    players = cursor.fetchall()
    cursor.close()
    return jsonify(players)


def post_player():
    json = request.get_json()
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM player WHERE username = %s", (json['username'],))
    existing_player = cursor.fetchone()
    if existing_player is None:
        cursor.execute("INSERT INTO player (username, password) VALUES (%s, %s)", (json['username'], json['password']))
        mysql.connection.commit()
        cursor.close()
        return 'SUCCESS'
    else:
        cursor.close()
        return 'FAIL'


def get_player_id(id):
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM player WHERE id = %s', (id,))
    player = cursor.fetchone()
    cursor.close()
    return jsonify(player)


def update_player_id(id):
    json = request.get_json()
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM player WHERE id = %s', (id,))
    player = cursor.fetchone()
    if player:
        new_wins = player[3] + json['wins']
        new_defeats = player[4] + json['defeats']
        new_ties = player[5] + json['ties']
        cursor.execute("UPDATE player SET wins = %s, defeats = %s, ties = %s WHERE id = %s",
                       (new_wins, new_defeats, new_ties, id))
        mysql.connection.commit()
        cursor.close()
        return 'SUCCESS'
    else:
        cursor.close()
        return 'FAIL'


def delete_player(id):
    cursor = mysql.connection.cursor()
    cursor.execute('DELETE FROM player WHERE id = %s', (id,))
    mysql.connection.commit()
    cursor.close()
    return 'SUCCESS'

def player_login():
    input_player = request.get_json()
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM player WHERE username = %s', (input_player['username'],))
    player = cursor.fetchone()
    if player is not None:
        if player[2] == input_player['password']:
            player_id = player[0]
            cursor.execute("UPDATE player SET logged_in = 1 WHERE id = %s", (player_id,))
            mysql.connection.commit()
            cursor.close()
            return jsonify({"response": str(player_id)})
        else:
            cursor.close()
            return jsonify({"response": "FAIL"})
    else:
        cursor.close()
        return jsonify({"response": "FAIL"})

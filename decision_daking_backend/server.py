from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/hello:<int:id>')
def hello_world(id):
    data = {
        'message': f'Hello, World! ID: {id}'
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run()

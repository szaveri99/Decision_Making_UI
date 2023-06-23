from flask import Flask, jsonify
import csv
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/hello:<int:id>')
def hello_world(id):
    data = {
        'message': f'Hello, World! ID: {id}'
    }
    return jsonify(data)

@app.route("/get-csv")
def get_csv():
    try:
        csv_data = []
        desired_columns = ['text', 'label']
        with open('politifact_subset_data.csv', 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                selected_data = {column: row[column] for column in desired_columns}
                csv_data.append(selected_data)
        return jsonify(csv_data)
       
    except Exception as e:
        return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run()


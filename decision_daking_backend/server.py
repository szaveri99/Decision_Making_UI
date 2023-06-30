from flask import Flask, jsonify, request
from flask_cors import CORS
import csv
import os
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

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

@app.route('/fetch-data', methods = ['POST'])

def fetchData():
    try:
        data = request.get_json()
        data = pd.DataFrame(data)
        df = pd.read_csv('politifact_subset_data.csv')  

        data.insert(loc = 2,
                column = 'Original Label',
                value = df['label'])
        
        data.rename(columns={'statement': 'Original Text', 'text': 'Modified Text','rangeTxt':'User Labelled'}, inplace=True)
        
        if os.path.exists('response.csv') == False : 
                with open('response.csv', 'w') as file:
                    pass            
                data.to_csv('response.csv', mode='w', index=False)
        else:
            existing_df = pd.read_csv('response.csv')
            updated_df = pd.concat([existing_df, data], ignore_index=True)
            updated_df.to_csv('response.csv', mode='a', index=False, header=False)
            
        res = {'text': "uploaded!!"}
        return jsonify(res)
    
    except Exception as e:
        return jsonify(error=str(e)), 500
    

if __name__ == '__main__':
    app.run()


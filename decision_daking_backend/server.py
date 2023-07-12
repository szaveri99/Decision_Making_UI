from flask import Flask, jsonify, request
from flask_cors import CORS
import csv
import os
import pandas as pd
from transformers import BertForSequenceClassification, BertTokenizer
from transformers import AutoTokenizer, AutoModel, AutoConfig, AutoModelForSequenceClassification
import torch

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

@app.route('/fetch-data-for-classifier', methods = ['POST'])
def fetchDataClassifier():
    request_data = request.get_json()
    print(request_data)
    text = request_data['modified_txt']
    print(text)
    model_class, tokenizer_class, config_class = AutoModelForSequenceClassification,AutoTokenizer,AutoConfig
    labels = ['True','False']
    model_path = 'Model_bert-base-uncased/Loss_CrossEntropy/Bin_012-345/Seed_0'
    tokenizer = tokenizer_class.from_pretrained(model_path)
    inputs = tokenizer(text, return_tensors="pt")
    config = config_class.from_pretrained(model_path, num_labels=len(labels))
    model = model_class.from_pretrained(model_path, config=config)
    print(text)
    with torch.no_grad():
        # model.eval()
        outputs = model(**inputs)

    # Get the predicted class label
    predicted_class = torch.argmax(outputs.logits, dim=1).item()
    class_label = {0: 'False', 1: 'True'}
    predicted_class_label = class_label[predicted_class]
    print(predicted_class)
    # return predicted_class_label
    return jsonify(predicted_class_label)
    

if __name__ == '__main__':
    app.run()


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
    # Existing data in the CSV file (if any)
    try:
        existing_df = pd.read_csv('response.csv')
    except FileNotFoundError:
        existing_df = pd.DataFrame()

    try:
        data = request.get_json()
        flattened_data = []
        for item in data:
            for sub_item in item.get("submittedStmt", []):
                flattened_item = {
                    "statement": item["statement"],
                    "range": item["range"],
                    "originalTxt": sub_item["stmt"]["originalTxt"],
                    "modifiedTxt": sub_item["stmt"]["modifiedTxt"],
                    "originalTxtClassifier": sub_item["classifier"]["originalTxtClassifier"],
                    "modifiedTxtClassifier": sub_item["classifier"]["modifiedTxtClassifier"],
                    "rangeVal": sub_item["rangeVal"]
                }
                flattened_data.append(flattened_item)
                
        # Create a new DataFrame
        df = pd.DataFrame(flattened_data)

        # Append the new data to the existing DataFrame
        merged_df = pd.concat([existing_df, df], ignore_index=True)

        # Display the merged DataFrame
        print(merged_df)# Write the merged DataFrame to the CSV file (append mode)
        # with open('response.csv', 'w') as file:
        #     file.write('')
        # merged_df.to_csv('response.csv', index=False, mode='a', header=True)
       
        if (os.path.exists('response.csv'))== False:
            merged_df.to_csv('response.csv', mode='w', index=False)
        else:
            merged_df.to_csv('response.csv', mode='a', index=False, header=False)  

        print("csv created!!")
        res = {'text': "csv created!!"}
        return jsonify(res)
        
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/fetch-data-for-classifier', methods = ['POST'])
def fetchDataClassifier():
    request_data = request.get_json()
    # request_data = {'original_txt': 'Three mass shootings were meant to distract from Hillary Clinton controversies.', 'modified_txt': 'Three mass shootings were actually not meant to distract from Hillary Clinton controversies'}   
    # text = request_data['modified_txt']
    # print(text)
    print("inside function")
    model_class, tokenizer_class, config_class = AutoModelForSequenceClassification,AutoTokenizer,AutoConfig
    labels = ['True','False']
    model_path = 'Model_bert-base-uncased/Loss_CrossEntropy/Bin_012-345/Seed_0'
    tokenizer = tokenizer_class.from_pretrained(model_path)
    print("for loop starting")
    predicted_class_label = []
    for text in request_data.values():
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
        predicted_class_label.append(class_label[predicted_class])
        print(predicted_class_label)
    response_dict = {'originalTxtClassifier':predicted_class_label[0],'modifiedTxtClassifier':predicted_class_label[1]}
        
    # return predicted_class_label
    return jsonify(response_dict)

if __name__ == '__main__':
    app.run()
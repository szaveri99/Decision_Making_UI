from flask import Flask, jsonify, request
from flask_cors import CORS
import csv
import os
import boto3
import s3fs
from io import BytesIO, StringIO
import pandas as pd
from transformers import BertForSequenceClassification, BertTokenizer
from transformers import AutoTokenizer, AutoModel, AutoConfig, AutoModelForSequenceClassification
import torch

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route("/get-csv")
def get_csv():

    s3 = boto3.client('s3',
                    region_name = 'us-east-1',
                    aws_access_key_id = 'AKIAUIGC37Y3TJHUTWFB',
                    aws_secret_access_key = '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')

    bucket_name = 'sakinaproject01'
    object_key = 'politifact_dataset.csv'
    
    try:
        # Get the CSV file content from S3
        response = s3.get_object(Bucket=bucket_name, Key=object_key)
        
        # Read the content of the CSV as bytes
        csv_bytes = response['Body'].read()

        # Convert bytes to a Pandas DataFrame
        df = pd.read_csv(BytesIO(csv_bytes), encoding = 'ISO-8859-1')
        desired_columns = ['text', 'label']
        csv_data = []
        for index, row in df.iterrows():
            selected_data = {column: row[column] for column in desired_columns}
            csv_data.append(selected_data)
        return jsonify(csv_data)
        
    except Exception as e: 
        return jsonify(error=str(e)), 500

@app.route('/fetch-data', methods = ['POST'])
def fetchData():
    try:
        s3 = boto3.client('s3',
                    region_name = 'us-east-1',
                    aws_access_key_id = 'AKIAUIGC37Y3TJHUTWFB',
                    aws_secret_access_key = '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')
        bucket_name = 'sakinaproject01'
        object_key = 'response.csv'
        try:
            response = s3.get_object(Bucket=bucket_name, Key=object_key)
            existing_csv_bytes = response['Body'].read()
            if existing_csv_bytes:
                # Convert bytes to a Pandas DataFrame
                existing_df = pd.read_csv(BytesIO(existing_csv_bytes))
            else:
                existing_df = pd.DataFrame()
                
        except (FileNotFoundError, KeyError):
            existing_df = pd.DataFrame()

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
        updated_df = pd.concat([existing_df, df], ignore_index=True)

        # Convert the updated DataFrame back to CSV format
        updated_csv_buffer = StringIO()
        updated_df.to_csv(updated_csv_buffer, index=False)
        updated_csv_content = updated_csv_buffer.getvalue()

        # Upload the updated CSV content to S3, overwriting the existing file
        s3.put_object(Bucket=bucket_name, Key=object_key, Body=updated_csv_content)
        print("Data updated in S3 CSV file successfully.")
        
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
# AI Statement Evaluation Application

This repository contains the source code for an AI Statement Evaluation Application. The application is designed to assess the veracity of given statements and allows users to modify the statements in an attempt to fool a text classifier.

## Features

- **Statement Assessment**: Users can evaluate the truthfulness of given statements on a scale of 1 to 6, where 1 indicates "True" and 6 indicates "False."

- **Text Modification**: Users have the opportunity to modify the text to try and influence the classifier's prediction.

- **Classifier Prediction**: The application provides predictions on the given statements, classifying them as either "True" or "False."

- **User-Interface**: The user interface guides users through the assessment and modification process.

## Prerequisites

Before running the application, ensure you have the following prerequisites in place:

- Python 3.x installed
- Flask and required libraries installed
- React installed
- AWS S3 Bucket set up with the necessary credentials
- BERT-based classifier model pre-trained and available

## Setup

1. Clone the repository to your local machine.

2. Set up the necessary Python dependencies by running the following command within the "backend" directory:

   ```shell
   pip install -r requirements.txt
   ```

3. Start the Flask server:

   ```shell
   python app.py
   ```

4. Set up the React application by navigating to the "frontend" directory and running:

   ```shell
   npm install
   ```

5. Start the React development server:

   ```shell
   npm start
   ```

6. Access the application by opening your web browser and visiting `http://localhost:3000`.

## Data Source

The application relies on a dataset stored in an AWS S3 bucket. Ensure that you have the necessary access credentials and the dataset is structured as expected.

## Making Predictions

The classifier used for making predictions in this application is a BERT-based model. It predicts whether a statement is "True" or "False" based on the text provided.

## Usage

- Start the application and navigate to the provided web interface.

- Read the given statement and assess its veracity using the provided scale.

- Optionally, modify the statement to see if you can influence the classifier's prediction.

- The application will provide a predicted classification for each statement you evaluate or modify.

- Follow the instructions in the user interface to proceed to the next statement.

## Data Handling

The application includes functionality to store user assessments and modifications in an AWS S3 bucket. Be sure to set up the bucket and access credentials for this feature to work.

## Contributions

Contributions to this project are welcome. Feel free to submit issues or pull requests as needed.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

This project was developed to explore human understanding of AI-generated statements. We aim to gain insights into how people perceive AI-generated content and how it interacts with human comprehension.

---

You can customize this README further to include specific installation and configuration instructions if needed. Make sure to replace the placeholders with actual details where necessary.

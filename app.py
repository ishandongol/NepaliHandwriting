from flask_restful import Resource, Api
from flask import Flask, request
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from keras.models import load_model
import os
import pandas as pd
import cv2 as cv
import time
import os

PORT = os.environ.get("PORT")
if not PORT:
    PORT = 5000
app = Flask(__name__)
api= Api(app)
cors = CORS(app)
#model.h5 for ANN and cnn_model.h5 for CNN
model = load_model('model_cnn.h5')
graph = tf.get_default_graph()

UPLOAD_FOLDER = "./"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
class Upload(Resource):

    def post(self):
        file = request.files['image']
        file.save(os.path.join(app.config['UPLOAD_FOLDER'])+"predict.jpg")
        return {"status": "ok"}

class Predict(Resource):

    def get(self):
        datas = []
        label_data = pd.read_csv('labels.csv',delimiter=',')
        test_image = cv.imread(os.path.join(app.config['UPLOAD_FOLDER'])+"predict.jpg", 0)
        image_array = cv.resize(cv.bitwise_not(test_image), (36, 36))
        (thresh, image_array) = cv.threshold(image_array, 128, 255, cv.THRESH_BINARY | cv.THRESH_OTSU)
        cv.imwrite("converted.png",image_array)
        image = image_array.astype('float32')
        X_test = image / 255

        #for ANN
        # datas.append(X_test.flatten())
        # X_test = np.array(datas)

        # for CNN
        datas.append((X_test))
        X_test = np.array(datas).reshape(-1,36,36,1)
        with graph.as_default():
            prediction = model.predict_classes(X_test)
            prediction_prob = model.predict_proba(X_test)
        label = int(np.squeeze(prediction))
        prob = np.squeeze(prediction_prob)
        probability = np.amax(prob)
        cv.imwrite("./datas/{0}-{1}-{2}.png".format(label_data.iloc[label, :].values[0],probability,time.time()),image)
        if label == '10': label = '0'
        return {"prediction": str(label_data.iloc[label, :].values[0]), "probability": float(probability)}
api.add_resource(Upload, '/upload')
api.add_resource(Predict, '/predict')

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=PORT)
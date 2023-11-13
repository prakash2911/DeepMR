from flask import *
from flask_cors import CORS
from tensorflow.keras import models
from tensorflow.keras.preprocessing import image
from PIL import Image
import numpy as np
app = Flask(__name__)
CORS(app)
img_shape = (224,224)

disease = ['Anthracnose', 'algal leaf', 'bird eye spot', 'brown blight', 'gray light', 'healthy', 'red leaf spot', 'white spot']

@app.route('/',methods=['POST','GET'])
def index():
    img = request.files['image']
    img = Image.open(img)
    img = img.resize(img_shape)
    img = image.img_to_array(img)   
    img = np.expand_dims(img,axis=0)
    model = models.load_model('./model/model.h5')
    predict = model.predict(img)
    res = np.argmax(predict)
    resj = {}
    resj['prediction'] = disease[res]
    resj['confidence'] = str(predict[0][res])
    return resj

app.run(host='0.0.0.0',debug=True)

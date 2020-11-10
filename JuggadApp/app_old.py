import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
MLBookingPrice = pickle.load(open('MLBookingPrice.pickle', 'rb'))
MLBookingSimmulation = pickle.load(open('MLBookingSimmulation.pickle', 'rb'))

@app.route('/MLBookingPrice_api',methods=['GET'])
@cross_origin()
def MLBookingPrice_api  ():
    '''
    For direct API calls trought request
    '''
    a = request.args['a']
    b = request.args['b']
    c = request.args['c']
    d = request.args['d']
    e = request.args['e']
    f = request.args['f']
    
    inputarray = []
    inputarray.append(int(a))
    inputarray.append(int(b))
    inputarray.append(int(c))
    inputarray.append(int(d))
    inputarray.append(int(e))
    inputarray.append(int(f))
    
    prediction = MLBookingPrice.predict([inputarray])
    y = str(prediction[0][0])
    x = {
     "price": y,
        }

    # convert into JSON:
    y = json.dumps(x)
    return y 

@app.route('/MLBookingSimmulation_api',methods=['GET'])
@cross_origin()
def MLBookingSimmulation_api():
    '''
    For direct API calls trought request
    '''
    a = request.args['a']
    b = request.args['b']
    c = request.args['c']
    d = request.args['d']
    e = request.args['e']
    f = request.args['f']
    
    inputarray = []
    inputarray.append(int(a))
    inputarray.append(int(b))
    inputarray.append(int(c))
    inputarray.append(int(d))
    inputarray.append(int(e))
    inputarray.append(int(f))
    
    prediction = MLBookingSimmulation.predict([inputarray])
    y = str(prediction[0][0])
    x = {
     "price": y,
        }

    # convert into JSON:
    y = json.dumps(x)
    return y 

if __name__ == "__main__":
    app.run(host = '0.0.0.0', port = 9000, debug = True)



    
# @app.route('/')
# def home():
#     return render_template('index.html')

# @app.route('/predict',methods=['GET'])
# def predict():
#     '''
#     For rendering results on HTML GUI
#     '''
#     int_features = [int(x) for x in request.form.values()]
#     final_features = [np.array(int_features)]
#     prediction = model.predict([[50,1,0,6,12]])
#     output = prediction

#     return render_template('index.html', prediction_text='Booking price should be $ {}'.format(output))

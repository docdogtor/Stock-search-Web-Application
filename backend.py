from flask import Flask
import requests
from flask import jsonify
from datetime import *
from dateutil.relativedelta import *
import calendar

app = Flask(__name__)
@app.route('/')
def first_page():
    return app.send_static_file("homepageV5.html")

@app.route('/search')
@app.route('/search/')
@app.route('/search/<keyword>')
def search(keyword=None):
    headers = {
        'Content-Type': 'application/json'
    }
    api_key = "17493f28f7942c406263e37aea5e7636fc838ce3"
    address_1 = "https://api.tiingo.com/tiingo/daily/"+keyword+"?token="+api_key
    requestResponse = requests.get(address_1, headers=headers)
    return requestResponse.json()
    
@app.route('/summary')
@app.route('/summary/')
@app.route('/summary/<keyword>')
def summary(keyword=None):
    api_key = "17493f28f7942c406263e37aea5e7636fc838ce3"
    address_2 = "https://api.tiingo.com/iex/"+keyword+"?token="+api_key
    return jsonify(requests.get(address_2).json())
    
@app.route('/news')
@app.route('/news/')
@app.route('/news/<keyword>')
def news(keyword=None):
    apikey = "a54aa70afeec4c8b9e571ba9480990d6"
    address_3 = "https://newsapi.org/v2/everything?" +"apiKey=" +apikey+ "&q=" + keyword
    return jsonify(requests.get(address_3).json())
    
@app.route('/chart')
@app.route('/chart/')
@app.route('/chart/<keyword>')
def chart(keyword=None):
    now = datetime.date(datetime.now())
    prior_date = str(now + relativedelta(months=-6))
    print(prior_date)
    api_key = "17493f28f7942c406263e37aea5e7636fc838ce3"
    address_4 = "https://api.tiingo.com/iex/" + keyword +"/prices?startDate=" + prior_date +"&resampleFreq=12hour&columns=open,high,low,close,volume&token=" + api_key
    return jsonify(requests.get(address_4).json())

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8080, debug=True)

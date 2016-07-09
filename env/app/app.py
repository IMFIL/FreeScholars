from __future__ import print_function                 
from flask import Flask, render_template, request, url_for,Response
import urllib2
from bs4 import BeautifulSoup
import sqlite3 as lite
import logging
import json
from logging.handlers import RotatingFileHandler

app = Flask(__name__)


@app.route('/')
def index():
	return render_template('index.html')

@app.route('/search', methods=["GET"])
def search():
	if request.args.get('search') is None:
		return render_template('index.html')

	else:
		search = request.args.get('search')
		##check search, minimize the characters
		##make sure the databases update every day, changing only the elements that have changes adding new ones and remove expired ones.
		##research for more discounts
		##make the search in the name not exactly the name
		##switch data bases upon clicking UK or CA
		
		con = lite.connect('FreeScholars.db')
        cur = con.cursor()   

        with con:
        	cur.execute("SELECT Name,Description FROM FreeScholarsCAdiscounts WHERE Name=?;",(search,))
        	response = cur.fetchall()

        return json.dumps(response)






if __name__ =="__main__":
	handler = RotatingFileHandler('foo.log', maxBytes=10000, backupCount=1)
	handler.setLevel(logging.INFO)
	app.logger.addHandler(handler)
	app.run(debug=True)
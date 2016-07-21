from __future__ import print_function                 
from flask import Flask, render_template, request, url_for,Response
import urllib2
import sqlite3 as lite
import json

app = Flask(__name__)


@app.route('/')
def index():
	return render_template('index.html')

@app.route('/searchCA', methods=["GET"])
def searchCA():
	search = request.args.get('search')
	##check search, minimize the characters
	##make sure the databases update every day, changing only the elements that have changes adding new ones and remove expired ones.
	##research for more discounts
	##make the search in the name not exactly the name
	con = lite.connect('FreeScholars.db')
	cur = con.cursor()   

	with con:
		cur.execute("SELECT Name,Description FROM FreeScholarsCAdiscounts WHERE Name=?;",(search,))
		response = cur.fetchall()

	if len(response) == 0:
		results = []
		nameSearched = ''
		for letter in search:
			nameSearched += letter
			with con:
				cur.execute("SELECT Name,Description FROM FreeScholarsCAdiscounts WHERE Name like '%' + ? + '%' ;",(nameSearched,))
				hits = cur.fetchall()

			if len(hits) == 0:
				break 	

			results.append(hits)
			#finish this


	return json.dumps(results)


@app.route('/searchUK', methods=["GET"])
def searchUK():
	search = request.args.get('search')

	con = lite.connect('FreeScholars.db')
	cur = con.cursor()   

	with con:
		cur.execute("SELECT Name,Description FROM FreeScholarsUKdiscounts WHERE Name=?;",(search,))
		response = cur.fetchall()

	return json.dumps(response)

if __name__ =="__main__":
	app.run(debug=True)
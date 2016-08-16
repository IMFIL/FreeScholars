from __future__ import print_function                 
from flask import Flask, render_template, request, url_for,Response,redirect
import urllib2
import sqlite3 as lite
import json
import jinja2
import math

app = Flask(__name__)
flag=1
Npages = 2

def test(value,first,second):
	try:
		return value[first][second]
	except:
		return ""

app.jinja_env.globals.update(test=test)

def HiddenRow():
	global flag
	if flag > 2:
		flag += 1
		return False
	flag+=1
	return True

app.jinja_env.globals.update(HiddenRow=HiddenRow)



@app.route('/')
def index():
	return render_template('index.html')

@app.route('/searchCA', methods=["GET"])
def searchCA():
	search = request.args.get('search')
	response = []
	##check search, minimize the characters
	##make sure the databases update every day, changing only the elements that have changes adding new ones and remove expired ones.
	##research for more discounts
	con = lite.connect('FreeScholars.db')
	cur = con.cursor()   
	if (len(search) >= 3):

		with con:
			cur.execute("SELECT Name,Description FROM FreeScholarsCAdiscounts WHERE Name=?;",(search,))
			response = cur.fetchall()

		# with con:
		# 	cur.execute("UPDATE FreeScholarsCAdiscounts SET popularity = popularity + 1 WHERE Name=?;",(search,))

        if len(response) == 0:
			with con:
				cur.execute("SELECT Name,Description FROM FreeScholarsCAdiscounts WHERE Name like ?;",('%'+search+'%',))
				response = cur.fetchall()
        else:
			with con:
				cur.execute("SELECT Name,Description FROM FreeScholarsCAdiscounts WHERE Name like ?;",('%'+search+'%',))
				response = cur.fetchall()


	return json.dumps(response)


@app.route('/searchUK', methods=["GET"])
def searchUK():
	search = request.args.get('search')
	response = []
	##check search, minimize the characters
	##make sure the databases update every day, changing only the elements that have changes adding new ones and remove expired ones.
	##research for more discounts
	con = lite.connect('FreeScholars.db')
	cur = con.cursor()   

	if (len(search) >= 3):

		with con:
			cur.execute("SELECT Name,Description FROM FreeScholarsUKdiscounts WHERE Name=?;",(search,))
			response = cur.fetchall()

		# with con:
		# 	cur.execute("UPDATE FreeScholarsUKdiscounts SET popularity = popularity + 1 WHERE Name=?;",(search,))

        if len(response) == 0:
			with con:
				cur.execute("SELECT Name,Description FROM FreeScholarsUKdiscounts WHERE Name like ?;",('%'+search+'%',))
				response = cur.fetchall()
        else:
			with con:
				cur.execute("SELECT Name,Description FROM FreeScholarsUKdiscounts WHERE Name like ?;",('%'+search+'%',))
				response = cur.fetchall()

	return json.dumps(response)


@app.route('/popularCA',methods=["GET"])
def popularCA():
	categories = ['Lifestyle', 'Tech', 'Food', 'Fashion', 'Travel']
	results = []
	con = lite.connect('FreeScholars.db')
	cur = con.cursor()

	for cate in categories:
		with con:
			cur.execute('SELECT Name,Description,category FROM FreeScholarsCAdiscounts WHERE category=? ORDER BY popularity  DESC LIMIT 1;',(cate,))
			results.append(cur.fetchall())

	return json.dumps(results)



@app.route('/popularUK',methods=["GET"])
def popularUK():
	categories = ['Lifestyle', 'Tech', 'Food', 'Fashion', 'Travel']
	results = []
	con = lite.connect('FreeScholars.db')
	cur = con.cursor()

	for cate in categories:
		with con:
			cur.execute('SELECT Name,Description,category FROM FreeScholarsUKdiscounts WHERE category=? ORDER BY popularity  DESC LIMIT 1;',(cate,))
			results.append(cur.fetchall())

	return json.dumps(results)

@app.route('/categoriesRet',methods=["GET"])
def categoriesRet():
	cat = request.args.get('cat')
	db = request.args.get('db')
	return url_for('categories',cat=cat,db=db)


@app.route('/categories/<cat>/<db>')
def categories(cat,db):
	global flag
	global Npages
	flag = 1

	category = cat
	db = "FreeScholars"+db+"discounts"
	response = []
	con = lite.connect('FreeScholars.db')
	cur = con.cursor()

	with con:
		cur.execute('SELECT Name,Description FROM FreeScholarsCAdiscounts WHERE category = ?;',(category,))
		response = cur.fetchall()

	length = len(response)
	rows = int(math.ceil(length/5))
	TABLE = []
	ROW = []

	for i in range(1,len(response)+1):
		ROW.append(response[i-1])

		if i%5 == 0:
			TABLE.append(ROW)
			ROW = []

	if ROW != []:
		TABLE.append(ROW)


	pages = int(math.ceil(rows/Npages))
	print(pages," is the number of pages and there is ",rows)

	return render_template("categories.html", header=cat,items=TABLE,pages=pages)



if __name__ =="__main__":
	app.run(debug=True)




















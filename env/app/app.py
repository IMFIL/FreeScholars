from __future__ import print_function
from flask import Flask, render_template, request, url_for
import urllib2
from bs4 import BeautifulSoup
import logging
from logging.handlers import RotatingFileHandler

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('index.html')


@app.route('/search', methods=["GET"])
def search():
	if request.args.get('search') is None:
		return render_template('search.html')
	else:
		search = request.args.get('search')
		page = urllib2.urlopen("https://www.studentbeans.com/student-discount/uk/results?query=" + search).read()
		soup = BeautifulSoup(page,"html.parser")
		soup.prettify()
		divs = smydivs = soup.findAll("div", { "class" : "offer-info__header-info" })
		h4 = []
		p = []
		hstring = []
		pstring = []

		for div in divs:
			h4.append(div.find("h4"))
			p.append(div.find("p"))

		for H in h4:
			hstring.append(H.string)


		for P in p:
			if P == None:
				pstring.append("No Description")
			else:
				pstring.append(P.string)


		app.logger.info(hstring)
		app.logger.info(pstring)

        return search
		



if __name__ =="__main__":
	handler = RotatingFileHandler('foo.log', maxBytes=10000, backupCount=1)
	handler.setLevel(logging.INFO)
	app.logger.addHandler(handler)
	app.run(debug=True)
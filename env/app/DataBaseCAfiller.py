import sqlite3 as lite
import urllib2
from bs4 import BeautifulSoup

page = urllib2.urlopen("https://www.spccard.ca/deals").read()
soup = BeautifulSoup(page,"html.parser")
soup.prettify()
divs = smydivs = soup.findAll("div", { "class" : "item col-md-3" })
divs2 = []

h4 = []
a = []

for div in divs:
	if div != None:
		h4.append(div.find("div", { "class" : "find" }).find("a")["href"].replace("/partners/","").replace("-"," ").lower())
		a.append(div.find("div", { "class" : "description"}).text.strip().replace("*",""))

con = lite.connect('FreeScholars.db')
cur = con.cursor()    

for i in range(0,len(h4)):
	with con:
		cur.execute("INSERT INTO FreeScholarsCAdiscounts VALUES(?,?);",("".join(h4[i]),"".join(a[i])))



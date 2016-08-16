 #!/usr/local/bin/python
 # coding: utf-8
import sqlite3 as lite
import urllib2
from bs4 import BeautifulSoup

page = urllib2.urlopen("https://www.spccard.ca/deals").read()
soup = BeautifulSoup(page,"html.parser")
soup.prettify()
divs = smydivs = soup.findAll("div", { "class" : "item col-md-3"})
divs2 = []

h4 = []
a = []

con = lite.connect('FreeScholars.db')
cur = con.cursor() 

Response = []

with con:
	cur.execute("SELECT Name,category FROM FreeScholarsCAdiscounts");
	Response = cur.fetchall()

print Response 


for div in divs:
	if div != None:
		string =''
		h4.append(div.find("div", { "class" : "find" }).find("a")["href"].replace("/partners/","").replace("-"," ").lower())
		description = urllib2.urlopen(("https://www.spccard.ca"+div.find("div", { "class" : "find" }).find("a")["href"]).encode("UTF-8")).read().decode('utf-8')
		soupDescription = BeautifulSoup(description,"html.parser")
		soupDescription.prettify()
		TEXT = soupDescription.findAll("div",{"class": "row hidden-xs"})
		for inside in TEXT:
			PO = inside.findAll("div", { "class" : "partner-online"})
			for po in PO:
				if po != "":
					string+=po.text.strip()
		a.append(string)
		   

for i in range(0,len(h4)):
	with con:
		cur.execute("INSERT INTO FreeScholarsCAdiscounts VALUES(?,?,?,?);",("".join(h4[i]),"".join(a[i]),0,""))


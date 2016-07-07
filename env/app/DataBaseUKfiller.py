import sqlite3 as lite
import urllib2
from bs4 import BeautifulSoup

page = urllib2.urlopen("https://www.studentbeans.com/student-discount/uk/cats/all?page=100#page_100").read()
soup = BeautifulSoup(page,"html.parser")
soup.prettify()
divs = smydivs = soup.findAll("div", { "class" : "offer-info__header-info" })
h4 = []
p = []
a = []
hstring = []
pstring = []
astring = []

samelen = True

for div in divs:
	h4.append(div.find("h4"))
	p.append(div.find("p"))
	a.append(div.find("div", { "class" : "offer-info__company-link ellipsis-txt "}).find("a"))

if (len(h4) == len(p) and len(p) == len(a)):

	for i in range(0,len(h4)):

		hstring.append(h4[i].string)

		if p[i] == None:
			pstring.append("No Description")
		else:
			pstring.append(p[i].string)

		if a[i] == None:
			astring.append("unknown location")
		else:
			astring.append(a[i].string)

else:
	samelen = False

	for H in h4:
		hstring.append(H.string)


	for P in p:
		if P == None:
			pstring.append("No Description")
		else:
			pstring.append(P.string)

	for A in a:
		if A == None:
			astring.append("unknown location")
		else:
			astring.append(A.string)



p

con = lite.connect('FreeScholarsUKdiscounts.db')
cur = con.cursor()    

if samelen:
	for i in range(0,len(hstring)):
		print(astring[i],hstring[i],pstring[i])
		with con:
			cur.execute("INSERT INTO Rebaits VALUES(?,?,?);",("".join(astring[i]),"".join(hstring[i]), "".join(pstring[i])))

else:
	print(len(hstring),len(astring),len(pstring))


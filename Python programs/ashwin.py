import csv
import operator
from operator import itemgetter
f = open('salaries.csv', 'rb')

reader = csv.reader(f)
dist={}

for row in reader:
    #print row
    if row[1]=="Lawyers":
        dist[row[0]]=int(row[2])

#print dist

L = sorted(dist.items(), key=lambda (k, v): v)
print L

#time complexity of dictionary creation and acess and deletion 


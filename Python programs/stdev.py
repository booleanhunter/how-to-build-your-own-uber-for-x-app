import csv
import math
from math import sqrt

f = open('salaries.csv', 'rb')

def sd(a): #calculating std deviation
    n = len(a) 
    mean = sum(a) / n  #calculate mean
    sd = math.sqrt(sum((x-mean)**2 for x in a) / n) #squareroot(sum of (x-mean)^2/n)
    return sd

reader = csv.reader(f)
mydict={} #create a dictionary to store keys-values

for row in reader:
    if row[1] not in mydict: #if a profession not present, then include it in the dict
        mydict[row[1]] = []

    mydict[row[1]].append(row[2]) #append an array of values containing salaries to jobs 

mydict.pop('Job',None) #remove 'Job' key-value

for profession in mydict: #convert salaries of every job to int
    mydict[profession]=map(int,mydict[profession])

for profession in mydict:
    print profession, sd(mydict[profession]) #print salary along with std dev

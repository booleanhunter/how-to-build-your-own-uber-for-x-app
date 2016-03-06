import csv

f = open('salaries.csv', 'rb')

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
    mydict[profession].sort() #sort the salaries within each job
    length=len(mydict[profession]) #length of the array of values of each job
    if not length % 2:
        median = (length/2 + length/2-1)/2 #calculating the median
    median = length / 2
    
    print profession, mydict[profession][median]

#Base Python client for MEng in IoT Assignment
#consumes data from IoT Gateway
import urllib2
import xml.etree.ElementTree as ET
import matplotlib.pyplot as plt
import matplotlib.dates as dates
import datetime
import numpy as np

response = urllib2.urlopen('http://localhost:8080/')
resp = response.read()

print resp

input = resp.split("\n")

timeList = []
temperatureList = []

for reading in input:
	if reading != "":
		print reading
		print "1"
	
		root = ET.fromstring(reading)
		print root
		
		timeVal = root.find('time').text
		print timeVal
		
		#Fri Dec 30 15:42:14 2016
		timeObject = datetime.datetime.strptime(timeVal, "%a %b %d %H:%M:%S %Y")
		var = dates.date2num(timeObject)
		print var
		timeList.append(var)
		print timeObject
		temperature = root.find('temperature').text
		print temperature
		
		temperatureList.append(temperature)

#for t in temperatureList:
#	print t
#	print 2
	
#for a in timeList:
#	print a 
#	print 3
#var = dates.date2num(timeList)
#plot_date(dates, temperatureList)
	
plt.plot_date(timeList, temperatureList, '-', label = "Temperature Variance over time")
plt.xlabel("Time scale")
plt.ylabel("Degrees C")
plt.show()
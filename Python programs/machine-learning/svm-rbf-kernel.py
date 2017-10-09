#!/usr/bin/python

""" lecture and example code for decision tree unit """

import sys
from class_vis import prettyPicture, output_image
from prep_terrain_data import makeTerrainData

import matplotlib.pyplot as plt
import numpy as np
import pylab as pl
from classifyDT import classify

features_train, labels_train, features_test, labels_test = makeTerrainData()

from sklearn.svm import SVC

# Higher the C, more training points will be covered. Less the value, then it will result in a straighter classifier / curve / boundary
C = 1000.0

clf = SVC(kernel="rbf", C=C)

### the classify() function in classifyDT is where the magic
### happens--fill in this function in the file 'classifyDT.py'!


clf = clf.fit(features_train, labels_train)

pred = clf.predict(features_test)





#### grader code, do not modify below this line

prettyPicture(clf, features_test, labels_test)
output_image("test.png", "png", open("test.png", "rb").read())

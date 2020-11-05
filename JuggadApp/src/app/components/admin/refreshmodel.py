import pandas as pd
import numpy as np
import urllib
from sqlalchemy import create_engine
import pyodbc
import pypyodbc  
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

# Connect to DB on AWS
conn = pypyodbc.connect('Driver={SQL Server};Server=ut1.chy5tpamtaco.us-east-1.rds.amazonaws.com;Database=dbjuggad;uid=admin;pwd=adminpass')   


#Load train data
df =   pd.read_sql_query(" select * from MLBookingSimmulationTrainData ",conn) 
df_price = df[["price"]]
df_features = df
df_features.drop("price",axis=1,inplace=True)
df_features.drop("index",axis=1,inplace=True)
X = df_features
y = df_price


X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.1,random_state=10)
lr_clf = LinearRegression()
#lr_clf.fit(X_train,y_train)
lr_clf.fit(X,y)

import pickle
with open('/home/ubuntu/flaskapp/MLBookingSimmulation.pickle','wb') as f:
    pickle.dump(lr_clf,f)

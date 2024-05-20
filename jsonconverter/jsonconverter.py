import pandas as pd
import os
from json import loads, dumps

# Meter dataframe

def append_meter_type(row):
    return "meter"

meter = pd.read_csv('./data/meter.csv')

meter['COUNTS'] = meter.groupby(['STREET'])['_id'].transform('count')

meter_cleaned = meter.drop_duplicates(subset=['STREET']).copy()
# print(meter)
meter_cleaned.rename(columns={"X": "longitude", "Y": "latitude"})

# meter_cleaned.apply(append_numMeters(num))
df_clean = meter_cleaned[meter_cleaned['LATITUDE'].isnull() == False].copy()
df_clean = meter_cleaned[meter_cleaned['LONGITUDE'].isna() == False]
meter_minimum = df_clean[["LONGITUDE", "LATITUDE", "STREET", "PAY_POLICY", "PARK_NO_PAY", "BASE_RATE", "COUNTS"]].copy()
meter_minimum['TYPE'] = meter_minimum.apply(append_meter_type, axis=1)
meter_json = meter_minimum.to_json(r"./meter.json",orient="records", indent=4)

# Snow garages
def append_snow_type(row):
    return "snow_garage"

snow = pd.read_csv('./data/SnowEmergency.csv')
snow = snow.rename(columns={"x": "longitude", "y": "latitude"})
snow_clean = snow[snow['latitude'].isnull() == False].copy()
snow_clean = snow_clean[snow_clean['longitude'].isna() == False]
snow_clean = snow_clean[["longitude", "latitude", "Spaces", "Fee", "Comments", "Phone", "Name", "Address"]]
snow_clean["Comments"].fillna("No comments", inplace = True)
snow_clean["Phone"].fillna(" ", inplace = True)
snow_clean["Spaces"].fillna("Call the garage", inplace = True)
snow_clean["Name"].fillna(" ", inplace = True)
snow_clean["Address"].fillna(" ", inplace = True)
snow_clean['TYPE'] = snow_clean.apply(append_snow_type, axis=1)
snow_json = snow_clean.to_json(r"./snowgarage.json",orient="records", indent=4)

# Crime
def append_ls_type(row):
    return "leaving_scene"
def append_vandalism_type(row):
    return "vandalism"


crime = pd.read_csv('./data/crimedata.csv')
crime = crime.rename(columns={"Long": "longitude", "Lat": "latitude"})
crime_clean = crime[crime['latitude'].isnull() == False].copy()
crime_clean = crime_clean[crime_clean['longitude'].isna() == False]
crime_clean = crime_clean[["longitude", "latitude", "INCIDENT_NUMBER", "OFFENSE_CODE", "OFFENSE_DESCRIPTION", "OCCURRED_ON_DATE", "STREET"]]
# crime_clean["INCIDENT_NUMBER"].fillna(" ", inplace = True)
# crime_clean["OFFENSE_CODE"].fillna(" ", inplace = True)
# crime_clean["OFFENSE_DESCRIPTION"].fillna(" ", inplace = True)
# crime_clean["OCCURRED_ON_DATE"].fillna(" ", inplace = True)
# crime_clean["STREET"].fillna(" ", inplace = True)
ls = crime_clean.query('OFFENSE_CODE == 3831').copy()
vandalism = crime_clean.query('OFFENSE_CODE == 1402').copy()
ls['TYPE'] = ls.apply(append_ls_type, axis=1)
vandalism['TYPE'] = vandalism.apply(append_vandalism_type, axis=1)
ls.to_json(r"./leavingscene.json",orient="records", indent=4)
vandalism.to_json(r"./vandalism.json",orient="records", indent=4)
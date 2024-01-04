***pyramid endpoint***
data to send 
-
{
  "goal_grade": 9,
  "location": {
    "lat": 35.15153,
    "lng": -85.35017
  },
  "maxDistance": 200000
} 

 endpoint post http://127.0.0.1:8000/api/beta/
 see pyramiddata.json for response


***climb by uuid***
method - post
endpoint:
 http://127.0.0.1:8000/api/beta/climb/

 data to send 
 {
    {
  "uuid":"89a929e2-d3d9-5219-baca-1f37855821b0"
} 

Response: see climbdata.json 

 }

***area by uuid***
method - post
endpoint:
 http://127.0.0.1:8000/api/beta/area/

 data to send 

 {
    {
  "uuid":"89a929e2-d3d9-5219-baca-1f37855821b0"
} 

Response: see areadata.json 

 }

 media url 
 mediaid=/u/4d748baa-b0f9-4308-88a9-d574232654c8/CqKnCRhDQg.jpeg
 https://media.openbeta.io/${mediaid}


 ***cragsnear api*** 
  endpoint- http://127.0.0.1:8000/api/beta/cragsnear/
 data to pass-

 {
  "location": {
    "lat": 35.15153,
    "lng": -85.35017
  },
  "maxDistance": 200000
} 

response data see cragsnear.json in pyramidplan folder


***best crag***
api endpoint 
post
http://127.0.0.1:8000/api/beta/best-crag/


{
  "goal_grade": 9,
  "location": {
    "lat": 35.15153,
    "lng": -85.35017
  },
  "maxDistance": 200000
} 

see best_crags.json for response


***api endpoint for route***
post
http://127.0.0.1:8000/api/route/
example data to pass
{
  "pyramid_id":3,#input pyramid_id returned when making pyramid
  "route_id": "89a929e2-d3d9-5219-baca-1f37855821b0",
  "name": "Super duper Mario",
  "lat": 35.249734999999994,
  "lng": -85.21837,
  "area": "58994c28-e56a-5a34-a931-ba2324ea4a91",
  "grade": 4,
  "media": "u/4d748baa-b0f9-4308-88a9-d574232654c8"
}
sucess= route created

http://127.0.0.1:8000/api/route/
method :Get 
data to get a route
{
  "id":1(route id in our db not open beta)
}

if no id is passed in the data returns all routes

***api endpoint for pyramid***
post 
http://127.0.0.1:8000/api/pyramid/

{
  "user": 1,
  "latitude": 34.222255,
  "longitude": 86.555555,
  "goal_grade": 7
}
#we will add routes to pyramid when we create them 

response = {
  "pyramid_id": 5 #use this pyramid_id when making each route
}

***get all pyramids***
Get 
http://127.0.0.1:8000/api/pyramid/

no data,
response =
[
  {
    "id":1 ,
    "user": 1,
    "routes": [
      1
    ],
    "date_generated": "2024-01-02T14:48:36.532914Z",
    "latitude": 34.222255,
    "longitude": 86.555555,
    "goal_grade": 7
  }
]

***get all pyramids for user***
Get 
http://127.0.0.1:8000/api/pyramid/user/${userid}/

response= 
{
  "id": 1,
  "user": 1,
  "routes": [
    1
  ],
  "date_generated": "2024-01-02T14:48:36.532914Z",
  "latitude": 34.222255,
  "longitude": 86.555555,
  "goal_grade": 7
}

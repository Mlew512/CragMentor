pyramid endpoint\
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


 climb by uuid\
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



 media url 
 mediaid=/u/4d748baa-b0f9-4308-88a9-d574232654c8/CqKnCRhDQg.jpeg
 https://media.openbeta.io/${mediaid}
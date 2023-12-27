# gets climb by uuid will be usefull when we load the pyramids. i wasnt able to get multiple climbs information so will need to make seperate api calls to get
GET_CLIMB_BY_ID = """
query getClimbById {
  climb(uuid: "89a929e2-d3d9-5219-baca-1f37855821b0") {
    name
    metadata {
      climb_id
      lat
      lng
      mp_id
    }
    grades {
      vscale
    }
    content {
      description
      location
    }
  }
}
"""

# gets all crags in the area defined by the lat long and max distance, we can run this and get all crags that we can pull in. possibly by mapping through uuid of crags. also aggrigates the climbs in each area by #of climbs in each grade. we could write an algorithm to order what crags we go through first. (for example we need #1 v7 #2 v6 #4 v5s (Keeping it simple) we would weight the responses of v5s to be worth 4, v6's worth 2, and v7 worth 1 when sorting the crags. all routes not in our pyramid worth 0 )
# considerations with the algorithm, 1. grades are formatted multiple ways v7 v7- v7+ v6/v7, v7/v8. slash grades should be considered the higher grade.  

GET_CRAGS_IN_AREA = """
query getCragsInAreaV2 {
  cragsNear(
    includeCrags: true
    lnglat: {lat: 34.65398, lng: -85.39029}
    maxDistance: 2000
  ) {
    crags {
      areaName
      totalClimbs
      aggregate {
        byGrade {
          count
          label
        }
      }
    }
  }
}
"""

GET_CLIMBS_IN_CRAG = """
query getClimbsInCrag {
  area(uuid: "931188a6-94bb-54df-9e9c-234f0c2b4b2b") {
    areaName
    climbs {
      name
      uuid
      grades {
        vscale
      }
    }
    uuid
    totalClimbs
  }
}
"""

get_climb_by_id_query = """
        query getClimbById ( $uuid: ID! ) {
            climb(uuid: $uuid) {
                name
                uuid
                metadata {
                    climb_id
                    lat
                    lng
                    mp_id
                }
                grades {
                    vscale
                    yds
                }
                content {
                    description
                    location
                }
                media {
                    mediaUrl
                }
                 type {
                    sport
                    trad
                    deepwatersolo
                    aid
                    bouldering
                    alpine
                    ice
                    mixed
                    snow
                    tr
                    }
                parent {
                    uuid
                    area_name
                    ancestors
                id
                uuid
                }
            }
            }
        """

crag_in_area_query = """
        query getCragsInArea ($location: Point!, $maxDistance: Int!) {
            cragsNear(
                includeCrags: true
                lnglat: $location
                maxDistance: $maxDistance
            ) {
                crags {
                    uuid
                    media {
                    mediaUrl
                    }
                    areaName
                    totalClimbs
                    aggregate {
                        byGrade {
                            count
                            label
                        }
                    }
                    metadata {
                        lat
                        lng
                        areaId
                    }
                }
            }
        }
        """

climbs_in_crag_query = """
            query getClimbsInCrag ($uuids: [ID!]){
            areas: areasList(uuids: $uuids) {
                areaName
                    climbs {
                    name
                    uuid
                    media {
                        mediaUrl
                    }
                    grades {
                        vscale
                        yds
                    }
                    type {
                        sport
                        trad
                        bouldering
                    }
                    }
                    uuid
                    totalClimbs
                }
            }
            """

crag_box_query = """
        query getArea($bbox: [Float], $zoom: Float) {
            cragsWithin(filter: {bbox: $bbox, zoom:$zoom}) {
                areaName
                totalClimbs
                uuid
                density
                gradeContext
                media {
                    mediaUrl
                }
                content {
                    description
                }
                metadata {
                    lat
                    lng
                }
            }
        }
        """

crag_box_query_2 = """
            query getArea($bbox: [Float], $zoom: Float) {
                    cragsWithin(filter: {bbox: $bbox, zoom:$zoom}) {
                        areaName
                        totalClimbs
                        uuid
                        density
                        gradeContext
                        media {
                            mediaUrl
                        }
                        content {
                        description
                        }
                        metadata {
                        lat
                        lng
                        }
                        climbs {
                            uuid
                            name
                            media {
                                mediaUrl
                            }
                            metadata {
                                lat
                                lng
                            }
                            }
                            children {
                            areaName
                            totalClimbs
                            uuid
                            density
                            gradeContext
                            media {
                                mediaUrl
                            }
                            metadata {
                                lat
                                lng
                            }
                            }
                        }
                        }
                        """

get_area_search = """
query areaSearchQuery($match: String = "a") {
  areas(filter: {area_name: {match: $match}}) {
    areaName
    uuid
  }
}
"""

get_area_children = """
            query GetArea($uuid: ID!) {
            area(uuid: $uuid) {
                areaName
                uuid
                ancestors
                id
                totalClimbs
                content {
                description
                }
                children {
                    areaName
                    uuid
                    totalClimbs
                    media {
                        mediaUrl
                    }
                    metadata {
                        lng
                        lat
                        areaId
                    }
                    climbs {
                        name
                        uuid
                        media {
                        mediaUrl
                        }
                        grades {
                        vscale
                        yds
                        }
                        metadata {
                        lat
                        lng
                        climbId
                        }
                    }
                }
                climbs {
                        name
                        uuid
                        media {
                            mediaUrl
                        }
                        grades {
                        vscale
                        yds
                        }
                        metadata {
                        lat
                        lng
                        climbId
                        leftRightIndex
                        }
                    }
                    media {
                        mediaUrl
                    }         
            }
            }
            """

get_countries_query = """
query GetCountries {
  countries {
    areaName
    metadata {
      lat
      lng
    }
    media {
        mediaUrl
    }
    totalClimbs
    uuid
    id
  }
}

"""

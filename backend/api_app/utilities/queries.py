get_climb_by_id_query = """
        query getClimbById ( $uuid: ID! ) {
            climb(uuid: $uuid) {
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
                media {
                    mediaUrl
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
            query getClimbsInCrag ($uuid: ID!){
            area(uuid: $uuid) {
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

crag_box_query = """
        query getArea($bbox: [Float], $zoom: Float) {
        cragsWithin(filter: {bbox: $bbox, zoom:$zoom}) {
            areaName
            totalClimbs
            uuid
            density
            gradeContext
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
                            metadata {
                                lat
                                lng
                            }
                            }
                            children {
                            areaName
                            uuid
                            metadata {
                                lat
                                lng
                            }
                            }
                        }
                        }
                        """


def create_route(data, *args, **kwargs):
    # Extracting values from JSON
    route_id = data["metadata"]["climb_id"]
    name = data["name"]
    lat = data["metadata"]["lat"]
    lng = data["metadata"]["lng"]
    area = data["parent"]["area_name"]
    completed = False  # Assuming default value is False
    grade = data["grades"]["vscale"] or "Unknown"  # Provide a default value if vscale is null
    media = data["media"]  # Assuming this is a list, update accordingly

    # Creating or updating Pyramid instance
    # pyramid, created = Pyramid.objects.get_or_create(id=pyramid_id)

    # Creating Route instance
    route = Route.objects.create(
        route_id=route_id,
        # pyramid=pyramid,
        name=name,
        lat=lat,
        lng=lng,
        area=area,
        completed=completed,
        grade=grade,
        media=media
    )

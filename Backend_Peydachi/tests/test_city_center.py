def test_get_center_of_city(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admincenterget1",
        "password": "adminpass",
        "email": "admincenterget1@example.com",
        "phone_number": "09120000504"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admincenterget1",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    region_id = client.post("/admin/region/add_region", json={"name": "RegionGetCenter"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityGetCenter", "region_id": region_id}, headers=headers).json()["id"]

    client.post("/admin/city_center/add_city_center", json={
        "city_id": city_id,
        "latitude": "36.1234",
        "longitude": "52.5678"
    }, headers=headers)

    res = client.post("/city_center/get_center_of_city", json={"city_id": city_id})
    assert res.status_code == 200
    assert res.json()["city_id"] == city_id
    assert res.json()["latitude"] == "36.1234"



def test_get_city_centers_of_region(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admincenterget2",
        "password": "adminpass",
        "email": "admincenterget2@example.com",
        "phone_number": "09120000505"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admincenterget2",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    region_id = client.post("/admin/region/add_region", json={"name": "RegionGetCenters"}, headers=headers).json()["id"]

    city1_id = client.post("/admin/city/add_city", json={"name": "CityOne", "region_id": region_id}, headers=headers).json()["id"]
    city2_id = client.post("/admin/city/add_city", json={"name": "CityTwo", "region_id": region_id}, headers=headers).json()["id"]

    client.post("/admin/city_center/add_city_center", json={"city_id": city1_id, "latitude": "36.1", "longitude": "51.1"}, headers=headers)
    client.post("/admin/city_center/add_city_center", json={"city_id": city2_id, "latitude": "36.2", "longitude": "51.2"}, headers=headers)

    res = client.post("/city_center/get_city_centers_of_region", json={"region_id": region_id})
    assert res.status_code == 200
    city_ids = [c["city_id"] for c in res.json()]
    assert city1_id in city_ids
    assert city2_id in city_ids

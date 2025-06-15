def test_add_city_center(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admincenter1",
        "password": "adminpass",
        "email": "admincenter1@example.com",
        "phone_number": "09120000501"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admincenter1",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    region_id = client.post("/admin/region/add_region", json={"name": "RegionCenter1"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityCenter1", "region_id": region_id}, headers=headers).json()["id"]

    res = client.post("/admin/city_center/add_city_center", json={
        "city_id": city_id,
        "latitude": "35.6892",
        "longitude": "51.3890"
    }, headers=headers)

    assert res.status_code == 201
    assert res.json()["city_id"] == city_id
    assert res.json()["latitude"] == "35.6892"



def test_update_city_center(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admincenter2",
        "password": "adminpass",
        "email": "admincenter2@example.com",
        "phone_number": "09120000502"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admincenter2",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    region_id = client.post("/admin/region/add_region", json={"name": "RegionCenter2"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityCenter2", "region_id": region_id}, headers=headers).json()["id"]

    client.post("/admin/city_center/add_city_center", json={
        "city_id": city_id,
        "latitude": "30.0000",
        "longitude": "50.0000"
    }, headers=headers)

    res = client.put("/admin/city_center/update_city_center", json={
        "city_id": city_id,
        "latitude": "35.1234",
        "longitude": "51.5678"
    }, headers=headers)

    assert res.status_code == 200
    assert res.json()["city_id"] == city_id
    assert res.json()["latitude"] == "35.1234"
    assert res.json()["longitude"] == "51.5678"




import json

def test_delete_city_center(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admincenter3",
        "password": "adminpass",
        "email": "admincenter3@example.com",
        "phone_number": "09120000503"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admincenter3",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    region_id = client.post("/admin/region/add_region", json={"name": "RegionCenter3"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityCenter3", "region_id": region_id}, headers=headers).json()["id"]

    client.post("/admin/city_center/add_city_center", json={
        "city_id": city_id,
        "latitude": "33.3333",
        "longitude": "51.9999"
    }, headers=headers)

    res = client.request("DELETE", "/admin/city_center/delete_city_center", headers=headers, content=json.dumps({"city_id": city_id}))
    assert res.status_code == 200

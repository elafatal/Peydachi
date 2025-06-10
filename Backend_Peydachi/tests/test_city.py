def test_get_city_by_id(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "citygen1",
        "password": "adminpass",
        "email": "citygen1@example.com",
        "phone_number": "09111000001"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "citygen1",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    region_id = client.post("/admin/region/add_region", json={"name": "RegionGetID"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityGetID", "region_id": region_id}, headers=headers).json()["id"]
    res = client.post("/city/get_city_by_id", json={"city_id": city_id})
    assert res.status_code == 200
    assert res.json()["id"] == city_id


def test_get_cities_of_region(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "citygen2",
        "password": "adminpass",
        "email": "citygen2@example.com",
        "phone_number": "09111000002"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "citygen2",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    region_id = client.post("/admin/region/add_region", json={"name": "RegionGroup"}, headers=headers).json()["id"]
    client.post("/admin/city/add_city", json={"name": "GroupCity", "region_id": region_id}, headers=headers)
    res = client.post("/city/get_cities_of_region", json={"region_id": region_id})
    assert res.status_code == 200
    assert any(city["region_id"] == region_id for city in res.json())


def test_search_city_by_name(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "citygen3",
        "password": "adminpass",
        "email": "citygen3@example.com",
        "phone_number": "09111000003"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "citygen3",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    region_id = client.post("/admin/region/add_region", json={"name": "SearchRegion"}, headers=headers).json()["id"]
    client.post("/admin/city/add_city", json={"name": "SearchTarget", "region_id": region_id}, headers=headers)
    res = client.post("/city/search_city_by_name", json={"city_name": "SearchTarget"})
    assert res.status_code == 200
    assert any(city["name"] == "SearchTarget" for city in res.json())



def test_search_city_in_region(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "citygen4",
        "password": "adminpass",
        "email": "citygen4@example.com",
        "phone_number": "09111000004"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "citygen4",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    region_id = client.post("/admin/region/add_region", json={"name": "ScopedRegion"}, headers=headers).json()["id"]
    client.post("/admin/city/add_city", json={"name": "ScopedCity", "region_id": region_id}, headers=headers)
    res = client.post("/city/search_city_in_region", json={"city_name": "ScopedCity", "region_id": region_id})
    assert res.status_code == 200
    assert any(city["name"] == "ScopedCity" and city["region_id"] == region_id for city in res.json())



def test_get_all_cities(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "citygen_all",
        "password": "adminpass",
        "email": "citygen_all@example.com",
        "phone_number": "09111000005"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "citygen_all",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    region_id = client.post("/admin/region/add_region", json={"name": "AllRegion"}, headers=headers).json()["id"]
    client.post("/admin/city/add_city", json={"name": "AllCity1", "region_id": region_id}, headers=headers)
    client.post("/admin/city/add_city", json={"name": "AllCity2", "region_id": region_id}, headers=headers)

    res = client.get("/city/get_all_cities")
    assert res.status_code == 200
    assert isinstance(res.json(), list)
    assert any(city["name"] == "AllCity1" for city in res.json())
    assert any(city["name"] == "AllCity2" for city in res.json())

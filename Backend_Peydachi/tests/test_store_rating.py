def test_rate_store(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminrater",
        "password": "adminpass",
        "email": "adminrater@example.com",
        "phone_number": "09120000801"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminrater",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "rating_user",
        "password": "userpass",
        "email": "rating_user@example.com",
        "phone_number": "09123334460"
    }, headers=headers).json()["id"]

    region_id = client.post("/admin/region/add_region", json={"name": "RegRating"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityRating", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "RateableStore", "city_id": city_id}, headers=headers).json()["id"]

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "rating_user",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {
        "Authorization": f"Bearer {user_token}",
        "Content-Type": "application/json"
    }

    paylod = {
        "store_id": store_id,
        "rating": 4
    }
    res = client.post("/store_rating/rate_store", json=paylod, headers=user_headers)

    assert res.status_code == 201
    assert res.json()["rating"] == 4
    assert res.json()["store_id"] == store_id


def test_get_store_rating_distribution(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admindistribution",
        "password": "adminpass",
        "email": "admindistribution@example.com",
        "phone_number": "09120000802"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admindistribution",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "dist_user",
        "password": "userpass",
        "email": "dist_user@example.com",
        "phone_number": "09123334461"
    }, headers=headers).json()["id"]

    region_id = client.post("/admin/region/add_region", json={"name": "RegDist"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityDist", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreDist", "city_id": city_id}, headers=headers).json()["id"]

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "dist_user",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}", "Content-Type": "application/json"}

    client.post("/store_rating/rate_store", json={
        "store_id": store_id,
        "rating": 5
    }, headers=user_headers)

    paylod = {
        "store_id": store_id
    }

    res = client.post("/store_rating/get_store_rating_distribution", json=paylod, headers=headers)

    assert res.status_code == 200
    assert isinstance(res.json(), list)
    assert any(item["rating"] == 5 for item in res.json())




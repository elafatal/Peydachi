def test_reset_all_ratings_of_store(client):
    import json

    client.post("/super_admin/add_super_admin", json={
        "username": "adminresetratings",
        "password": "adminpass",
        "email": "adminresetratings@example.com",
        "phone_number": "09120000803"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminresetratings",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    user_id = client.post("/user/create_user", json={
        "username": "rating_reset_user",
        "password": "userpass",
        "email": "rating_reset_user@example.com",
        "phone_number": "09123334462"
    }, headers=headers).json()["id"]

    region_id = client.post("/admin/region/add_region", json={"name": "RegReset"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityReset", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "ResettableStore", "city_id": city_id}, headers=headers).json()["id"]

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "rating_reset_user",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}", "Content-Type": "application/json"}

    client.post("/store_rating/rate_store", json={
        "store_id": store_id,
        "rating": 2
    }, headers=user_headers)

    res = client.request(
        "DELETE",
        "/admin/store_rating/reset_all_ratings_of_store",
        headers=headers,
        content=json.dumps({"store_id": store_id})
    )

    assert res.status_code == 200

def test_rate_product(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminrateproduct",
        "password": "adminpass",
        "email": "adminrateproduct@example.com",
        "phone_number": "09120000901"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminrateproduct",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "product_rating_user",
        "password": "userpass",
        "email": "product_rating_user@example.com",
        "phone_number": "09123334501"
    }, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)
    region_id = client.post("/admin/region/add_region", json={"name": "RegProdRating"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityProdRating", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreProdRating", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "product_rating_user",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}"}

    product_res = client.post("/seller/product/add_product", data={
        "name": "RatedProduct",
        "description": "for rating",
        "quantity": 3
    }, headers=user_headers)

    assert product_res.status_code == 201
    product_id = product_res.json()["id"]

    res = client.post("/product_rating/rate_product", json={
        "product_id": product_id,
        "store_id": store_id,
        "rating": 5
    }, headers={**user_headers, "Content-Type": "application/json"})

    assert res.status_code == 201
    assert res.json()["product_id"] == product_id
    assert res.json()["rating"] == 5



def test_get_product_rating_distribution(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminprodratedist",
        "password": "adminpass",
        "email": "adminprodratedist@example.com",
        "phone_number": "09120000902"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminprodratedist",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "product_rating_user2",
        "password": "userpass",
        "email": "product_rating_user2@example.com",
        "phone_number": "09123334502"
    }, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)
    region_id = client.post("/admin/region/add_region", json={"name": "RegProdRatingDist"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityProdRatingDist", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreProdRatingDist", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "product_rating_user2",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}"}

    product_res = client.post("/seller/product/add_product", data={
        "name": "DistRatedProduct",
        "description": "for dist test",
        "quantity": 10
    }, headers=user_headers)

    assert product_res.status_code == 201
    product_id = product_res.json()["id"]

    client.post("/product_rating/rate_product", json={
        "product_id": product_id,
        "store_id": store_id,
        "rating": 3
    }, headers={**user_headers, "Content-Type": "application/json"})

    res = client.post("/product_rating/get_product_rating_distribution", json={
        "product_id": product_id
    }, headers={**headers, "Content-Type": "application/json"})

    assert res.status_code == 200
    assert isinstance(res.json(), list)
    assert any(rating["rating"] == 3 for rating in res.json())

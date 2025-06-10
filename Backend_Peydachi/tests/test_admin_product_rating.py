def test_reset_product_rating(client):
    import json

    client.post("/super_admin/add_super_admin", json={
        "username": "adminresetprod",
        "password": "adminpass",
        "email": "adminresetprod@example.com",
        "phone_number": "09120000903"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminresetprod",
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
        "phone_number": "09123334503"
    }, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)
    region_id = client.post("/admin/region/add_region", json={"name": "RegResetProd"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityResetProd", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreResetProd", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "rating_reset_user",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}"}

    product_res = client.post("/seller/product/add_product", data={
        "name": "ResettableProduct",
        "description": "for reset",
        "quantity": 7
    }, headers=user_headers)

    assert product_res.status_code == 201
    product_id = product_res.json()["id"]

    client.post("/product_rating/rate_product", json={
        "product_id": product_id,
        "store_id": store_id,
        "rating": 2
    }, headers={**user_headers, "Content-Type": "application/json"})

    res = client.request(
        "DELETE",
        "/admin/product_rating/reset_product_rating",
        headers=headers,
        content=json.dumps({"product_id": product_id})
    )

    assert res.status_code == 200

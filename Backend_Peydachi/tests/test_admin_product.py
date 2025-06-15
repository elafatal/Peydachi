def test_delete_product_admin(client):
    import json

    client.post("/super_admin/add_super_admin", json={
        "username": "adminproductdel",
        "password": "adminpass",
        "email": "adminproductdel@example.com",
        "phone_number": "09120000306"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminproductdel",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    user_id = client.post("/user/create_user", json={
        "username": "del_seller",
        "password": "sellerpass",
        "email": "del_seller@example.com",
        "phone_number": "09125559999"
    }, headers=headers).json()["id"]
    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)

    region_id = client.post("/admin/region/add_region", json={"name": "RegDelProd"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityDelProd", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreDelProd", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    seller_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "del_seller",
        "password": "sellerpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    seller_headers = {"Authorization": f"Bearer {seller_token}"}

    product_response = client.post(
        "/seller/product/add_product",
        data={"name": "AdminDeletableProduct", "description": "to be deleted by admin", "quantity": 5},
        headers=seller_headers
    )
    assert product_response.status_code == 201
    product = product_response.json()
    assert "id" in product
    product_id = product["id"]

    res = client.request("DELETE", "/admin/product/delete_product_admin", headers=headers, content=json.dumps({"product_id": product_id}))
    assert res.status_code == 200

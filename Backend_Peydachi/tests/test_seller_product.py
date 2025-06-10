def test_add_product(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminselleradd",
        "password": "adminpass",
        "email": "adminselleradd@example.com",
        "phone_number": "09120000401"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminselleradd",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    user_id = client.post("/user/create_user", json={
        "username": "prod_seller_add",
        "password": "sellerpass",
        "email": "prod_seller_add@example.com",
        "phone_number": "09127774444"
    }, headers=headers).json()["id"]
    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)

    region_id = client.post("/admin/region/add_region", json={"name": "RegAddProd"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityAddProd", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreAddProd", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    seller_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "prod_seller_add",
        "password": "sellerpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    seller_headers = {"Authorization": f"Bearer {seller_token}"}

    res = client.post("/seller/product/add_product", data={
        "name": "TestSellerProduct",
        "description": "Product from seller",
        "quantity": 7
    }, headers=seller_headers)

    assert res.status_code == 201
    assert res.json()["name"] == "TestSellerProduct"
    assert res.json()["quantity"] == 7




def test_update_product(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminsellerupdate",
        "password": "adminpass",
        "email": "adminsellerupdate@example.com",
        "phone_number": "09120000402"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminsellerupdate",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "prod_seller_update",
        "password": "sellerpass",
        "email": "prod_seller_update@example.com",
        "phone_number": "09128885555"
    }, headers=headers).json()["id"]
    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)

    region_id = client.post("/admin/region/add_region", json={"name": "RegUpdateProd"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityUpdateProd", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreUpdateProd", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    seller_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "prod_seller_update",
        "password": "sellerpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    seller_headers = {"Authorization": f"Bearer {seller_token}"}

    product_response = client.post("/seller/product/add_product", data={
        "name": "ProductToUpdate",
        "description": "initial description",
        "quantity": 2
    }, headers=seller_headers)
    assert product_response.status_code == 201
    product = product_response.json()
    product_id = product["id"]

    update_res = client.put("/seller/product/update_product", json={
        "id": product_id,
        "name": "UpdatedName",
        "description": "updated description",
        "quantity": 20
    }, headers=seller_headers)

    assert update_res.status_code == 200
    assert update_res.json()["id"] == product_id
    assert update_res.json()["name"] == "UpdatedName"



def test_delete_product(client):
    import json

    client.post("/super_admin/add_super_admin", json={
        "username": "adminsellerdelete",
        "password": "adminpass",
        "email": "adminsellerdelete@example.com",
        "phone_number": "09120000403"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminsellerdelete",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "seller_delete",
        "password": "sellerpass",
        "email": "seller_delete@example.com",
        "phone_number": "09121112222"
    }, headers=headers).json()["id"]
    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)

    region_id = client.post("/admin/region/add_region", json={"name": "RegDel"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityDel", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreDel", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    seller_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "seller_delete",
        "password": "sellerpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    seller_headers = {"Authorization": f"Bearer {seller_token}", "Content-Type": "application/json"}

    product_id = client.post("/seller/product/add_product", data={
        "name": "ToBeDeleted",
        "description": "delete test",
        "quantity": 1
    }, headers=seller_headers).json()["id"]

    res = client.request("DELETE", "/seller/product/delete_product", headers=seller_headers, content=json.dumps({"product_id": product_id}))
    assert res.status_code == 200




def test_delete_product(client):
    import json

    client.post("/super_admin/add_super_admin", json={
        "username": "adminsellerdelete",
        "password": "adminpass",
        "email": "adminsellerdelete@example.com",
        "phone_number": "09120000403"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminsellerdelete",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "seller_delete",
        "password": "sellerpass",
        "email": "seller_delete@example.com",
        "phone_number": "09121112222"
    }, headers=headers).json()["id"]
    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)

    region_id = client.post("/admin/region/add_region", json={"name": "RegDel"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityDel", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreDel", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    seller_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "seller_delete",
        "password": "sellerpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    seller_headers = {"Authorization": f"Bearer {seller_token}"}

    product_response = client.post("/seller/product/add_product", data={
        "name": "ToBeDeleted",
        "description": "delete test",
        "quantity": 1
    }, headers=seller_headers)
    assert product_response.status_code == 201
    product_id = product_response.json()["id"]

    res = client.request("DELETE", "/seller/product/delete_product", headers=seller_headers, content=json.dumps({"product_id": product_id}))
    assert res.status_code == 200



def test_update_product_quantity(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminsellerquantity",
        "password": "adminpass",
        "email": "adminsellerquantity@example.com",
        "phone_number": "09120000404"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminsellerquantity",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "seller_quantity",
        "password": "sellerpass",
        "email": "seller_quantity@example.com",
        "phone_number": "09124445555"
    }, headers=headers).json()["id"]
    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)

    region_id = client.post("/admin/region/add_region", json={"name": "RegQuant"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityQuant", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreQuant", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    seller_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "seller_quantity",
        "password": "sellerpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    seller_headers = {"Authorization": f"Bearer {seller_token}"}

    product_res = client.post("/seller/product/add_product", data={
        "name": "QuantityProd",
        "description": "quantity update test",
        "quantity": 1
    }, headers=seller_headers)
    assert product_res.status_code == 201
    product_id = product_res.json()["id"]

    update_res = client.put("/seller/product/update_product_quantity", json={
        "product_id": product_id,
        "quantity": 50
    }, headers=seller_headers)

    assert update_res.status_code == 200
    assert update_res.json()["quantity"] == 50





def test_get_self_products(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminsellerproducts",
        "password": "adminpass",
        "email": "adminsellerproducts@example.com",
        "phone_number": "09120000405"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminsellerproducts",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "seller_self",
        "password": "sellerpass",
        "email": "seller_self@example.com",
        "phone_number": "09123336666"
    }, headers=headers).json()["id"]
    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)

    region_id = client.post("/admin/region/add_region", json={"name": "RegSelfProd"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CitySelfProd", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreSelfProd", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    seller_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "seller_self",
        "password": "sellerpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    seller_headers = {"Authorization": f"Bearer {seller_token}"}

    client.post("/seller/product/add_product", data={
        "name": "SelfProd1",
        "description": "owned product 1",
        "quantity": 3
    }, headers=seller_headers)
    client.post("/seller/product/add_product", data={
        "name": "SelfProd2",
        "description": "owned product 2",
        "quantity": 6
    }, headers=seller_headers)

    res = client.get("/seller/product/get_self_products", headers=seller_headers)
    assert res.status_code == 200
    assert any(p["name"] == "SelfProd1" for p in res.json())
    assert any(p["name"] == "SelfProd2" for p in res.json())

def test_admin_delete_product_comment(client):
    import json

    client.post("/super_admin/add_super_admin", json={
        "username": "adminproductdel",
        "password": "adminpass",
        "email": "adminproductdel@example.com",
        "phone_number": "09120000707"
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
        "username": "comment_user_del",
        "password": "userpass",
        "email": "comment_user_del@example.com",
        "phone_number": "09123334447"
    }, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)
    region_id = client.post("/admin/region/add_region", json={"name": "RegDelProdComm"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityDelProdComm", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreDelProdComm", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "comment_user_del",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}"}

    product_id = client.post("/seller/product/add_product", data={
        "name": "ProductToDelComment",
        "description": "admin delete comment",
        "quantity": 1
    }, headers=user_headers).json()["id"]

    comment_id = client.post("/product_comment/add_product_comment", json={
        "product_id": product_id,
        "text": "کامنتی برای حذف توسط ادمین"
    }, headers=user_headers).json()["id"]

    res = client.request(
        "DELETE",
        "/admin/product_comment/admin_delete_product_comment",
        headers=headers,
        content=json.dumps({"product_comment_id": comment_id})
    )

    assert res.status_code == 200




def test_delete_all_comments_of_product(client):
    import json

    client.post("/super_admin/add_super_admin", json={
        "username": "admindelallprodcomm",
        "password": "adminpass",
        "email": "admindelallprodcomm@example.com",
        "phone_number": "09120000708"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admindelallprodcomm",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    user_id = client.post("/user/create_user", json={
        "username": "comment_user_bulk",
        "password": "userpass",
        "email": "comment_user_bulk@example.com",
        "phone_number": "09123334448"
    }, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)
    region_id = client.post("/admin/region/add_region", json={"name": "RegBulkDel"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityBulkDel", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreBulkDel", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "comment_user_bulk",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}"}

    product_id = client.post("/seller/product/add_product", data={
        "name": "ProductBulkDel",
        "description": "bulk delete test",
        "quantity": 5
    }, headers=user_headers).json()["id"]

    client.post("/product_comment/add_product_comment", json={
        "product_id": product_id,
        "text": "کامنت اول برای حذف"
    }, headers=user_headers)

    client.post("/product_comment/add_product_comment", json={
        "product_id": product_id,
        "text": "کامنت دوم برای حذف"
    }, headers=user_headers)

    res = client.request(
        "DELETE",
        "/admin/product_comment/delete_all_comments_of_product",
        headers=headers,
        content=json.dumps({"product_id": product_id})
    )

    assert res.status_code == 200





def test_search_product_comments(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminsearchprodcomm",
        "password": "adminpass",
        "email": "adminsearchprodcomm@example.com",
        "phone_number": "09120000709"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminsearchprodcomm",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    user_id = client.post("/user/create_user", json={
        "username": "search_comment_user",
        "password": "userpass",
        "email": "search_comment_user@example.com",
        "phone_number": "09123334449"
    }, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)
    region_id = client.post("/admin/region/add_region", json={"name": "RegSearchProdComm"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CitySearchProdComm", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreSearchProdComm", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "search_comment_user",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}"}

    product_id = client.post("/seller/product/add_product", data={
        "name": "SearchableProduct",
        "description": "for comment search",
        "quantity": 10
    }, headers=user_headers).json()["id"]

    client.post("/product_comment/add_product_comment", json={
        "product_id": product_id,
        "text": "نظر شامل واژه خاص"
    }, headers=user_headers)

    client.post("/product_comment/add_product_comment", json={
        "product_id": product_id,
        "text": "نظر بدون کلمه هدف"
    }, headers=user_headers)

    res = client.post("/admin/product_comment/search_product_comments", json={
        "product_id": product_id,
        "search": "خاص"
    }, headers=headers)

    assert res.status_code == 200
    assert any("خاص" in c["text"] for c in res.json())



def test_get_user_product_comments(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admingetuserprodcomm",
        "password": "adminpass",
        "email": "admingetuserprodcomm@example.com",
        "phone_number": "09120000710"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admingetuserprodcomm",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    user_id = client.post("/user/create_user", json={
        "username": "prod_user_target",
        "password": "userpass",
        "email": "prod_user_target@example.com",
        "phone_number": "09123334450"
    }, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)
    region_id = client.post("/admin/region/add_region", json={"name": "RegGetUserProdComm"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityGetUserProdComm", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreGetUserProdComm", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "prod_user_target",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}"}

    product_id = client.post("/seller/product/add_product", data={
        "name": "ProductForUserComments",
        "description": "admin access to user comments",
        "quantity": 3
    }, headers=user_headers).json()["id"]

    client.post("/product_comment/add_product_comment", json={
        "product_id": product_id,
        "text": "کامنت کاربر هدف"
    }, headers=user_headers)

    res = client.post("/admin/product_comment/get_user_product_comments", json={"user_id": user_id}, headers=headers)
    assert res.status_code == 200
    assert any("کامنت کاربر هدف" in c["text"] for c in res.json())



def test_get_user_full_product_comments(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminfullprodcomm",
        "password": "adminpass",
        "email": "adminfullprodcomm@example.com",
        "phone_number": "09120000711"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminfullprodcomm",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    user_id = client.post("/user/create_user", json={
        "username": "prod_user_full",
        "password": "userpass",
        "email": "prod_user_full@example.com",
        "phone_number": "09123334451"
    }, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)
    region_id = client.post("/admin/region/add_region", json={"name": "RegFullProdComm"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityFullProdComm", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreFullProdComm", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "prod_user_full",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}"}

    product_id = client.post("/seller/product/add_product", data={
        "name": "ProductFullUserComment",
        "description": "full user comments",
        "quantity": 6
    }, headers=user_headers).json()["id"]

    client.post("/product_comment/add_product_comment", json={
        "product_id": product_id,
        "text": "نظر کامل‌شده توسط کاربر"
    }, headers=user_headers)

    res = client.post("/admin/product_comment/get_user_full_product_comments", json={"user_id": user_id}, headers=headers)
    assert res.status_code == 200
    assert any("کامل‌شده" in item["product_comment"]["text"] for item in res.json())

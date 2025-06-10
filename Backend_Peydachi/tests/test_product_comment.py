def test_add_product_comment(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminprodcomment1",
        "password": "adminpass",
        "email": "adminprodcomment1@example.com",
        "phone_number": "09120000701"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminprodcomment1",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "prod_comment_user1",
        "password": "userpass",
        "email": "prod_comment_user1@example.com",
        "phone_number": "09123334441"
    }, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)

    region_id = client.post("/admin/region/add_region", json={"name": "RegProdComment"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityProdComment", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreProdComment", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "prod_comment_user1",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}"}

    product_id = client.post("/seller/product/add_product", data={
        "name": "CommentedProduct",
        "description": "comment test",
        "quantity": 5
    }, headers=user_headers).json()["id"]

    res = client.post("/product_comment/add_product_comment", json={
        "product_id": product_id,
        "text": "نظر تستی برای محصول"
    }, headers=user_headers)

    assert res.status_code == 201
    assert res.json()["text"] == "نظر تستی برای محصول"
    assert res.json()["product_id"] == product_id




def test_get_product_comments(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminprodcomment2",
        "password": "adminpass",
        "email": "adminprodcomment2@example.com",
        "phone_number": "09120000702"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminprodcomment2",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "prod_comment_user2",
        "password": "userpass",
        "email": "prod_comment_user2@example.com",
        "phone_number": "09123334442"
    }, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)

    region_id = client.post("/admin/region/add_region", json={"name": "RegProdComment2"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityProdComment2", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreProdComment2", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "prod_comment_user2",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}"}

    product_id = client.post("/seller/product/add_product", data={
        "name": "ProductForComments",
        "description": "test multiple comments",
        "quantity": 10
    }, headers=user_headers).json()["id"]

    client.post("/product_comment/add_product_comment", json={
        "product_id": product_id,
        "text": "کامنت اول"
    }, headers=user_headers)

    client.post("/product_comment/add_product_comment", json={
        "product_id": product_id,
        "text": "کامنت دوم"
    }, headers=user_headers)

    res = client.post("/product_comment/get_product_comments", json={"product_id": product_id})
    assert res.status_code == 200
    texts = [c["text"] for c in res.json()]
    assert "کامنت اول" in texts
    assert "کامنت دوم" in texts



def test_get_product_comment_by_id(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminprodcomment3",
        "password": "adminpass",
        "email": "adminprodcomment3@example.com",
        "phone_number": "09120000703"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminprodcomment3",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "prod_comment_user3",
        "password": "userpass",
        "email": "prod_comment_user3@example.com",
        "phone_number": "09123334443"
    }, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)

    region_id = client.post("/admin/region/add_region", json={"name": "RegProdComment3"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityProdComment3", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreProdComment3", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "prod_comment_user3",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}"}

    product_id = client.post("/seller/product/add_product", data={
        "name": "CommentedProduct3",
        "description": "get by id",
        "quantity": 3
    }, headers=user_headers).json()["id"]

    comment = client.post("/product_comment/add_product_comment", json={
        "product_id": product_id,
        "text": "کامنت قابل بازیابی"
    }, headers=user_headers).json()

    res = client.post("/product_comment/get_product_comment_by_id", json={"product_comment_id": comment["id"]})
    assert res.status_code == 200
    assert res.json()["id"] == comment["id"]
    assert res.json()["text"] == "کامنت قابل بازیابی"



def test_user_delete_product_comment(client):
    import json

    client.post("/super_admin/add_super_admin", json={
        "username": "adminprodcomment4",
        "password": "adminpass",
        "email": "adminprodcomment4@example.com",
        "phone_number": "09120000704"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminprodcomment4",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "prod_comment_user4",
        "password": "userpass",
        "email": "prod_comment_user4@example.com",
        "phone_number": "09123334444"
    }, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)

    region_id = client.post("/admin/region/add_region", json={"name": "RegProdComment4"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityProdComment4", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreProdComment4", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "prod_comment_user4",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}"}

    product_id = client.post("/seller/product/add_product", data={
        "name": "ProductToDeleteComment",
        "description": "delete comment test",
        "quantity": 2
    }, headers=user_headers).json()["id"]

    comment_id = client.post("/product_comment/add_product_comment", json={
        "product_id": product_id,
        "text": "کامنتی که باید حذف شود"
    }, headers=user_headers).json()["id"]

    res = client.request(
        "DELETE",
        "/product_comment/user_delete_product_comment",
        headers=user_headers,
        content=json.dumps({"product_comment_id": comment_id})
    )

    assert res.status_code == 200




def test_get_self_product_comments(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminprodcomment5",
        "password": "adminpass",
        "email": "adminprodcomment5@example.com",
        "phone_number": "09120000705"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminprodcomment5",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "prod_comment_user5",
        "password": "userpass",
        "email": "prod_comment_user5@example.com",
        "phone_number": "09123334445"
    }, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)

    region_id = client.post("/admin/region/add_region", json={"name": "RegProdComment5"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityProdComment5", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreProdComment5", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "prod_comment_user5",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}"}

    product_id = client.post("/seller/product/add_product", data={
        "name": "SelfCommentProduct",
        "description": "self comments",
        "quantity": 4
    }, headers=user_headers).json()["id"]

    client.post("/product_comment/add_product_comment", json={
        "product_id": product_id,
        "text": "نظر اول من"
    }, headers=user_headers)

    client.post("/product_comment/add_product_comment", json={
        "product_id": product_id,
        "text": "نظر دوم من"
    }, headers=user_headers)

    res = client.get("/product_comment/get_self_product_comments", headers=user_headers)
    assert res.status_code == 200
    texts = [c["text"] for c in res.json()]
    assert "نظر اول من" in texts
    assert "نظر دوم من" in texts




def test_get_self_full_product_comments(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminprodcomment6",
        "password": "adminpass",
        "email": "adminprodcomment6@example.com",
        "phone_number": "09120000706"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminprodcomment6",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "prod_comment_user6",
        "password": "userpass",
        "email": "prod_comment_user6@example.com",
        "phone_number": "09123334446"
    }, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)

    region_id = client.post("/admin/region/add_region", json={"name": "RegProdComment6"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityProdComment6", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreProdComment6", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "prod_comment_user6",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}"}

    product_id = client.post("/seller/product/add_product", data={
        "name": "ProductFullComment",
        "description": "full self comment",
        "quantity": 2
    }, headers=user_headers).json()["id"]

    client.post("/product_comment/add_product_comment", json={
        "product_id": product_id,
        "text": "کامنت کامل‌شده من"
    }, headers=user_headers)

    res = client.get("/product_comment/get_self_full_product_comments", headers=user_headers)
    assert res.status_code == 200
    assert any("کامنت کامل‌شده" in item["product_comment"]["text"] for item in res.json())

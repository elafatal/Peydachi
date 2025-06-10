def test_admin_remove_store_comment(client):
    import json

    client.post("/super_admin/add_super_admin", json={
        "username": "adminremovecomment",
        "password": "adminpass",
        "email": "adminremovecomment@example.com",
        "phone_number": "09120000607"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminremovecomment",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "remove_comment_user",
        "password": "userpass",
        "email": "remove_comment_user@example.com",
        "phone_number": "09129990007"
    }, headers=headers).json()["id"]

    region_id = client.post("/admin/region/add_region", json={"name": "RegDelComment"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityDelComment", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreDelComment", "city_id": city_id}, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "remove_comment_user",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}"}

    comment_id = client.post("/store_comment/add_store_comment", json={
        "store_id": store_id,
        "text": "کامنت برای حذف توسط ادمین"
    }, headers=user_headers).json()["id"]

    res = client.request(
        "DELETE",
        "/admin/store_comment/admin_remove_store_comment",
        headers=headers,
        content=json.dumps({"store_comment_id": comment_id})
    )
    assert res.status_code == 200



def test_delete_all_comments_of_store(client):
    import json

    client.post("/super_admin/add_super_admin", json={
        "username": "admincommentdelall",
        "password": "adminpass",
        "email": "admincommentdelall@example.com",
        "phone_number": "09120000608"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admincommentdelall",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    user_id = client.post("/user/create_user", json={
        "username": "delall_user",
        "password": "userpass",
        "email": "delall_user@example.com",
        "phone_number": "09129990008"
    }, headers=headers).json()["id"]

    region_id = client.post("/admin/region/add_region", json={"name": "RegDelAll"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityDelAll", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreDelAll", "city_id": city_id}, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "delall_user",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}", "Content-Type": "application/json"}

    client.post("/store_comment/add_store_comment", json={"store_id": store_id, "text": "comment A"}, headers=user_headers)
    client.post("/store_comment/add_store_comment", json={"store_id": store_id, "text": "comment B"}, headers=user_headers)

    res = client.request(
        "DELETE",
        "/admin/store_comment/delete_all_comments_of_store",
        headers=headers,
        content=json.dumps({"store_id": store_id})
    )
    assert res.status_code == 200



def test_search_store_comments(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminsearchcomment",
        "password": "adminpass",
        "email": "adminsearchcomment@example.com",
        "phone_number": "09120000609"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminsearchcomment",
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
        "phone_number": "09129990009"
    }, headers=headers).json()["id"]

    region_id = client.post("/admin/region/add_region", json={"name": "RegSearch"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CitySearch", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "SearchStore", "city_id": city_id}, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)
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

    client.post("/store_comment/add_store_comment", json={"store_id": store_id, "text": "این یک نظر تستی است"}, headers=user_headers)
    client.post("/store_comment/add_store_comment", json={"store_id": store_id, "text": "نظر دیگر"}, headers=user_headers)

    res = client.post("/admin/store_comment/search_store_comments", json={
        "store_id": store_id,
        "search": "تستی"
    }, headers=headers)

    assert res.status_code == 200
    assert any("تستی" in c["text"] for c in res.json())



def test_admin_get_user_store_comments(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminusercomments",
        "password": "adminpass",
        "email": "adminusercomments@example.com",
        "phone_number": "09120000610"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminusercomments",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    user_id = client.post("/user/create_user", json={
        "username": "user_comment_target",
        "password": "userpass",
        "email": "user_comment_target@example.com",
        "phone_number": "09129990010"
    }, headers=headers).json()["id"]

    region_id = client.post("/admin/region/add_region", json={"name": "RegAdminUser"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityAdminUser", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreAdminUser", "city_id": city_id}, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "user_comment_target",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}"}

    client.post("/store_comment/add_store_comment", json={
        "store_id": store_id,
        "text": "کامنت برای بررسی ادمین"
    }, headers=user_headers)

    res = client.post("/admin/store_comment/get_user_store_comments", json={"user_id": user_id}, headers=headers)
    assert res.status_code == 200
    assert any("بررسی ادمین" in c["text"] for c in res.json())




def test_admin_get_user_full_store_comments(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminuserfullcomments",
        "password": "adminpass",
        "email": "adminuserfullcomments@example.com",
        "phone_number": "09120000611"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminuserfullcomments",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    user_id = client.post("/user/create_user", json={
        "username": "user_full_comment",
        "password": "userpass",
        "email": "user_full_comment@example.com",
        "phone_number": "09129990011"
    }, headers=headers).json()["id"]

    region_id = client.post("/admin/region/add_region", json={"name": "RegFull"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityFull", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreFull", "city_id": city_id}, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "user_full_comment",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}"}

    client.post("/store_comment/add_store_comment", json={
        "store_id": store_id,
        "text": "کامنت کامل برای ادمین"
    }, headers=user_headers)

    res = client.post("/admin/store_comment/get_user_full_store_comments", json={"user_id": user_id}, headers=headers)
    assert res.status_code == 200
    assert any("کامنت کامل" in item["store_comment"]["text"] for item in res.json())

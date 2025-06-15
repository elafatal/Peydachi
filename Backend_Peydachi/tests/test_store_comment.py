def test_add_store_comment(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admincomment1",
        "password": "adminpass",
        "email": "admincomment1@example.com",
        "phone_number": "09120000601"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admincomment1",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "comment_user",
        "password": "userpass",
        "email": "comment_user@example.com",
        "phone_number": "09129990001"
    }, headers=headers).json()["id"]

    region_id = client.post("/admin/region/add_region", json={"name": "CommentRegion"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CommentCity", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "CommentStore", "city_id": city_id}, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "comment_user",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}", "Content-Type": "application/json"}

    res = client.post("/store_comment/add_store_comment", json={
        "store_id": store_id,
        "text": "نظر تستی"
    }, headers=user_headers)

    assert res.status_code == 201
    assert res.json()["text"] == "نظر تستی"
    assert res.json()["store_id"] == store_id



def test_get_store_comments(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admincomment2",
        "password": "adminpass",
        "email": "admincomment2@example.com",
        "phone_number": "09120000602"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admincomment2",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "comment_user2",
        "password": "userpass",
        "email": "comment_user2@example.com",
        "phone_number": "09129990002"
    }, headers=headers).json()["id"]

    region_id = client.post("/admin/region/add_region", json={"name": "RegComment2"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityComment2", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreComment2", "city_id": city_id}, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "comment_user2",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}", "Content-Type": "application/json"}

    client.post("/store_comment/add_store_comment", json={
        "store_id": store_id,
        "text": "اولین نظر"
    }, headers=user_headers)
    client.post("/store_comment/add_store_comment", json={
        "store_id": store_id,
        "text": "دومین نظر"
    }, headers=user_headers)

    res = client.post("/store_comment/get_store_comments", json={"store_id": store_id})
    assert res.status_code == 200
    texts = [c["text"] for c in res.json()]
    assert "اولین نظر" in texts
    assert "دومین نظر" in texts



def test_get_store_comment_by_id(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admincomment3",
        "password": "adminpass",
        "email": "admincomment3@example.com",
        "phone_number": "09120000603"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admincomment3",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "comment_user3",
        "password": "userpass",
        "email": "comment_user3@example.com",
        "phone_number": "09129990003"
    }, headers=headers).json()["id"]

    region_id = client.post("/admin/region/add_region", json={"name": "RegComment3"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityComment3", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreComment3", "city_id": city_id}, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "comment_user3",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}", "Content-Type": "application/json"}

    comment = client.post("/store_comment/add_store_comment", json={
        "store_id": store_id,
        "text": "نظر خاص"
    }, headers=user_headers).json()

    res = client.post("/store_comment/get_store_comment_by_id", json={"store_comment_id": comment["id"]})
    assert res.status_code == 200
    assert res.json()["text"] == "نظر خاص"
    assert res.json()["id"] == comment["id"]



def test_user_delete_store_comment(client):
    import json

    client.post("/super_admin/add_super_admin", json={
        "username": "admincomment4",
        "password": "adminpass",
        "email": "admincomment4@example.com",
        "phone_number": "09120000604"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admincomment4",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "comment_user4",
        "password": "userpass",
        "email": "comment_user4@example.com",
        "phone_number": "09129990004"
    }, headers=headers).json()["id"]

    region_id = client.post("/admin/region/add_region", json={"name": "RegComment4"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityComment4", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreComment4", "city_id": city_id}, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "comment_user4",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}", "Content-Type": "application/json"}

    comment = client.post("/store_comment/add_store_comment", json={
        "store_id": store_id,
        "text": "نظر حذف‌شدنی"
    }, headers=user_headers).json()

    res = client.request(
        "DELETE",
        "/store_comment/user_delete_store_comment",
        headers=user_headers,
        content=json.dumps({"store_comment_id": comment["id"]})
    )
    assert res.status_code == 200



def test_get_user_store_comments(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admincomment5",
        "password": "adminpass",
        "email": "admincomment5@example.com",
        "phone_number": "09120000605"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admincomment5",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "comment_user5",
        "password": "userpass",
        "email": "comment_user5@example.com",
        "phone_number": "09129990005"
    }, headers=headers).json()["id"]

    region_id = client.post("/admin/region/add_region", json={"name": "RegComment5"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityComment5", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreComment5", "city_id": city_id}, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "comment_user5",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}", "Content-Type": "application/json"}

    client.post("/store_comment/add_store_comment", json={
        "store_id": store_id,
        "text": "کامنت کاربر ۱"
    }, headers=user_headers)
    client.post("/store_comment/add_store_comment", json={
        "store_id": store_id,
        "text": "کامنت کاربر ۲"
    }, headers=user_headers)

    res = client.get("/store_comment/get_user_store_comments", headers=user_headers)
    assert res.status_code == 200
    texts = [c["text"] for c in res.json()]
    assert "کامنت کاربر ۱" in texts
    assert "کامنت کاربر ۲" in texts




def test_get_self_full_store_comments(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admincomment6",
        "password": "adminpass",
        "email": "admincomment6@example.com",
        "phone_number": "09120000606"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admincomment6",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "comment_user6",
        "password": "userpass",
        "email": "comment_user6@example.com",
        "phone_number": "09129990006"
    }, headers=headers).json()["id"]

    region_id = client.post("/admin/region/add_region", json={"name": "RegComment6"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityComment6", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreComment6", "city_id": city_id}, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "comment_user6",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}", "Content-Type": "application/json"}

    client.post("/store_comment/add_store_comment", json={
        "store_id": store_id,
        "text": "نظر کامل شده"
    }, headers=user_headers)

    res = client.get("/store_comment/get_self_full_store_comments", headers=user_headers)
    assert res.status_code == 200
    assert isinstance(res.json(), list)
    assert any("نظر کامل شده" in item["store_comment"]["text"] for item in res.json())

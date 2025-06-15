def test_create_store(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminstore1",
        "password": "adminpass",
        "email": "adminstore1@example.com",
        "phone_number": "09110000111"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminstore1",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    region_id = client.post("/admin/region/add_region", json={"name": "RegionCreate"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityCreate", "region_id": region_id}, headers=headers).json()["id"]

    res = client.post("/admin/store/create_store", json={
        "name": "TestStoreCreate",
        "city_id": city_id,
        "description": "Store for creation test",
        "location_latitude": "35.0",
        "location_longitude": "51.0",
        "contact_info": {"phone": "09120000000"}
    }, headers=headers)

    assert res.status_code == 201
    data = res.json()
    assert data["name"] == "TestStoreCreate"
    assert data["city_id"] == city_id



def test_add_owner_to_store(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminstore2",
        "password": "adminpass",
        "email": "adminstore2@example.com",
        "phone_number": "09110000112"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminstore2",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    user_res = client.post("/user/create_user", json={
        "username": "seller_candidate",
        "password": "sellerpass",
        "email": "seller_candidate@example.com",
        "phone_number": "09117773333"
    }, headers=headers)
    user_id = user_res.json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)

    region_id = client.post("/admin/region/add_region", json={"name": "RegOwner"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityOwner", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreX", "city_id": city_id}, headers=headers).json()["id"]

    res = client.put("/admin/store/add_owner_to_store", json={
        "store_id": store_id,
        "user_id": user_id
    }, headers=headers)

    assert res.status_code == 200
    assert res.json()["id"] == store_id
    assert res.json()["owner_id"] == user_id



import json

def test_delete_store_admin(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminstore3",
        "password": "adminpass",
        "email": "adminstore3@example.com",
        "phone_number": "09110000113"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminstore3",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    region_id = client.post("/admin/region/add_region", json={"name": "RegDel"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityDel", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreToDelete", "city_id": city_id}, headers=headers).json()["id"]

    res = client.request("DELETE", "/admin/store/delete_store", headers=headers, content=json.dumps({"store_id": store_id}))
    assert res.status_code == 200



def test_ban_store(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminstore4",
        "password": "adminpass",
        "email": "adminstore4@example.com",
        "phone_number": "09110000114"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminstore4",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    user_id = client.post("/user/create_user", json={
        "username": "ban_seller",
        "password": "banpass",
        "email": "ban_seller@example.com",
        "phone_number": "09116667777"
    }, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)

    region_id = client.post("/admin/region/add_region", json={"name": "RegBan"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityBan", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreToBan", "city_id": city_id}, headers=headers).json()["id"]

    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    res = client.put("/admin/store/ban_store", json={"store_id": store_id}, headers=headers)
    assert res.status_code == 200
    assert res.json()["id"] == store_id
    assert res.json()["is_banned"] is True


def test_unban_store(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminstore5",
        "password": "adminpass",
        "email": "adminstore5@example.com",
        "phone_number": "09110000115"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminstore5",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    user_id = client.post("/user/create_user", json={
        "username": "unban_seller",
        "password": "unbanpass",
        "email": "unban_seller@example.com",
        "phone_number": "09118889999"
    }, headers=headers).json()["id"]

    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)

    region_id = client.post("/admin/region/add_region", json={"name": "RegUnban"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityUnban", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreToUnban", "city_id": city_id}, headers=headers).json()["id"]

    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)
    client.put("/admin/store/ban_store", json={"store_id": store_id}, headers=headers)

    res = client.put("/admin/store/unban_store", json={"store_id": store_id}, headers=headers)

    assert res.status_code == 200
    assert res.json()["id"] == store_id
    assert res.json()["is_banned"] is False

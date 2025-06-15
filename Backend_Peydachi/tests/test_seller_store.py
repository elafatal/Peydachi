def test_update_store_info(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminseller1",
        "password": "adminpass",
        "email": "adminseller1@example.com",
        "phone_number": "09110000210"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminseller1",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    user_id = client.post("/user/create_user", json={
        "username": "store_editor",
        "password": "editorpass",
        "email": "store_editor@example.com",
        "phone_number": "09119990001"
    }, headers=headers).json()["id"]
    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)

    region_id = client.post("/admin/region/add_region", json={"name": "RegEdit"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityEdit", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "EditableStore", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    seller_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "store_editor",
        "password": "editorpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    seller_headers = {"Authorization": f"Bearer {seller_token}", "Content-Type": "application/json"}

    res = client.put("/seller/store/update_store_info", json={
        "name": "EditedStore",
        "description": "Updated description",
        "contact_info": {"phone": "09391234567"},
        "location_latitude": "35.70",
        "location_longitude": "51.40"
    }, headers=seller_headers)

    assert res.status_code == 200
    assert res.json()["name"] == "EditedStore"
    assert res.json()["description"] == "Updated description"



def test_get_self_store(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminseller2",
        "password": "adminpass",
        "email": "adminseller2@example.com",
        "phone_number": "09110000211"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminseller2",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    user_id = client.post("/user/create_user", json={
        "username": "self_seller",
        "password": "selfpass",
        "email": "self_seller@example.com",
        "phone_number": "09119990002"
    }, headers=headers).json()["id"]
    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)

    region_id = client.post("/admin/region/add_region", json={"name": "RegSelf"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CitySelf", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "SelfStore", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    seller_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "self_seller",
        "password": "selfpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    seller_headers = {"Authorization": f"Bearer {seller_token}"}

    res = client.get("/seller/store/get_self_store", headers=seller_headers)
    assert res.status_code == 200
    assert res.json()["id"] == store_id
    assert res.json()["name"] == "SelfStore"




import json

def test_delete_self_store(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminseller3",
        "password": "adminpass",
        "email": "adminseller3@example.com",
        "phone_number": "09110000212"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminseller3",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    user_id = client.post("/user/create_user", json={
        "username": "seller_delete",
        "password": "delpass",
        "email": "seller_delete@example.com",
        "phone_number": "09119990003"
    }, headers=headers).json()["id"]
    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)

    region_id = client.post("/admin/region/add_region", json={"name": "RegDelSelf"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityDelSelf", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "SelfDeleteStore", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    seller_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "seller_delete",
        "password": "delpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    seller_headers = {"Authorization": f"Bearer {seller_token}", "Content-Type": "application/json"}

    res = client.request("DELETE", "/seller/store/delete_store", headers=seller_headers)
    assert res.status_code == 200

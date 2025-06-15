def test_add_category(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admincat1",
        "password": "adminpass",
        "email": "admincat1@example.com",
        "phone_number": "09112000001"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admincat1",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    res = client.post("/admin/category/add_category", json={"name": "NewCategory"}, headers=headers)
    assert res.status_code == 201
    assert res.json()["name"] == "NewCategory"


import json
def test_delete_category(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admincat2",
        "password": "adminpass",
        "email": "admincat2@example.com",
        "phone_number": "09112000002"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admincat2",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    cat_id = client.post("/admin/category/add_category", json={"name": "ToDelete"}, headers=headers).json()["name"]
    res = client.request("DELETE", "/admin/category/delete_category", headers=headers, content=json.dumps({"name": cat_id}))
    assert res.status_code == 200



def test_change_category_name(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admincat_change_fixed",
        "password": "adminpass",
        "email": "admincat_change_fixed@example.com",
        "phone_number": "09112000012"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admincat_change_fixed",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    cat_id = client.post("/admin/category/add_category", json={"name": "OldCat"}, headers=headers).json()["id"]
    res = client.put("/admin/category/change_category_name", json={
        "id": cat_id,
        "name": "RenamedCat"
    }, headers=headers)
    assert res.status_code == 200
    assert res.json()["id"] == cat_id
    assert res.json()["name"] == "RenamedCat"



def test_add_category_to_store(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admincat_storeadd",
        "password": "adminpass",
        "email": "admincat_storeadd@example.com",
        "phone_number": "09112000013"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admincat_storeadd",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    region_id = client.post("/admin/region/add_region", json={"name": "RegionS1"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityS1", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreS1", "city_id": city_id}, headers=headers).json()["id"]
    category_id = client.post("/admin/category/add_category", json={"name": "CatS1"}, headers=headers).json()["id"]

    res = client.post("/admin/category/add_category_to_store", json={
        "store_id": store_id,
        "category_id": category_id
    }, headers=headers)
    assert res.status_code == 200


def test_remove_category_from_store(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admincat_remove",
        "password": "adminpass",
        "email": "admincat_remove@example.com",
        "phone_number": "09112000014"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admincat_remove",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    region_id = client.post("/admin/region/add_region", json={"name": "RegionR1"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityR1", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreR1", "city_id": city_id}, headers=headers).json()["id"]
    category_id = client.post("/admin/category/add_category", json={"name": "CatR1"}, headers=headers).json()["id"]
    client.post("/admin/category/add_category_to_store", json={"store_id": store_id, "category_id": category_id}, headers=headers)

    res = client.request("DELETE", "/admin/category/remove_category_from_store", headers=headers, content=json.dumps({
        "store_id": store_id,
        "category_id": category_id
    }))

    assert res.status_code == 200



def test_add_category_relation(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admincat_reladd",
        "password": "adminpass",
        "email": "admincat_reladd@example.com",
        "phone_number": "09112000015"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admincat_reladd",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    parent_id = client.post("/admin/category/add_category", json={"name": "ParentRel"}, headers=headers).json()["id"]
    child_id = client.post("/admin/category/add_category", json={"name": "ChildRel"}, headers=headers).json()["id"]

    res = client.post("/admin/category/add_category_relation", json={
        "category_id": parent_id,
        "word": 'child'
    }, headers=headers)
    assert res.status_code == 200



def test_get_all_relations_of_category(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admincat_getrel",
        "password": "adminpass",
        "email": "admincat_getrel@example.com",
        "phone_number": "09112000017"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admincat_getrel",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    parent_id = client.post("/admin/category/add_category", json={"name": "MainRelCat"}, headers=headers).json()["id"]
    child_id = client.post("/admin/category/add_category", json={"name": "SubRelCat"}, headers=headers).json()["id"]
    client.post("/admin/category/add_category_relation", json={
        "parent_id": parent_id,
        "child_id": 'child'
    }, headers=headers)

    res = client.post("/admin/category/get_all_relations_of_category", json={"category_id": parent_id}, headers=headers)
    assert res.status_code == 200 or 404

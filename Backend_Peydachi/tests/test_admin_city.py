def test_add_city(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admincity_add",
        "password": "adminpass",
        "email": "admincity_add@example.com",
        "phone_number": "09110000001"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admincity_add",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    region_id = client.post("/admin/region/add_region", json={"name": "RegionAdd"}, headers=headers).json()["id"]
    res = client.post("/admin/city/add_city", json={"name": "AddCity", "region_id": region_id}, headers=headers)
    assert res.status_code == 201
    assert res.json()["name"] == "AddCity"


def test_update_city(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admincity_update",
        "password": "adminpass",
        "email": "admincity_update@example.com",
        "phone_number": "09110000002"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admincity_update",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    region_id = client.post("/admin/region/add_region", json={"name": "RegionUpdate"}, headers=headers).json()["id"]
    city = client.post("/admin/city/add_city", json={"name": "ToUpdate", "region_id": region_id}, headers=headers).json()
    res = client.put("/admin/city/update_city", json={"id": city["id"], "name": "UpdatedCity"}, headers=headers)
    assert res.status_code == 200
    assert res.json()["name"] == "UpdatedCity"



import pytest
import json

@pytest.mark.filterwarnings("ignore::DeprecationWarning")
def test_delete_city(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admincity_delete",
        "password": "adminpass",
        "email": "admincity_delete@example.com",
        "phone_number": "09110000003"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admincity_delete",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    region_id = client.post("/admin/region/add_region", json={"name": "RegionDelete"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "ToDelete", "region_id": region_id}, headers=headers).json()["id"]
    res = client.request("DELETE", "/admin/city/delete_city", headers=headers, content=json.dumps({"city_id": city_id}))
    assert res.status_code == 200

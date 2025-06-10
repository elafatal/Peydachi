def test_admin_add_region(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminregion3",
        "password": "adminpass",
        "email": "adminregion3@example.com",
        "phone_number": "09112223333"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminregion3",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]

    headers = {"Authorization": f"Bearer {token}"}

    response = client.post("/admin/region/add_region", json={"name": "East"}, headers=headers)
    assert response.status_code == 200
    assert response.json()["name"] == "East"


def test_update_region(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminregion11",
        "password": "adminpass",
        "email": "adminregion11@example.com",
        "phone_number": "09112223341"
    })

    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminregion11",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]

    headers = {"Authorization": f"Bearer {token}"}
    res = client.post("/admin/region/add_region", json={"name": "Gamma"}, headers=headers)
    region_id = res.json()["id"]

    response = client.put("/admin/region/update_region", json={"id": region_id, "name": "Omega"}, headers=headers)
    assert response.status_code == 200
    assert response.json()["name"] == "Omega"


    
import json
import pytest
@pytest.mark.filterwarnings("ignore::DeprecationWarning")
def test_delete_region(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminregiondelete",
        "password": "adminpass",
        "email": "adminregiondelete@example.com",
        "phone_number": "09112224444"
    })

    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminregiondelete",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    add_response = client.post("/admin/region/add_region", json={"name": "ToDelete"}, headers=headers)
    assert add_response.status_code == 200
    region_id = add_response.json()["id"]

    delete_response = client.request(
        method="DELETE",
        url="/admin/region/delete_region",
        headers=headers,
        data=json.dumps({"id": region_id})
    )
    assert delete_response.status_code == 200

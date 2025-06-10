def test_get_all_regions(client):
    create_admin_payload = {
        "username": "adminregion1",
        "password": "adminpassword123",
        "email": "adminregion1@example.com",
        "phone_number": "09112223331"
    }
    response = client.post("/super_admin/add_super_admin", json=create_admin_payload)
    assert response.status_code == 201

    login_payload = {
        "grant_type": "password",
        "username": "adminregion1",
        "password": "adminpassword123",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }
    response = client.post("/authentication/token", data=login_payload)
    assert response.status_code == 200
    token = response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    response = client.post("/admin/region/add_region", json={"name": "Central"}, headers=headers)
    assert response.status_code == 200 or response.status_code == 201

    response = client.get("/region/get_all_regions")
    assert response.status_code == 200
    regions = response.json()
    assert any(region["name"] == "Central" for region in regions)



def test_get_region_by_id(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "regionuser1",
        "password": "adminpass",
        "email": "regionuser1@example.com",
        "phone_number": "09112220001"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "regionuser1",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    add_response = client.post("/admin/region/add_region", json={"name": "NorthZone"}, headers=headers)
    assert add_response.status_code == 200
    region_id = add_response.json()["id"]

    get_response = client.post("/region/get_region_by_id", json={"id": region_id})
    assert get_response.status_code == 200
    data = get_response.json()
    assert data["id"] == region_id
    assert data["name"] == "NorthZone"




def test_search_region_by_name(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "regionuser3",
        "password": "adminpass",
        "email": "regionuser3@example.com",
        "phone_number": "09112220003"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "regionuser3",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    client.post("/admin/region/add_region", json={"name": "Southville"}, headers=headers)

    response = client.post("/region/search_region_by_name", json={"region_name": "South"})
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert any("Southville" in region["name"] for region in response.json())

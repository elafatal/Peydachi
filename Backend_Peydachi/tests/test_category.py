def test_search_category(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "catuser1",
        "password": "adminpass",
        "email": "catuser1@example.com",
        "phone_number": "09111000111"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "catuser1",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    client.post("/admin/category/add_category", json={"name": "Food"}, headers=headers)
    res = client.post("/category/search_category", json={"name": "Food"})
    assert res.status_code == 200
    assert any(cat["name"] == "Food" for cat in res.json())



def test_get_all_categories_of_store(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "catstoreadmin",
        "password": "adminpass",
        "email": "catstoreadmin@example.com",
        "phone_number": "09111111111"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "catstoreadmin",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    region_id = client.post("/admin/region/add_region", json={"name": "TestRegion"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "TestCity", "region_id": region_id}, headers=headers).json()["id"]

    store_data = {
        "name": "MyStore",
        "city_id": city_id,
        "description": "Test store",
        "contact_info": {"phone": "09121234567"},
        "location_latitude": "35.6892",
        "location_longitude": "51.3890"
    }
    store_id = client.post("/admin/store/create_store", json=store_data, headers=headers).json()["id"]

    client.post("/admin/category/add_category", json="Books", headers=headers)
    client.post("/admin/category/add_category_to_store", json={"store_id": store_id, "category_name": "Books"}, headers=headers)

    res = client.post("/category/get_all_categories_of_store", json={"store_id": store_id})
    assert res.status_code == 200



def test_get_all_categories(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admincat_all",
        "password": "adminpass",
        "email": "admincat_all@example.com",
        "phone_number": "09112000011"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admincat_all",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    client.post("/admin/category/add_category", json={"name": "CategoryOne"}, headers=headers)
    client.post("/admin/category/add_category", json={"name": "CategoryTwo"}, headers=headers)
    res = client.get("/admin/category/get_all_categories", headers=headers)
    assert res.status_code == 200
    assert isinstance(res.json(), list)
    assert any(cat["name"] == "CategoryOne" for cat in res.json())
    assert any(cat["name"] == "CategoryTwo" for cat in res.json())

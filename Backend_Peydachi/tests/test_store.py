def test_get_all_stores(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminstore_all",
        "password": "adminpass",
        "email": "adminstore_all@example.com",
        "phone_number": "09110000201"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminstore_all",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    region_id = client.post("/admin/region/add_region", json={"name": "RegAll"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityAll", "region_id": region_id}, headers=headers).json()["id"]

    client.post("/admin/store/create_store", json={"name": "StoreA", "city_id": city_id}, headers=headers)
    client.post("/admin/store/create_store", json={"name": "StoreB", "city_id": city_id}, headers=headers)

    res = client.get("/store/get_all_stores")
    assert res.status_code == 200
    assert isinstance(res.json(), list)
    assert any(store["name"] == "StoreA" for store in res.json())
    assert any(store["name"] == "StoreB" for store in res.json())



def test_search_store(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminstore_search",
        "password": "adminpass",
        "email": "adminstore_search@example.com",
        "phone_number": "09110000202"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminstore_search",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    region_id = client.post("/admin/region/add_region", json={"name": "RegSearch"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CitySearch", "region_id": region_id}, headers=headers).json()["id"]
    client.post("/admin/store/create_store", json={"name": "SearchedStore", "city_id": city_id}, headers=headers)

    res = client.post("/store/search_store", json={"name": "Searched"})
    assert res.status_code == 200
    assert any("SearchedStore" in store["name"] for store in res.json())


def test_get_store_by_id(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminstore_get",
        "password": "adminpass",
        "email": "adminstore_get@example.com",
        "phone_number": "09110000203"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminstore_get",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    region_id = client.post("/admin/region/add_region", json={"name": "RegGet"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityGet", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreToGet", "city_id": city_id}, headers=headers).json()["id"]

    res = client.post("/store/get_store_by_id", json={"store_id": store_id})
    assert res.status_code == 200
    assert res.json()["id"] == store_id
    assert res.json()["name"] == "StoreToGet"



def test_get_all_stores_of_city(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminstore_city",
        "password": "adminpass",
        "email": "adminstore_city@example.com",
        "phone_number": "09110000204"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminstore_city",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    region_id = client.post("/admin/region/add_region", json={"name": "RegCity"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityStore", "region_id": region_id}, headers=headers).json()["id"]

    client.post("/admin/store/create_store", json={"name": "CityStore1", "city_id": city_id}, headers=headers)
    client.post("/admin/store/create_store", json={"name": "CityStore2", "city_id": city_id}, headers=headers)

    res = client.post("/store/get_all_stores_of_city", json={"city_id": city_id})
    assert res.status_code == 200
    names = [s["name"] for s in res.json()]
    assert "CityStore1" in names
    assert "CityStore2" in names



def test_search_all_stores_of_city(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminstore_searchcity",
        "password": "adminpass",
        "email": "adminstore_searchcity@example.com",
        "phone_number": "09110000205"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminstore_searchcity",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    region_id = client.post("/admin/region/add_region", json={"name": "RegSearchCity"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CitySearchTarget", "region_id": region_id}, headers=headers).json()["id"]

    client.post("/admin/store/create_store", json={"name": "TargetShop", "city_id": city_id}, headers=headers)
    client.post("/admin/store/create_store", json={"name": "OtherShop", "city_id": city_id}, headers=headers)

    res = client.post("/store/search_all_stores_of_city", json={
        "city_id": city_id,
        "name": "Target"
    })
    assert res.status_code == 200
    assert any("TargetShop" in s["name"] for s in res.json())

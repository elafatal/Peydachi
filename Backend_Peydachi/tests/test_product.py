def test_get_product(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminproduct1",
        "password": "adminpass",
        "email": "adminproduct1@example.com",
        "phone_number": "09120000301"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminproduct1",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    user_id = client.post("/user/create_user", json={
        "username": "product_seller",
        "password": "sellerpass",
        "email": "product_seller@example.com",
        "phone_number": "09125557777"
    }, headers=headers).json()["id"]
    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)

    region_id = client.post("/admin/region/add_region", json={"name": "RegProd"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityProd", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "ProdStore", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    seller_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "product_seller",
        "password": "sellerpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    seller_headers = {"Authorization": f"Bearer {seller_token}"}

    product = client.post("/seller/product/add_product", data={
        "name": "TestProduct",
        "description": "for get_product",
        "quantity": 10
    }, headers=seller_headers).json()

    res = client.post("/product/get_product", json={"product_id": product["id"]})
    assert res.status_code == 200
    assert res.json()["name"] == "TestProduct"



def test_get_all_products(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminproduct2",
        "password": "adminpass",
        "email": "adminproduct2@example.com",
        "phone_number": "09120000302"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminproduct2",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    user_id = client.post("/user/create_user", json={
        "username": "allproductseller",
        "password": "sellerpass",
        "email": "allproductseller@example.com",
        "phone_number": "09124448888"
    }, headers=headers).json()["id"]
    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)

    region_id = client.post("/admin/region/add_region", json={"name": "RegAllProd"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityAllProd", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreAllProd", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    seller_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "allproductseller",
        "password": "sellerpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    seller_headers = {"Authorization": f"Bearer {seller_token}"}

    client.post("/seller/product/add_product", data={
        "name": "AllProduct1",
        "description": "sample",
        "quantity": 5
    }, headers=seller_headers)

    client.post("/seller/product/add_product", data={
        "name": "AllProduct2",
        "description": "sample",
        "quantity": 8
    }, headers=seller_headers)

    res = client.get("/product/get_all_products")
    assert res.status_code == 200
    names = [p["name"] for p in res.json()]
    assert "AllProduct1" in names
    assert "AllProduct2" in names



def test_get_all_products_of_store(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminproduct3",
        "password": "adminpass",
        "email": "adminproduct3@example.com",
        "phone_number": "09120000303"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminproduct3",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    user_id = client.post("/user/create_user", json={
        "username": "storeproductseller",
        "password": "sellerpass",
        "email": "storeproductseller@example.com",
        "phone_number": "09126668888"
    }, headers=headers).json()["id"]
    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)

    region_id = client.post("/admin/region/add_region", json={"name": "RegStoreProd"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CityStoreProd", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreProductList", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    seller_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "storeproductseller",
        "password": "sellerpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    seller_headers = {"Authorization": f"Bearer {seller_token}"}

    client.post("/seller/product/add_product", data={
        "name": "StoreProduct1",
        "description": "test store",
        "quantity": 10
    }, headers=seller_headers)

    client.post("/seller/product/add_product", data={
        "name": "StoreProduct2",
        "description": "test store",
        "quantity": 15
    }, headers=seller_headers)

    res = client.post("/product/get_all_products_of_store", json={"store_id": store_id})
    assert res.status_code == 200
    names = [p["name"] for p in res.json()]
    assert "StoreProduct1" in names
    assert "StoreProduct2" in names


def test_search_all_products(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminproduct5",
        "password": "adminpass",
        "email": "adminproduct5@example.com",
        "phone_number": "09120000305"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminproduct5",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    user_id = client.post("/user/create_user", json={
        "username": "search_seller",
        "password": "sellerpass",
        "email": "search_seller@example.com",
        "phone_number": "09123334444"
    }, headers=headers).json()["id"]
    client.put("/admin/store/promote_user_to_seller", json={"user_id": user_id}, headers=headers)

    region_id = client.post("/admin/region/add_region", json={"name": "RegSearchProd"}, headers=headers).json()["id"]
    city_id = client.post("/admin/city/add_city", json={"name": "CitySearchProd", "region_id": region_id}, headers=headers).json()["id"]
    store_id = client.post("/admin/store/create_store", json={"name": "StoreSearchProd", "city_id": city_id}, headers=headers).json()["id"]
    client.put("/admin/store/add_owner_to_store", json={"store_id": store_id, "user_id": user_id}, headers=headers)

    seller_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "search_seller",
        "password": "sellerpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    seller_headers = {"Authorization": f"Bearer {seller_token}"}

    client.post("/seller/product/add_product", data={
        "name": "Laptop Asus",
        "description": "searchable product",
        "quantity": 3
    }, headers=seller_headers)

    res = client.post("/product/search_all_products", json={"name": "Asus"})
    assert res.status_code == 200
    assert any("Asus" in p["name"] for p in res.json())

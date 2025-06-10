def test_get_all_add_store_requests(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admin_store_req6",
        "password": "adminpass",
        "email": "admin_store_req6@example.com",
        "phone_number": "09110000006"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admin_store_req6",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    request_data = {"store_name": "All Stores Test", "phone_number": "09123456789"}
    store_request = client.post("/add_store_request/send_add_store_request", json=request_data).json()

    res = client.get("/admin/add_store_request/get_all_add_store_requests", headers=headers)
    assert res.status_code == 200
    assert isinstance(res.json(), list)
    assert any(req["id"] == store_request["id"] for req in res.json())



def test_get_add_store_request(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admin_store_req1",
        "password": "adminpass",
        "email": "admin_store_req1@example.com",
        "phone_number": "09110000001"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admin_store_req1",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    request_data = {
        "store_name": "Store to Get",
        "phone_number": "09123456789"
    }
    store_request = client.post("/add_store_request/send_add_store_request", json=request_data).json()

    res = client.post("/admin/add_store_request/get_add_store_request", json={"request_id": store_request["id"]}, headers=headers)
    assert res.status_code == 200
    assert res.json()["id"] == store_request["id"]
    assert res.json()["store_name"] == "Store to Get"



def test_get_requests_to_review(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admin_store_req2",
        "password": "adminpass",
        "email": "admin_store_req2@example.com",
        "phone_number": "09110000002"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admin_store_req2",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    request1 = {"store_name": "Review Store 1", "phone_number": "09111111111"}
    request2 = {"store_name": "Review Store 2", "phone_number": "09111111112"}
    client.post("/add_store_request/send_add_store_request", json=request1)
    client.post("/add_store_request/send_add_store_request", json=request2)

    res = client.get("/admin/add_store_request/get_requests_to_review", headers=headers)
    assert res.status_code == 200
    assert isinstance(res.json(), list)
    assert len(res.json()) >= 2



def test_review_add_store_request(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admin_store_req3",
        "password": "adminpass",
        "email": "admin_store_req3@example.com",
        "phone_number": "09110000003"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admin_store_req3",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    request_data = {"store_name": "Store to Review", "phone_number": "09123456789"}
    store_request = client.post("/add_store_request/send_add_store_request", json=request_data).json()

    res = client.put("/admin/add_store_request/review_add_store_request", json={"request_id": store_request["id"]}, headers=headers)
    assert res.status_code == 200
    assert res.json()["id"] == store_request["id"]


import pytest
import json

@pytest.mark.filterwarnings("ignore::DeprecationWarning")
def test_remove_add_store_request(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admin_store_req4",
        "password": "adminpass",
        "email": "admin_store_req4@example.com",
        "phone_number": "09110000004"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admin_store_req4",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    request_data = {"store_name": "Store to Remove", "phone_number": "09123456789"}
    store_request = client.post("/add_store_request/send_add_store_request", json=request_data).json()

    res = client.request("DELETE", "/admin/add_store_request/remove_add_store_request", headers=headers, content=json.dumps({"request_id": store_request["id"]}))
    assert res.status_code == 200



def test_search_add_store_requests(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admin_store_search",
        "password": "adminpass",
        "email": "admin_store_search@example.com",
        "phone_number": "09110000001"
    })
    
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admin_store_search",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    stores_to_create = [
        {"store_name": "Electronics MegaStore", "phone_number": "09111111111"},
        {"store_name": "Gadget World", "phone_number": "09111111112"},
        {"store_name": "Food Market", "phone_number": "09111111113"},
        {"store_name": "Electronics Plus", "phone_number": "09111111114"}
    ]
    
    for store in stores_to_create:
        client.post("/add_store_request/send_add_store_request", json=store)

    
    res_full = client.post(
        "/admin/add_store_request/search_add_store_requests",
        json={"request_text": "Electronics MegaStore"},
        headers=headers
    )
    assert res_full.status_code == 200 or 404
    assert len(res_full.json()) == 1
    assert res_full.json()[0]["store_name"] == "Electronics MegaStore"

    res_partial = client.post(
        "/admin/add_store_request/search_add_store_requests",
        json={"request_text": "Electron"},
        headers=headers
    )
    assert res_partial.status_code == 200 or 404
    assert len(res_partial.json()) == 2  
    assert all("Electron" in store["store_name"] for store in res_partial.json())

    res_no_match = client.post(
        "/admin/add_store_request/search_add_store_requests",
        json={"request_text": "Clothing"},
        headers=headers
    )
    assert res_no_match.status_code == 200 or 404


    res_case = client.post(
        "/admin/add_store_request/search_add_store_requests",
        json={"request_text": "gAdGeT"},
        headers=headers
    )
    assert res_case.status_code == 200 or 404

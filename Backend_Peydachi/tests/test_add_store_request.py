def test_send_add_store_request(client):
    request_data = {
        "store_name": "Test Store",
        "phone_number": "09123456789",
        "region_id": None,
        "city_id": None,
        "description": "Test description"
    }

    res = client.post("/add_store_request/send_add_store_request", json=request_data)
    assert res.status_code == 201
    
    # Validate response matches AddStoreRequestDisplay schema
    response_data = res.json()
    assert "id" in response_data
    assert isinstance(response_data["id"], int)
    assert response_data["store_name"] == "Test Store"
    assert response_data["phone_number"] == "09123456789"
    assert response_data["region_id"] is None
    assert response_data["city_id"] is None
    assert response_data["description"] == "Test description"
    assert "date_added" in response_data

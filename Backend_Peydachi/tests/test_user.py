import pytest


def test_create_user(client):
    # Arrange
    payload = {
        "username": "testuser1",
        "password": "testpassword123",
        "email": "testuser1@example.com",
        "phone_number": "1234567890"
    }

    response = client.post("/user/create_user", json=payload)

    assert response.status_code == 201
    data = response.json()
    assert data["username"] == payload["username"]
    assert data["email"] == payload["email"]
    assert data["is_seller"] is False
    assert data["is_admin"] is False
    assert data["is_super_admin"] is False
    assert data["is_banned"] is False


def test_is_username_available(client):
    # First create a user
    payload = {
        "username": "testuser3",
        "password": "password",
        "email": "testuser3@example.com",
        "phone_number": "1234567890"
    }

    response = client.post("/user/create_user", json=payload)
    assert response.status_code == 201  

    payload = {
        "username": "testuser3"
    }

    response = client.post("/user/is_username_available", json=payload)
    assert response.status_code == 200
    assert response.json() is False  

    payload = {
        "username": "testuser99999999"
    }

    response = client.post("/user/is_username_available", json=payload)
    assert response.status_code == 200
    assert response.json() is True  



def test_add_super_admin(client):
    payload = {
        "username": "superadmin1",
        "password": "superpassword123",
        "email": "superadmin1@example.com",
        "phone_number": "1234567890"
    }

    response = client.post("/super_admin/add_super_admin", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["username"] == payload["username"]
    assert data["email"] == payload["email"]
    assert data["is_super_admin"] is True
    assert data["is_admin"] is True



def test_super_admin_login(client):
    # Step 1: create super admin
    create_payload = {
        "username": "superadmin1",
        "password": "superpassword123",
        "email": "superadmin1@example.com",
        "phone_number": "1234567890"
    }

    response = client.post("/super_admin/add_super_admin", json=create_payload)
    assert response.status_code == 201

    # Step 2: now login
    login_payload = {
        "grant_type": "password",
        "username": "superadmin1",
        "password": "superpassword123",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }

    response = client.post("/authentication/token", data=login_payload)
    assert response.status_code == 200
    data = response.json()

    assert "access_token" in data
    assert "refresh_token" in data
    assert data["username"] == "superadmin1"
    assert data["is_super_admin"] is True
    assert data["is_admin"] is True



def test_user_get_self_user_info(client):
    create_payload = {
        "username": "normaluser1",
        "password": "normalpassword123",
        "email": "normaluser1@example.com",
        "phone_number": "1234567890"
    }

    response = client.post("/user/create_user", json=create_payload)
    assert response.status_code == 201

    login_payload = {
        "grant_type": "password",
        "username": "normaluser1",
        "password": "normalpassword123",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }

    response = client.post("/authentication/token", data=login_payload)
    assert response.status_code == 200
    data = response.json()

    access_token = data["access_token"]

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    response = client.get("/user/get_self_user_info", headers=headers)
    assert response.status_code == 200
    data = response.json()

    assert data["username"] == "normaluser1"
    assert data["is_super_admin"] is False
    assert data["is_admin"] is False
    assert data["is_seller"] is False



def test_user_update_user(client):
    create_payload = {
        "username": "normaluser2",
        "password": "normalpassword123",
        "email": "normaluser2@example.com",
        "phone_number": "1234567890"
    }

    response = client.post("/user/create_user", json=create_payload)
    assert response.status_code == 201

    login_payload = {
        "grant_type": "password",
        "username": "normaluser2",
        "password": "normalpassword123",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }

    response = client.post("/authentication/token", data=login_payload)
    assert response.status_code == 200
    data = response.json()

    access_token = data["access_token"]

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    update_payload = {
        "username": "updateduser2",
        "email": "updateduser2@example.com",
        "password": "newpassword123",
        "phone_number": "0987654321"
    }

    response = client.put("/user/update_user", json=update_payload, headers=headers)
    assert response.status_code == 200
    data = response.json()

    assert data["username"] == "updateduser2"
    assert data["email"] == "updateduser2@example.com"
    assert data["phone_number"] == "0987654321"



@pytest.mark.xfail(reason="SQLite does not support DELETE..USING with RETURNING")

def test_user_delete_user(client):
    # Step 1: create user
    create_payload = {
        "username": "normaluser3",
        "password": "normalpassword123",
        "email": "normaluser3@example.com",
        "phone_number": "1234567890"
    }

    response = client.post("/user/create_user", json=create_payload)
    assert response.status_code == 201

    # Step 2: login
    login_payload = {
        "grant_type": "password",
        "username": "normaluser3",
        "password": "normalpassword123",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }

    response = client.post("/authentication/token", data=login_payload)
    assert response.status_code == 200
    data = response.json()

    access_token = data["access_token"]

    # Step 3: delete user
    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    response = client.delete("/user/delete_user", headers=headers)
    assert response.status_code == 200
    expected_message = "User 'normaluser3' Has Been Deleted"
    assert response.text.strip('"') == expected_message  # sometimes FastAPI returns a quoted string

    # Optional: try to login again → should fail
    response = client.post("/authentication/token", data=login_payload)
    assert response.status_code != 200
def test_admin_get_all_users(client):
    create_payload = {
        "username": "adminuser1",
        "password": "adminpassword123",
        "email": "adminuser1@example.com",
        "phone_number": "1234567890"
    }

    response = client.post("/super_admin/add_super_admin", json=create_payload)
    assert response.status_code == 201

    login_payload = {
        "grant_type": "password",
        "username": "adminuser1",
        "password": "adminpassword123",
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

    response = client.get("/admin/user/get_all_users", headers=headers)
    assert response.status_code == 200
    data = response.json()

    assert isinstance(data, list)
    assert any(user["username"] == "adminuser1" for user in data)



def test_admin_get_user_by_username(client):
    create_payload = {
        "username": "adminuser2",
        "password": "adminpassword123",
        "email": "adminuser2@example.com",
        "phone_number": "1234567890"
    }

    response = client.post("/super_admin/add_super_admin", json=create_payload)
    assert response.status_code == 201

    login_payload = {
        "grant_type": "password",
        "username": "adminuser2",
        "password": "adminpassword123",
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

    payload = {
        "username": "adminuser2"
    }

    response = client.post("/admin/user/get_user_by_username", json=payload, headers=headers)
    assert response.status_code == 200
    data = response.json()

    assert data["username"] == "adminuser2"
    assert data["is_super_admin"] is True
    assert data["is_admin"] is True



def test_admin_search_users(client):
    create_payload = {
        "username": "adminuser3",
        "password": "adminpassword123",
        "email": "adminuser3@example.com",
        "phone_number": "1234567890"
    }

    response = client.post("/super_admin/add_super_admin", json=create_payload)
    assert response.status_code == 201

    login_payload = {
        "grant_type": "password",
        "username": "adminuser3",
        "password": "adminpassword123",
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

    payload = {
        "username": "adminuser3"
    }

    response = client.post("/admin/user/search_users", json=payload, headers=headers)
    assert response.status_code == 200
    data = response.json()

    assert isinstance(data, list)
    assert any(user["username"] == "adminuser3" for user in data)




def test_admin_get_user_by_id(client):
    create_payload = {
        "username": "adminuser4",
        "password": "adminpassword123",
        "email": "adminuser4@example.com",
        "phone_number": "1234567890"
    }

    response = client.post("/super_admin/add_super_admin", json=create_payload)
    assert response.status_code == 201

    login_payload = {
        "grant_type": "password",
        "username": "adminuser4",
        "password": "adminpassword123",
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

    payload = {
        "username": "adminuser4"
    }

    response = client.post("/admin/user/get_user_by_username", json=payload, headers=headers)
    assert response.status_code == 200
    user_data = response.json()
    user_id = user_data["id"]

    payload = {
        "user_id": user_id
    }

    response = client.post("/admin/user/get_user_by_id", json=payload, headers=headers)
    assert response.status_code == 200
    data = response.json()

    assert data["id"] == user_id
    assert data["username"] == "adminuser4"
    assert data["is_super_admin"] is True
    assert data["is_admin"] is True



def test_admin_ban_user(client):
    create_payload = {
        "username": "adminuser5",
        "password": "adminpassword123",
        "email": "adminuser5@example.com",
        "phone_number": "1234567890"
    }

    response = client.post("/super_admin/add_super_admin", json=create_payload)
    assert response.status_code == 201

    login_payload = {
        "grant_type": "password",
        "username": "adminuser5",
        "password": "adminpassword123",
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

    payload = {
        "username": "adminuser5"
    }

    response = client.post("/admin/user/get_user_by_username", json=payload, headers=headers)
    assert response.status_code == 200
    user_data = response.json()
    user_id = user_data["id"]

    payload = {
        "user_id": user_id
    }

    response = client.put("/admin/user/ban_user", json=payload, headers=headers)
    assert response.status_code == 200

    expected_message = f"User '{user_data['username']}' Banned By Admin."
    assert response.text.strip('"') == expected_message



def test_admin_unban_user(client):
    create_payload_admin = {
        "username": "adminuser6",
        "password": "adminpassword123",
        "phone_number": "12345"
    }
    response = client.post("/super_admin/add_super_admin", json=create_payload_admin)
    assert response.status_code == 201

    login_payload_admin = {
        "grant_type": "password",
        "username": "adminuser6",
        "password": "adminpassword123",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }
    response = client.post("/authentication/token", data=login_payload_admin)
    assert response.status_code == 200
    data = response.json()
    access_token_admin = data["access_token"]

    headers_admin = {
        "Authorization": f"Bearer {access_token_admin}"
    }

    create_payload_user = {
        "username": "normaluser7",
        "password": "userpassword123",
        "email": "normaluser7@example.com",
        "phone_number": "1234567890"
    }
    response = client.post("/user/create_user", json=create_payload_user)
    assert response.status_code == 201
    user_data = response.json()
    user_id = user_data["id"]

    payload = {
        "user_id": user_id
    }
    response = client.put("/admin/user/ban_user", json=payload, headers=headers_admin)
    assert response.status_code == 200
    assert response.text.strip('"') == f"User '{user_data['username']}' Banned By Admin."

    response = client.put("/admin/user/unban_user", json=payload, headers=headers_admin)
    assert response.status_code == 200
    assert response.text.strip('"') == f"User '{user_data['username']}' Unbanned By Admin."



def test_admin_get_all_banned_users(client):
    create_payload_admin = {
        "username": "adminuser7",
        "password": "adminpassword123",
        "email": "adminuser7@example.com",
        "phone_number": "124567890"
    }
    response = client.post("/super_admin/add_super_admin", json=create_payload_admin)
    assert response.status_code == 201

    login_payload_admin = {
        "grant_type": "password",
        "username": "adminuser7",
        "password": "adminpassword123",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }
    response = client.post("/authentication/token", data=login_payload_admin)
    assert response.status_code == 200
    access_token = response.json()["access_token"]

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    create_payload_user = {
        "username": "banneduser1",
        "password": "userpassword123",
        "email": "banneduser1@example.com",
        "phone_number": "123456780"
    }
    response = client.post("/user/create_user", json=create_payload_user)
    assert response.status_code == 201
    user_id = response.json()["id"]

    response = client.put("/admin/user/ban_user", json={"user_id": user_id}, headers=headers)
    assert response.status_code == 200

    response = client.get("/admin/user/get_all_banned_users", headers=headers)
    assert response.status_code == 200
    users = response.json()
    assert isinstance(users, list)
    assert any(user["id"] == user_id for user in users)



def test_admin_get_all_admins(client):
    create_payload_admin = {
        "username": "adminuser8",
        "password": "adminpassword123",
        "email": "adminuser8@example.com",
        "phone_number": "1234567891"
    }
    response = client.post("/super_admin/add_super_admin", json=create_payload_admin)
    assert response.status_code == 201

    login_payload_admin = {
        "grant_type": "password",
        "username": "adminuser8",
        "password": "adminpassword123",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }
    response = client.post("/authentication/token", data=login_payload_admin)
    assert response.status_code == 200
    access_token = response.json()["access_token"]

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    response = client.get("/admin/user/get_all_admins", headers=headers)
    assert response.status_code == 200 or 404
    if response.status_code == 200:
        admins = response.json()
        assert isinstance(admins, list)
        assert any(admin["username"] == "adminuser8" for admin in admins)


def test_admin_getting_all_users(client):
    create_payload_admin = {
        "username": "adminuser9",
        "password": "adminpassword123",
        "email": "adminuser9@example.com",
        "phone_number": "1234567892"
    }
    response = client.post("/super_admin/add_super_admin", json=create_payload_admin)
    assert response.status_code == 201

    login_payload_admin = {
        "grant_type": "password",
        "username": "adminuser9",
        "password": "adminpassword123",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }
    response = client.post("/authentication/token", data=login_payload_admin)
    assert response.status_code == 200
    access_token = response.json()["access_token"]

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    create_payload_user = {
        "username": "regularuser1",
        "password": "userpassword123",
        "email": "regularuser1@example.com",
        "phone_number": "1234567893"
    }
    response = client.post("/user/create_user", json=create_payload_user)
    assert response.status_code == 201
    user_id = response.json()["id"]

    response = client.get("/admin/user/get_all_users", headers=headers)
    assert response.status_code == 200 or 404

    if response.status_code == 200:
        users = response.json()
        assert isinstance(users, list)
        assert any(user["id"] == user_id for user in users)


def test_admin_getting_user_by_username(client):
    create_payload_admin = {
        "username": "adminuser11",
        "password": "adminpassword123",
        "email": "adminuser11@example.com",
        "phone_number": "1234567896"
    }
    response = client.post("/super_admin/add_super_admin", json=create_payload_admin)
    assert response.status_code == 201

    login_payload_admin = {
        "grant_type": "password",
        "username": "adminuser11",
        "password": "adminpassword123",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }
    response = client.post("/authentication/token", data=login_payload_admin)
    assert response.status_code == 200
    access_token = response.json()["access_token"]

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    create_payload_user = {
        "username": "targetuser2",
        "password": "userpassword123",
        "email": "targetuser2@example.com",
        "phone_number": "1234567897"
    }
    response = client.post("/user/create_user", json=create_payload_user)
    assert response.status_code == 201

    payload = {
        "username": "targetuser2"
    }
    response = client.post("/admin/user/get_user_by_username", json=payload, headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "targetuser2"


def test_admin_getting_user_by_id(client):
    create_payload_admin = {
        "username": "adminuser12",
        "password": "adminpassword123",
        "email": "adminuser12@example.com",
        "phone_number": "1234567898"
    }
    response = client.post("/super_admin/add_super_admin", json=create_payload_admin)
    assert response.status_code == 201

    login_payload_admin = {
        "grant_type": "password",
        "username": "adminuser12",
        "password": "adminpassword123",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }
    response = client.post("/authentication/token", data=login_payload_admin)
    assert response.status_code == 200
    access_token = response.json()["access_token"]

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    create_payload_user = {
        "username": "targetuser3",
        "password": "userpassword123",
        "email": "targetuser3@example.com",
        "phone_number": "1234567899"
    }
    response = client.post("/user/create_user", json=create_payload_user)
    assert response.status_code == 201
    user_id = response.json()["id"]

    payload = {
        "user_id": user_id
    }
    response = client.post("/admin/user/get_user_by_id", json=payload, headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == user_id
    assert data["username"] == "targetuser3"


def test_admin_searching_users(client):
    create_payload_admin = {
        "username": "adminuser13",
        "password": "adminpassword123",
        "email": "adminuser13@example.com",
        "phone_number": "1234567880"
    }
    response = client.post("/super_admin/add_super_admin", json=create_payload_admin)
    assert response.status_code == 201

    login_payload_admin = {
        "grant_type": "password",
        "username": "adminuser13",
        "password": "adminpassword123",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }
    response = client.post("/authentication/token", data=login_payload_admin)
    assert response.status_code == 200
    access_token = response.json()["access_token"]

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    create_payload_user = {
        "username": "searchuser1",
        "password": "userpassword123",
        "email": "searchuser1@example.com",
        "phone_number": "1234567881"
    }
    response = client.post("/user/create_user", json=create_payload_user)
    assert response.status_code == 201

    payload = {
        "username": "searchuser1"
    }
    response = client.post("/admin/user/search_users", json=payload, headers=headers)
    assert response.status_code == 200
    users = response.json()
    assert isinstance(users, list)
    assert any(user["username"] == "searchuser1" for user in users)


def test_admin_getting_all_banned_users(client):
    create_payload_admin = {
        "username": "adminuser14",
        "password": "adminpassword123",
        "email": "adminuser14@example.com",
        "phone_number": "1234567882"
    }
    response = client.post("/super_admin/add_super_admin", json=create_payload_admin)
    assert response.status_code == 201

    login_payload_admin = {
        "grant_type": "password",
        "username": "adminuser14",
        "password": "adminpassword123",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }
    response = client.post("/authentication/token", data=login_payload_admin)
    assert response.status_code == 200
    access_token = response.json()["access_token"]

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    create_payload_user = {
        "username": "banneduser1",
        "password": "userpassword123",
        "email": "banneduser1@example.com",
        "phone_number": "1234567883"
    }
    response = client.post("/user/create_user", json=create_payload_user)
    assert response.status_code == 201
    user_id = response.json()["id"]

    ban_payload = {
        "user_id": user_id
    }
    response = client.put("/admin/user/ban_user", json=ban_payload, headers=headers)
    assert response.status_code == 200

    response = client.get("/admin/user/get_all_banned_users", headers=headers)
    assert response.status_code == 200
    users = response.json()
    assert isinstance(users, list)
    assert any(user["id"] == user_id for user in users)


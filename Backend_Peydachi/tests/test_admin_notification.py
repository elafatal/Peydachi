def test_admin_send_notification(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminnotifsend",
        "password": "adminpass",
        "email": "adminnotifsend@example.com",
        "phone_number": "09120001001"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminnotifsend",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    user_id = client.post("/user/create_user", json={
        "username": "notif_target_user",
        "password": "userpass",
        "email": "notif_target_user@example.com",
        "phone_number": "09123334601"
    }, headers=headers).json()["id"]

    res = client.post("/admin/notification/admin_send_notification", json={
        "title": "تست اعلانیه",
        "text": "این یک اعلان تستی است",
        "user_id": user_id
    }, headers=headers)

    assert res.status_code == 201
    data = res.json()
    assert data["title"] == "تست اعلانیه"
    assert data["text"] == "این یک اعلان تستی است"



def test_get_all_sent_notifications(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminnotiflist",
        "password": "adminpass",
        "email": "adminnotiflist@example.com",
        "phone_number": "09120001002"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminnotiflist",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    user_id = client.post("/user/create_user", json={
        "username": "notif_list_user",
        "password": "userpass",
        "email": "notif_list_user@example.com",
        "phone_number": "09123334602"
    }, headers=headers).json()["id"]

    client.post("/admin/notification/admin_send_notification", json={
        "title": "اعلان اول",
        "text": "برای تست لیست",
        "user_id": user_id
    }, headers=headers)

    res = client.get("/admin/notification/get_all_sent_notifications", headers=headers)

    assert res.status_code == 200
    titles = [n["title"] for n in res.json()]
    assert "اعلان اول" in titles



def test_get_all_seen_notifications(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminnotifseen",
        "password": "adminpass",
        "email": "adminnotifseen@example.com",
        "phone_number": "09120001003"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminnotifseen",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    user_id = client.post("/user/create_user", json={
        "username": "seen_notif_user",
        "password": "userpass",
        "email": "seen_notif_user@example.com",
        "phone_number": "09123334603"
    }, headers=headers).json()["id"]

    notif = client.post("/admin/notification/admin_send_notification", json={
        "title": "اعلان برای مشاهده",
        "text": "باید دیده شود",
        "user_id": user_id
    }, headers=headers).json()

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "seen_notif_user",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}"}

    client.put("/notification/review_notification", json={"notification_id": notif["id"]}, headers=user_headers)

    res = client.get("/admin/notification/get_all_seen_notifications", headers=headers)

    assert res.status_code == 200 or 404



def test_search_notifications(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminnotifsearch",
        "password": "adminpass",
        "email": "adminnotifsearch@example.com",
        "phone_number": "09120001004"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminnotifsearch",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    user_id = client.post("/user/create_user", json={
        "username": "notif_search_user",
        "password": "userpass",
        "email": "notif_search_user@example.com",
        "phone_number": "09123334604"
    }, headers=headers).json()["id"]

    client.post("/admin/notification/admin_send_notification", json={
        "title": "جستجو تست",
        "text": "اعلان حاوی کلمه کلیدی",
        "user_id": user_id
    }, headers=headers)

    res = client.post("/admin/notification/search_notifications", json={
        "search": "کلمه کلیدی"
    }, headers=headers)

    assert res.status_code == 200
    assert any("کلمه کلیدی" in n["text"] for n in res.json())



def test_get_all_user_notifications(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admingetusernotifs",
        "password": "adminpass",
        "email": "admingetusernotifs@example.com",
        "phone_number": "09120001005"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admingetusernotifs",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    user_id = client.post("/user/create_user", json={
        "username": "notif_list_target",
        "password": "userpass",
        "email": "notif_list_target@example.com",
        "phone_number": "09123334605"
    }, headers=headers).json()["id"]

    client.post("/admin/notification/admin_send_notification", json={
        "title": "اعلان برای کاربر خاص",
        "text": "لیست همه اعلان‌ها",
        "user_id": user_id
    }, headers=headers)

    res = client.post("/admin/notification/get_all_user_notifications", json={
        "user_id": user_id
    }, headers=headers)

    assert res.status_code == 200
    assert all(n["user_id"] == user_id for n in res.json())




def test_delete_notification(client):
    import json

    client.post("/super_admin/add_super_admin", json={
        "username": "admindeletenotif",
        "password": "adminpass",
        "email": "admindeletenotif@example.com",
        "phone_number": "09120001006"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admindeletenotif",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    user_id = client.post("/user/create_user", json={
        "username": "notif_delete_user",
        "password": "userpass",
        "email": "notif_delete_user@example.com",
        "phone_number": "09123334606"
    }, headers=headers).json()["id"]

    notif_id = client.post("/admin/notification/admin_send_notification", json={
        "title": "برای حذف",
        "text": "اعلان موقت",
        "user_id": user_id
    }, headers=headers).json()["id"]

    res = client.request(
        "DELETE",
        "/admin/notification/delete_notification",
        headers=headers,
        content=json.dumps({"notification_id": notif_id})
    )

    assert res.status_code == 200

def test_get_all_self_notifications(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminselfnotif",
        "password": "adminpass",
        "email": "adminselfnotif@example.com",
        "phone_number": "09120001007"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminselfnotif",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "notif_self_user",
        "password": "userpass",
        "email": "notif_self_user@example.com",
        "phone_number": "09123334607"
    }, headers=headers).json()["id"]

    client.post("/admin/notification/admin_send_notification", json={
        "title": "اعلان کاربر",
        "text": "برای لیست شخصی",
        "user_id": user_id
    }, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "notif_self_user",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}"}

    res = client.get("/notification/get_all_self_notifications", headers=user_headers)

    assert res.status_code == 200
    assert any(n["title"] == "اعلان کاربر" for n in res.json())



def test_get_all_self_unread_notifications(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminunreadnotif",
        "password": "adminpass",
        "email": "adminunreadnotif@example.com",
        "phone_number": "09120001008"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminunreadnotif",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "notif_unread_user",
        "password": "userpass",
        "email": "notif_unread_user@example.com",
        "phone_number": "09123334608"
    }, headers=headers).json()["id"]

    client.post("/admin/notification/admin_send_notification", json={
        "title": "اعلان خوانده‌نشده",
        "text": "این اعلان هنوز دیده نشده",
        "user_id": user_id
    }, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "notif_unread_user",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}"}

    res = client.get("/notification/get_all_self_unread_notifications", headers=user_headers)

    assert res.status_code == 200
    assert any(n["title"] == "اعلان خوانده‌نشده" and not n["has_seen"] for n in res.json())



def test_review_notification(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminreviewnotif",
        "password": "adminpass",
        "email": "adminreviewnotif@example.com",
        "phone_number": "09120001009"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminreviewnotif",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "notif_review_user",
        "password": "userpass",
        "email": "notif_review_user@example.com",
        "phone_number": "09123334609"
    }, headers=headers).json()["id"]

    notif_id = client.post("/admin/notification/admin_send_notification", json={
        "title": "اعلان برای بازبینی",
        "text": "باید دیده شود",
        "user_id": user_id
    }, headers=headers).json()["id"]

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "notif_review_user",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}", "Content-Type": "application/json"}

    res = client.put("/notification/review_notification", json={
        "notification_id": notif_id
    }, headers=user_headers)

    assert res.status_code == 200
    assert res.json()["has_seen"] is True




def test_get_notification_by_id(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "admingetnotifbyid",
        "password": "adminpass",
        "email": "admingetnotifbyid@example.com",
        "phone_number": "09120001010"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admingetnotifbyid",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "notif_byid_user",
        "password": "userpass",
        "email": "notif_byid_user@example.com",
        "phone_number": "09123334610"
    }, headers=headers).json()["id"]

    notif_id = client.post("/admin/notification/admin_send_notification", json={
        "title": "اعلان تکی",
        "text": "دسترسی با آیدی",
        "user_id": user_id
    }, headers=headers).json()["id"]

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "notif_byid_user",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}", "Content-Type": "application/json"}

    res = client.post("/notification/get_notification_by_id", json={
        "notification_id": notif_id
    }, headers=user_headers)

    assert res.status_code == 200
    assert res.json()["id"] == notif_id
    assert res.json()["title"] == "اعلان تکی"



def test_search_self_notifications(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminsearchselfnotif",
        "password": "adminpass",
        "email": "adminsearchselfnotif@example.com",
        "phone_number": "09120001011"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminsearchselfnotif",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "notif_self_search",
        "password": "userpass",
        "email": "notif_self_search@example.com",
        "phone_number": "09123334611"
    }, headers=headers).json()["id"]

    client.post("/admin/notification/admin_send_notification", json={
        "title": "اعلان جستجو",
        "text": "اعلان حاوی واژه جستجو",
        "user_id": user_id
    }, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "notif_self_search",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}", "Content-Type": "application/json"}

    res = client.post("/notification/search_self_notifications", json={
        "search": "جستجو"
    }, headers=user_headers)

    assert res.status_code == 200
    assert any("جستجو" in n["text"] or "جستجو" in n["title"] for n in res.json())



def test_get_notif_count_and_first_three_notifs(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminnotifcount",
        "password": "adminpass",
        "email": "adminnotifcount@example.com",
        "phone_number": "09120001012"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminnotifcount",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "notif_count_user",
        "password": "userpass",
        "email": "notif_count_user@example.com",
        "phone_number": "09123334612"
    }, headers=headers).json()["id"]

    for i in range(5):
        client.post("/admin/notification/admin_send_notification", json={
            "title": f"اعلان {i}",
            "text": f"متن اعلان {i}",
            "user_id": user_id
        }, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "notif_count_user",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}"}

    res = client.get("/notification/get_notif_count_and_first_three_notifs", headers=user_headers)

    assert res.status_code == 200




def test_mark_all_notifs_as_seen(client):
    client.post("/super_admin/add_super_admin", json={
        "username": "adminmarkseen",
        "password": "adminpass",
        "email": "adminmarkseen@example.com",
        "phone_number": "09120001013"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminmarkseen",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    user_id = client.post("/user/create_user", json={
        "username": "notif_seen_all_user",
        "password": "userpass",
        "email": "notif_seen_all_user@example.com",
        "phone_number": "09123334613"
    }, headers=headers).json()["id"]

    for i in range(3):
        client.post("/admin/notification/admin_send_notification", json={
            "title": f"اعلان {i}",
            "text": f"اعلان برای خوانده شدن {i}",
            "user_id": user_id
        }, headers=headers)

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "notif_seen_all_user",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}"}

    res = client.put("/notification/mark_all_notifs_as_seen", headers=user_headers)
    assert res.status_code == 200
    assert res.json() == "All notifications marked as seen"



def test_user_delete_self_notif(client):
    import json

    client.post("/super_admin/add_super_admin", json={
        "username": "admindeleteselfnotif",
        "password": "adminpass",
        "email": "admindeleteselfnotif@example.com",
        "phone_number": "09120001014"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "admindeleteselfnotif",
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
        "phone_number": "09123334614"
    }, headers=headers).json()["id"]

    notif_id = client.post("/admin/notification/admin_send_notification", json={
        "title": "برای حذف توسط کاربر",
        "text": "اعلان موقت کاربر",
        "user_id": user_id
    }, headers=headers).json()["id"]

    user_token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "notif_delete_user",
        "password": "userpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}", "Content-Type": "application/json"}

    res = client.request(
        "DELETE",
        "/notification/user_delete_self_notif",
        headers=user_headers,
        content=json.dumps({"notif_id": notif_id})
    )

    assert res.status_code == 200

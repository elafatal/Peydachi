def test_get_report(client):
    report = client.post("/report/send_report", json={
        "title": "گزارش برای دریافت",
        "text": "متن گزارش"
    }).json()

    client.post("/super_admin/add_super_admin", json={
        "username": "adminreport1",
        "password": "adminpass",
        "email": "adminreport1@example.com",
        "phone_number": "09112345601"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminreport1",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]

    headers = {"Authorization": f"Bearer {token}"}
    res = client.post("/admin/report/get_report", json={"report_id": report["id"]}, headers=headers)
    assert res.status_code == 200
    assert res.json()["id"] == report["id"]



def test_get_reports_to_review(client):
    client.post("/report/send_report", json={"title": "بررسی ۱", "text": "تست بررسی"})
    client.post("/report/send_report", json={"title": "بررسی ۲", "text": "تست بررسی"})

    client.post("/super_admin/add_super_admin", json={
        "username": "adminreport2",
        "password": "adminpass",
        "email": "adminreport2@example.com",
        "phone_number": "09112345602"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminreport2",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]

    headers = {"Authorization": f"Bearer {token}"}
    res = client.get("/admin/report/get_reports_to_review", headers=headers)
    assert res.status_code == 200
    assert all(not r["is_reviewed"] for r in res.json())



def test_review_report(client):
    report = client.post("/report/send_report", json={
        "title": "مرور گزارش",
        "text": "در حال بررسی"
    }).json()

    client.post("/super_admin/add_super_admin", json={
        "username": "adminreport3",
        "password": "adminpass",
        "email": "adminreport3@example.com",
        "phone_number": "09112345603"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminreport3",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    res = client.post("/admin/report/review_report", json={"report_id": report["id"]}, headers=headers)
    assert res.status_code == 200
    assert res.json()["is_reviewed"] is True


import json
def test_delete_report(client):
    report = client.post("/report/send_report", json={
        "title": "حذف گزارش",
        "text": "تست حذف"
    }).json()

    client.post("/super_admin/add_super_admin", json={
        "username": "adminreport4",
        "password": "adminpass",
        "email": "adminreport4@example.com",
        "phone_number": "09112345604"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminreport4",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    res = client.request("DELETE", "/admin/report/delete_report", headers=headers, content=json.dumps({"report_id": report["id"]}))
    assert res.status_code == 200



def test_get_all_reports(client):
    client.post("/report/send_report", json={
        "title": "اولین گزارش",
        "text": "متن تستی ۱"
    })
    client.post("/report/send_report", json={
        "title": "دومین گزارش",
        "text": "متن تستی ۲"
    })

    client.post("/super_admin/add_super_admin", json={
        "username": "adminreport5",
        "password": "adminpass",
        "email": "adminreport5@example.com",
        "phone_number": "09112345605"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminreport5",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    res = client.get("/admin/report/get_all_reports", headers=headers)
    assert res.status_code == 200
    assert isinstance(res.json(), list)
    assert len(res.json()) >= 2



def test_search_reports(client):
    client.post("/report/send_report", json={
        "title": "گزارش قابل جستجو",
        "text": "شکایت مربوط به محصول"
    })

    client.post("/super_admin/add_super_admin", json={
        "username": "adminreport6",
        "password": "adminpass",
        "email": "adminreport6@example.com",
        "phone_number": "09112345606"
    })
    token = client.post("/authentication/token", data={
        "grant_type": "password",
        "username": "adminreport6",
        "password": "adminpass",
        "scope": "",
        "client_id": "string",
        "client_secret": "string"
    }).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    res = client.post("/admin/report/search_reports", json={"report_text": "محصول"}, headers=headers)
    assert res.status_code == 200
    assert any("محصول" in r["text"] for r in res.json())

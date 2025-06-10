def test_send_report(client):
    res = client.post("/report/send_report", json={
        "title": "گزارش تست",
        "text": "این یک گزارش تستی است."
    })
    assert res.status_code == 201
    data = res.json()
    assert data["title"] == "گزارش تست"
    assert data["text"] == "این یک گزارش تستی است."
    assert data["is_reviewed"] is False




import requests

def main(message):
    print("preparing to send data to phone")
    if message == None:
        print("MESSAGE SENT TO SMS.PY IS EMPTY: ERROR")
        return

    message_str = " ".join(message)
    print("MESSAGE: ", message_str)

    service_plan_id = "55382b7d306b44b6999b8e4f03b7d8d2"
    url = "https://us.sms.api.sinch.com/xms/v1/" + service_plan_id + "/batches"

    payload = {
    "from": "447520652019",
    "to": [
        "+46700456563"
    ],
    "body": str(message)
    }

    headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer b6ef8ea766b14731b83a2ba70b3853ea"
    }

    response = requests.post(url, json=payload, headers=headers)

    data = response.json()
    print(data)
    print("data sent to phone")



import requests
import json

def main(message):
    print("preparing to send data to phone")
    if message == None:
        print("MESSAGE SENT TO SMS.PY IS EMPTY: ERROR")
        return

    message_str = "\n".join(message)
    print("MESSAGE: ", message_str)

    url = "https://graph.facebook.com/v12.0/me/messages?access_token=EAAMnY9HNHsIBAIJcCu9JqMO1GKLLXef21BEuVb2yx39LkIUHkj8Ae0ZCh4VALM4DmvXcnqqcuaXhwUWBFRLjZAVKTHuRDbQ5kHDP2Sp6lXmdQWBgUtUZB7ZBzxEWAlHT79DWlxAZCkmNU6qm4RrQSjQ9evyI0RwncFMJZB8Yf1jyzohc3FQK1i"

    #payload="{\n  \"recipient\":{\n    \"id\":\"4744759298919480\"\n  },\n  \"message\":{\n    \"text\":" + message_str + " \n  }\n}"
    payload_json={
        "recipient":{
            "id":"4744759298919480"
        },
        "message":{
            "text": message_str
        }
    }
    payload = json.dumps(payload_json)
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)
    print("data sent to phone")







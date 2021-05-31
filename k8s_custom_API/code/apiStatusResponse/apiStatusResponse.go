package apiStatusResponse

import (
	"bytes"
	"encoding/json"
	"net/http"
	"time"
)

func StatusResponseStatus(data string) {
	url := "http://192.168.1.247:3000/user/home/status"
	values := map[string]string{"servers": data}

	jsonValue, _ := json.Marshal(values)

	req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{
		Timeout: time.Second * 1,
	}
	client.Do(req)
}

func StatusResponseIp(data string) {
	url := "http://192.168.1.247:3000/user/home/ip"
	values := map[string]string{"ip": data}

	jsonValue, _ := json.Marshal(values)

	req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{
		Timeout: time.Second * 1,
	}
	client.Do(req)
}

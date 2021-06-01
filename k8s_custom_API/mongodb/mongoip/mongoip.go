package mongoip

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"time"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
)

type Endpoint struct {
	Subsets []struct {
		Addresses []struct {
			IP string `json:"ip"`
		} `json:"addresses"`
	} `json:"subsets"`
}

func Handler() {
	// declaring .kube/config

	// path, err := os.Getwd()
	// var kubeconfig string = filepath.Join(path, "..", "build", "kubeConfig", "config.yml")

	var kubeconfig string = filepath.Join(os.Getenv("HOME"), ".kube", "config.yml")

	// setting up config

	config, err := clientcmd.BuildConfigFromFlags("", kubeconfig)
	if err != nil {
		panic(err)
	}

	// Setting up client
	client, err := kubernetes.NewForConfig(config)
	if err != nil {
		panic(err)
	}
	eps, err := client.CoreV1().Endpoints("mongodb").List(context.TODO(), metav1.ListOptions{})
	if err != nil {
		panic(err.Error())
	}
	for _, d := range eps.Items {
		byteArray, err := json.MarshalIndent(d, "", "  ")
		if err != nil {
			fmt.Println(err)
		}
		var endpoint Endpoint

		json.Unmarshal([]byte(byteArray), &endpoint)

		monoipResopnse(endpoint.Subsets[0].Addresses[0].IP)
		fmt.Println(endpoint.Subsets[0].Addresses[0].IP)
	}
}

func monoipResopnse(data string) {
	url := "http://192.168.1.247:3000/mongoip"
	values := map[string]string{"value": data}

	jsonValue, _ := json.Marshal(values)

	req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{
		Timeout: time.Second * 1,
	}
	client.Do(req)
}

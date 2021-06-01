package mcdeployment

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	_ "reflect"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/apimachinery/pkg/runtime/serializer/yaml"
	"k8s.io/client-go/code/apiStatusResponse"
	"k8s.io/client-go/dynamic"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
)

var (
	//kubeconfig              string = filepath.Join(path, "..", "build", "kubeConfig", "config.yml")
	kubeconfig              = filepath.Join(os.Getenv("HOME"), ".kube", "config")
	deploymentDeploymentRes = schema.GroupVersionResource{Group: "apps", Version: "v1", Resource: "deployments"}
	serviceDeploymentRes    = schema.GroupVersionResource{Group: "", Version: "v1", Resource: "services"}
	namespace               = "mc-servers"
)

func McDeleteDeployment(mongoID string) {

	// setting up config
	config, err := clientcmd.BuildConfigFromFlags("", kubeconfig)
	if err != nil {
		panic(err)
	}

	// Setting up client

	client, err := dynamic.NewForConfig(config)
	if err != nil {
		panic(err)
	}

	// var
	var (
		// Declaring delete options
		deletePolicy  = metav1.DeletePropagationForeground
		deleteOptions = metav1.DeleteOptions{
			PropagationPolicy: &deletePolicy,
		}
	)
	// Delete Deployment
	println("Deleting deployment ", mongoID)
	client.Resource(deploymentDeploymentRes).Namespace(namespace).Delete(context.TODO(), mongoID, deleteOptions)
	println("Deployment ", mongoID, " Deleted")

	// // Make a Regex to say we only want letters
	// reg, err := regexp.Compile("[^a-zA-Z]+")
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// serviceName := reg.ReplaceAllString(mongoID, "a")

	// // Delete Service
	// println("Deleting service ", serviceName)
	// client.Resource(serviceDeploymentRes).Namespace(namespace).Delete(context.TODO(), serviceName, deleteOptions)
	// println("Service ", serviceName, " Deleted")
}

func McCreateDeployment(pvc string, deployment string, service string) {

	// setting up config

	config, err := clientcmd.BuildConfigFromFlags("", kubeconfig)
	if err != nil {
		panic(err)
	}

	// Setting up client

	client, err := dynamic.NewForConfig(config)
	if err != nil {
		panic(err)
	}

	// var
	var (

		//declaring GroupVersionKind
		pvcDeploymentRes        = schema.GroupVersionResource{Group: "", Version: "v1", Resource: "persistentvolumeclaims"}
		deploymentDeploymentRes = schema.GroupVersionResource{Group: "apps", Version: "v1", Resource: "deployments"}
		serviceDeploymentRes    = schema.GroupVersionResource{Group: "", Version: "v1", Resource: "services"}

		// importing yaml
		mcPvc        = pvc
		mcDeployment = deployment
		mcService    = service

		// creating unstructured.Unstructured
		mcPvcObj        = &unstructured.Unstructured{}
		mcDeploymentObj = &unstructured.Unstructured{}
		mcServiceObj    = &unstructured.Unstructured{}

		// Declaring Deployments

		mcPvcDeployment        = mcPvcObj
		mcDeploymentDeployment = mcDeploymentObj
		mcServiceDeployment    = mcServiceObj
	)

	// decode YAML into unstructured.Unstructured
	dec := yaml.NewDecodingSerializer(unstructured.UnstructuredJSONScheme)

	dec.Decode([]byte(mcPvc), nil, mcPvcObj)
	dec.Decode([]byte(mcDeployment), nil, mcDeploymentObj)
	dec.Decode([]byte(mcService), nil, mcServiceObj)

	// encode back to JSON
	enc := json.NewEncoder(os.Stdout)
	enc.SetIndent("", "    ")
	enc.Encode(mcPvcObj)
	enc.Encode(mcDeploymentObj)
	enc.Encode(mcServiceObj)

	// Create Deployment
	fmt.Println("Creating deployment PVC")
	client.Resource(pvcDeploymentRes).Namespace(namespace).Create(context.TODO(), mcPvcDeployment, metav1.CreateOptions{})
	fmt.Println("PersistentVolumeClaim created!")

	fmt.Println("Creating deployment Deployment")
	client.Resource(deploymentDeploymentRes).Namespace(namespace).Create(context.TODO(), mcDeploymentDeployment, metav1.CreateOptions{})
	fmt.Println("Deployment created!")

	fmt.Println("Creating deployment Service")
	client.Resource(serviceDeploymentRes).Namespace(namespace).Create(context.TODO(), mcServiceDeployment, metav1.CreateOptions{})
	fmt.Println("Service created!")
}

func Mcstatus(mongoID string) bool {

	// setting up config

	config, err := clientcmd.BuildConfigFromFlags("", kubeconfig)
	if err != nil {
		panic(err)
	}

	// Setting up client

	client, err := dynamic.NewForConfig(config)
	if err != nil {
		panic(err)
	}

	list, err := client.Resource(deploymentDeploymentRes).Namespace(namespace).List(context.TODO(), metav1.ListOptions{})
	if err != nil {
		panic(err)
	}

	var serverList []string
	// fmt.Println("status: ", reflect.TypeOf(list.Items))

	for _, d := range list.Items {
		_, found, err := unstructured.NestedInt64(d.Object, "spec", "replicas")
		if err != nil || !found {
			fmt.Printf("Replicas not found for deployment %s: error=%s", d.GetName(), err)
			continue
		}
		serverList = append(serverList, d.GetName())
		if d.GetName() == mongoID {
			return true
		}
	}
	if len(list.Items) == 0 {
		apiStatusResponse.StatusResponseStatus("No Servers")
	}
	fmt.Println("serverList: ", serverList)
	return false
}

type Endpoint struct {
	Metadata struct {
		Labels struct {
			App string `json:"app"`
		} `json:"labels"`
	} `json:"metadata"`
	Subsets []struct {
		Addresses []struct {
			IP string `json:"ip"`
		} `json:"addresses"`
	} `json:"subsets"`
}

func McEndpoints(mongoID string) {

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
	eps, err := client.CoreV1().Endpoints("default").List(context.TODO(), metav1.ListOptions{})
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

		fmt.Println("tesing value: ", d)

		if endpoint.Metadata.Labels.App == mongoID && len(endpoint.Subsets) != 0 {
			fmt.Println(endpoint.Subsets[0].Addresses[0].IP)
			apiStatusResponse.StatusResponseIp(endpoint.Subsets[0].Addresses[0].IP)
		}
	}
}

//kubectl proxy --port 8081 --address=192.168.3.122 --accept-hosts=^* &

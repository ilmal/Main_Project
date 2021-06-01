package main

import (
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"os"
	"path/filepath"

	minecraft "k8s.io/client-go/code/minecraft"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/apimachinery/pkg/runtime/serializer/yaml"
	"k8s.io/client-go/dynamic"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/client-go/util/homedir"
)

const dsManifest = `
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
`

func main() {

	//creating inportant files:---------------------------------------------------------------------------------------

	var kubeconfig *string
	if home := homedir.HomeDir(); home != "" {
		kubeconfig = flag.String("kubeconfig", filepath.Join(home, ".kube", "config.yml"), "(optional) absolute path to the kubeconfig file")
	} else {
		kubeconfig = flag.String("kubeconfig", "", "absolute path to the kubeconfig file")
	}
	flag.Parse()

	namespace := "default"

	config, err := clientcmd.BuildConfigFromFlags("", *kubeconfig)
	if err != nil {
		panic(err)
	}
	client, err := dynamic.NewForConfig(config)
	if err != nil {
		panic(err)
	}

	deploymentRes := schema.GroupVersionResource{Group: "apps", Version: "v1", Resource: "deployments"}

	//custome stuff:----------------------------------------------------------------------------------------------------

	obj := &unstructured.Unstructured{}

	// decode YAML into unstructured.Unstructured
	dec := yaml.NewDecodingSerializer(unstructured.UnstructuredJSONScheme)
	_, gvk, err := dec.Decode([]byte(minecraft.MinecraftYaml), nil, obj)

	print(err)

	// Get the common metadata, and show GVK
	fmt.Println(gvk.String())

	// encode back to JSON
	enc := json.NewEncoder(os.Stdout)
	enc.SetIndent("", "    ")
	enc.Encode(obj)

	deployment := obj

	// Create Deployment
	fmt.Println("Creating deployment...")
	result, err := client.Resource(deploymentRes).Namespace(namespace).Create(context.TODO(), deployment, metav1.CreateOptions{})
	if err != nil {
		panic(err)
	}
	fmt.Printf("Created deployment %q.\n", result.GetName())

}
---------------------------------------- mc deploymentcodeV1.0 ---------------------------------------------------------------------

package main

import (
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"os"
	"path/filepath"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/apimachinery/pkg/runtime/serializer/yaml"
	"k8s.io/client-go/code/minecraft"
	"k8s.io/client-go/dynamic"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/client-go/util/homedir"
)

func main() {

	// declaring .kube/config

	var kubeconfig *string
	if home := homedir.HomeDir(); home != "" {
		kubeconfig = flag.String("kubeconfig", filepath.Join(home, ".kube", "config.yml"), "(optional) absolute path to the kubeconfig file")
	} else {
		kubeconfig = flag.String("kubeconfig", "", "absolute path to the kubeconfig file")
	}
	flag.Parse()

	//setting up config

	config, err := clientcmd.BuildConfigFromFlags("", *kubeconfig)
	if err != nil {
		panic(err)
	}
	client, err := dynamic.NewForConfig(config)
	if err != nil {
		panic(err)
	}

	//declaring GroupVersionKind

	pvcDeploymentRes := schema.GroupVersionResource{Group: "", Version: "v1", Resource: "persistentvolumeclaims"}
	deploymentDeploymentRes := schema.GroupVersionResource{Group: "apps", Version: "v1", Resource: "deployments"}
	serviceDeploymentRes := schema.GroupVersionResource{Group: "", Version: "v1", Resource: "services"}

	// var
	var (
		// declairing namespace

		namespace = "default"

		// importing yaml
		mcPvc        = minecraft.MinecraftPVC
		mcDeployment = minecraft.MinecraftDeployment
		mcService    = minecraft.MinecraftService

		// creating unstructured.Unstructured
		mcPvcObj        = &unstructured.Unstructured{}
		mcDeploymentObj = &unstructured.Unstructured{}
		mcServiceObj    = &unstructured.Unstructured{}
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

	mcPvcDeployment := mcPvcObj
	mcDeploymentDeployment := mcDeploymentObj
	mcServiceDeployment := mcServiceObj

	// Create Deployment
	fmt.Println("Creating deployment PVC")
	client.Resource(pvcDeploymentRes).Namespace(namespace).Create(context.TODO(), mcPvcDeployment, metav1.CreateOptions{})
	fmt.Println("Deployment created!")

	fmt.Println("Creating deployment Deployment")
	client.Resource(deploymentDeploymentRes).Namespace(namespace).Create(context.TODO(), mcDeploymentDeployment, metav1.CreateOptions{})
	fmt.Println("Deployment created!")

	fmt.Println("Creating deployment Service")
	client.Resource(serviceDeploymentRes).Namespace(namespace).Create(context.TODO(), mcServiceDeployment, metav1.CreateOptions{})
	fmt.Println("Deployment created!")
}
-----------------------------------------------------------------mc Delete V1.0------------------------------------------------------------------------
package main

import (
	"context"
	"flag"
	"path/filepath"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/client-go/dynamic"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/client-go/util/homedir"
)

func main() {

	// declaring .kube/config

	var kubeconfig *string
	if home := homedir.HomeDir(); home != "" {
		kubeconfig = flag.String("kubeconfig", filepath.Join(home, ".kube", "config.yml"), "(optional) absolute path to the kubeconfig file")
	} else {
		kubeconfig = flag.String("kubeconfig", "", "absolute path to the kubeconfig file")
	}
	flag.Parse()

	//setting up config

	config, err := clientcmd.BuildConfigFromFlags("", *kubeconfig)
	if err != nil {
		panic(err)
	}
	client, err := dynamic.NewForConfig(config)
	if err != nil {
		panic(err)
	}

	// var
	var (
		// declairing namespace

		namespace = "default"

		//declaring GroupVersionKind

		deploymentDeploymentRes = schema.GroupVersionResource{Group: "apps", Version: "v1", Resource: "deployments"}

		// Declaring delete options

		deletePolicy  = metav1.DeletePropagationForeground
		deleteOptions = metav1.DeleteOptions{
			PropagationPolicy: &deletePolicy,
		}
	)
	// Delete Deployment
	println("Deleting deployment mc")
	client.Resource(deploymentDeploymentRes).Namespace(namespace).Delete(context.TODO(), "mc", deleteOptions)
	println("Deployment mc Deleted")
}
---------------------------------------------------------mc Deployment 1.0---------------------------------------------------------------------------

package mcdeployment

import (
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"os"
	"path/filepath"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/apimachinery/pkg/runtime/serializer/yaml"
	"k8s.io/client-go/code/minecraft"
	"k8s.io/client-go/dynamic"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/client-go/util/homedir"
)

func McDeleteDeployment() {

	// declaring .kube/config

	var kubeconfig *string
	if home := homedir.HomeDir(); home != "" {
		kubeconfig = flag.String("kubeconfig", filepath.Join(home, ".kube", "config.yml"), "(optional) absolute path to the kubeconfig file")
	} else {
		kubeconfig = flag.String("kubeconfig", "", "absolute path to the kubeconfig file")
	}
	flag.Parse()

	// setting up config

	config, err := clientcmd.BuildConfigFromFlags("", *kubeconfig)
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

		// declairing namespace

		namespace = "default"

		//declaring GroupVersionKind

		deploymentDeploymentRes = schema.GroupVersionResource{Group: "apps", Version: "v1", Resource: "deployments"}

		// Declaring delete options

		deletePolicy  = metav1.DeletePropagationForeground
		deleteOptions = metav1.DeleteOptions{
			PropagationPolicy: &deletePolicy,
		}
	)
	// Delete Deployment
	println("Deleting deployment mc")
	client.Resource(deploymentDeploymentRes).Namespace(namespace).Delete(context.TODO(), "mc", deleteOptions)
	println("Deployment mc Deleted")
}

func McCreateDeployment() {

	// declaring .kube/config

	var kubeconfig *string
	if home := homedir.HomeDir(); home != "" {
		kubeconfig = flag.String("kubeconfig", filepath.Join(home, ".kube", "config.yml"), "(optional) absolute path to the kubeconfig file")
	} else {
		kubeconfig = flag.String("kubeconfig", "", "absolute path to the kubeconfig file")
	}
	flag.Parse()

	// setting up config

	config, err := clientcmd.BuildConfigFromFlags("", *kubeconfig)
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

		// declairing namespace
		namespace = "default"

		//declaring GroupVersionKind
		pvcDeploymentRes        = schema.GroupVersionResource{Group: "", Version: "v1", Resource: "persistentvolumeclaims"}
		deploymentDeploymentRes = schema.GroupVersionResource{Group: "apps", Version: "v1", Resource: "deployments"}
		serviceDeploymentRes    = schema.GroupVersionResource{Group: "", Version: "v1", Resource: "services"}

		// importing yaml
		mcPvc        = minecraft.MinecraftPVC
		mcDeployment = minecraft.MinecraftDeployment
		mcService    = minecraft.MinecraftService

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

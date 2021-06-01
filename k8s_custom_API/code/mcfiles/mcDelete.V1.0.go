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

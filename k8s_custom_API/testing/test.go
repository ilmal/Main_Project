package main

import (
    metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)
func main() {
    var ns, label, field string
    flag.StringVar(&ns, "namespace", "", "namespace")
    flag.StringVar(&label, "l", "", "Label selector")
    flag.StringVar(&field, "f", "", "Field selector")

    api := clientset.CoreV1()
    // setup list options
    listOptions := metav1.ListOptions{
        LabelSelector: label,
        FieldSelector: field,
    }
    pvcs, err := api.PersistentVolumeClaims(ns).List(listOptions)
    if err != nil {
        log.Fatal(err)
    }
    printPVCs(pvcs)
}

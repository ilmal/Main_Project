package api

import (
	"fmt"
	"net/http"

	"k8s.io/client-go/code/mcdeployment"
	mongo "k8s.io/client-go/mongodb/mcfrommongodb"
	"k8s.io/client-go/mongodb/mongoip"
)

// func for handling the http req
func McServer() {
	http.HandleFunc("/mc", mcHandler)
	// http.HandleFunc("/mongoip", mongoipHandler)
	// http.HandleFunc("/status", statusHandler)
	// http.HandleFunc("/endpoint", endpointHandler)
	// http.HandleFunc("/", testHandler)

	println("Starting server on port: 4000")
	if err := http.ListenAndServe(":4000", nil); err != nil {
		println("err with http.ListenAndServe: ", err)
	}
}

// func for handling "minecraftCommand = create"
func mcHandler(w http.ResponseWriter, r *http.Request) {
	println("mcreq")

	println(r)

	// getting data from mongo controller
	minecraftCommand := r.FormValue("minecraftCommand")
	mongoID := r.FormValue("mongoID")

	// sending data to monego controller
	mongo.McFromMongoDB(minecraftCommand, mongoID)

	w.Write([]byte("OK"))
}

func mongoipHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("mongoipreq")
	mongoip.Handler()
}

func statusHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("statusHandler")

	mongoID := r.FormValue("mongoID")

	// fmt.Println("15432: ", mcdeployment.Mcstatus(mongoID))
	if mcdeployment.Mcstatus(mongoID) {
		w.Write([]byte("true"))
	} else {
		w.Write([]byte("false"))
	}
}

func endpointHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("endpointHandler")

	mongoID := r.FormValue("mongoID")

	mcdeployment.McEndpoints(mongoID)
}

func testHandler(w http.ResponseWriter, r *http.Request) {
	println("req success")
}

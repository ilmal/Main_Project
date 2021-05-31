package mcfrommongodb

import (
	"context"
	"log"
	"time"

	"k8s.io/client-go/code/mongoconnect"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MinecraftConfiguration struct {
	Pvc        string
	Deployment string
	Service    string
}

// func for getting data from mongo db
func McFromMongoDB(minecraftCommand string, mongoID string) {

	//creating client
	client, err := mongo.NewClient(options.Client().
		ApplyURI("mongodb://nils:pass123@192.168.3.122:31007/?authSource=admin&appname=MongoDB&connect=direct&readPreference=primary"))

	// creating context
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)

	// printing out from collections
	minecraftConfig := client.Database("minecraftConfig")
	configschemas := minecraftConfig.Collection("configschemas")

	// declaring result as minecraftConfiguration struct
	var result MinecraftConfiguration

	// Finding the document with filter for objectID and decode into result
	err = configschemas.FindOne(ctx, bson.M{"id": mongoID}).Decode(&result)
	if err != nil {
		log.Fatal(err)
	}
	// redefining variables
	var (
		pvc        = result.Pvc
		deployment = result.Deployment
		service    = result.Service
	)
	//sending variables to api
	mongoconnect.McDeploymentResult(minecraftCommand, pvc, deployment, service, mongoID)
}

package mongoconnect

import (
	"k8s.io/client-go/code/mcdeployment"
)

func McDeploymentResult(minecraftCommand string, pvc string, deployment string, service string, mongoID string) {

	// handling minecraftCommand
	switch minecraftCommand {
	case "create":
		mcdeployment.McCreateDeployment(pvc, deployment, service)
	case "delete":
		mcdeployment.McDeleteDeployment(mongoID)
	case "restart":
		mcDeployment.McRestartDeployment(mongoID, pvc, deployment, service)
	case "status":
		mcdeployment.Mcstatus(mongoID)
	case "ipReq":
		mcdeployment.McEndpoints(mongoID)
	default:
		println("wrong values")
	}
}

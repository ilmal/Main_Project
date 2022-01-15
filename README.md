# PRIVATE

**This is cooliboi private project!**


# NOTATIONS

## HARWARE TODOS

- The olmanode failing server: Need to change EFI/BOOT/grubx64.efi to windows "clone" (https://ubuntuforums.org/showthread.php?t=2243715). 
- Current state is to try and change the bootloader floppy drives EFI settings and hope the server EFI clones the floppy EFI. 


## CLUSTER CONFIG

### MONGODB

- Due to mongo v 5.0+ not supporting older CPUs, the mongo used is downgraded to mongo 4.4.6, see issue for further reading (https://github.com/docker-library/mongo/issues/485)

#### MONGO CREATE NEW USER

```
use admin

db.createUser(
{
    user: "nils",
    pwd: "pass123",
    roles: [ "root" ]
})
```

### K8S OFFICIAL API REFRENCES

https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.19/#-strong-write-operations-deployment-v1-apps-strong-

### TAINTS AND TOLERATIONS

- worker nodes = none
- gameServer nodes = gameServer=True:NoExecute

command for nodes:
```
kubectl taint nodes <NODE> gameServer=True:NoExecute
```

config for pods:

```
tolerations:
- key: "gameServer"
  value: "True"
  effect: "NoExecute"
```

## ERR

- if network err, check if container connection to 8.8.8.8, if case, probably coreDNS (DNS server, ###NOTE coreDNS uses host /etc/resolvd.conf as upstream config), else, check flannel configuation, try restart. 

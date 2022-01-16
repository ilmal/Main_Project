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

### TAINTS AND TOLERATIONS / NODE SELECTOR

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
```
nodeSelector:
    nameServer: "True"
```


## ERR

- if network err, check if container connection to 8.8.8.8, if case, probably coreDNS (DNS server, ###NOTE coreDNS uses host /etc/resolvd.conf as upstream config), else, check flannel configuation, try restart. 





# GENERAL WISDOM

## DOCKER

#### DOCKER BUIDL NEW IMAGE

1. Create repo at docker hub
2. build ant test image locally: 
```
docker build . -t ilmal/<REPO_NAME>:<TAG_NAME>

docker run -d -p <OUTSIDE_PORT>:<INSIDE_PORT> <IMAGE_ID>
```
3. push local image to cloud:
```
docker push ilmal/<REPO_NAME>:<TAG_NAME>
```

#### DOCKER PYTHON TEMPLATE

```
FROM python:3.9
EXPOSE <PORT>
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .
CMD [ "python3", "app.py" ]
```


## K8S

#### CREATE NEW NAME_SPACE

*can't use "_"*

```
kubectl create namespace <namespace name>

```

#### K8S DEPLOYMENT BOILERPLATE

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment # can't use "_"
  namespace: <NAME_SPACE> # can't use "_"
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
```






package minecraft

const MinecraftPVC = `
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: minecraft-pvc-001
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 7Gi
  storageClassName: rook-minecraft

`
const MinecraftDeployment = `

apiVersion: apps/v1
kind: Deployment
metadata:
  name: mc
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mc
  template:
    metadata:
      labels:
        app: mc
    spec:
      volumes:
        - name: minecraft-pv-storage
          persistentVolumeClaim:
             claimName: minecraft-pvc-001
      containers:
      - image: itzg/minecraft-server
        name: minecraft-server
        env:
        - name: TYPE
          value: "VANILLA"
        - name: EULA
          value: "TRUE"
        ports:
        - containerPort: 25565
          name: minecraft
          protocol: TCP
        volumeMounts:
          - mountPath: "/data"
            name: minecraft-pv-storage

`
const MinecraftService = `

apiVersion: v1
kind: Service
metadata:
  name: minecraft
  labels:
    app: mc
spec:
  selector:
    app: mc
  type: NodePort
  ports:
    port: 25565
    targetPort: 25565
    protocol: TCP
    
`

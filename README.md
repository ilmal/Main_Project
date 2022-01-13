# PRIVATE

** This is cooliboi private project! **


# NOTATIONS

## CLUSTER CONFIG

### TAINTS AND TOLERATIONS

- worker nodes = none
- gameServer nodes = gameServer=True:NoExecute

config for pods:
```
tolerations:
- key: "gameServer"
  value: "True"
  effect: "NoExecute"
```

## ERR

- if network err, check if container connection to 8.8.8.8, if case, probably coreDNS (DNS server, ###NOTE coreDNS uses host /etc/resolvd.conf as upstream config), else, check flannel configuation, try restart. 

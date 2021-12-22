import os

output = os.popen("ssh nils@192.168.3.38 ls /home/nils").read()
arr = output.split("\n")

print(output)
print(arr)
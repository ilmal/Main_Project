#!/usr/bin/env python3

import os

file_to_edit = "package.json"

os.system("echo opening file")
fin = open(file_to_edit, "rt")

os.system("echo changing file")
data = fin.read().replace('"proxy": "http://192.168.1.247:31001/api"', '"proxy": "http://192.168.3.122:31001/api"')

fin.close()

fin = open(file_to_edit, "wt")

os.system("echo file edit and save complete")
fin.write(data)

print("echo " + fin.read())

fin.close()

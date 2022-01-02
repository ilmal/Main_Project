#!/usr/bin/env python3

import os

# Edit for the package.json file to change the backend proxy

file_to_edit = "package.json"

os.system("echo opening file")
fin = open(file_to_edit, "rt")

os.system("echo changing file")
data = fin.read().replace('"proxy": "http://192.168.1.247:31001/api"',
                          '"proxy": "http://192.168.3.122:31001/api"')

fin.close()

fin = open(file_to_edit, "wt")

os.system("echo file edit and save complete")
fin.write(data)

fin.close()

fin = open(file_to_edit, "rt")

print(fin.read())

fin.close()

# edit the stripe key from dev to live

file_to_edit = "src/pages/serverCreate/minecraft/minecraft.jsx"

os.system("echo opening file")
fin = open(file_to_edit, "rt")

os.system("echo changing file")
data = fin.read().replace('pk_test_51JCk7wGWd5hOwkfP4Q7UpN498uJW5oa2q7vb97viqghzRSpqilFLqtCB161iX4LOg68mkwqwHaptGyl0rgaB5NSf0080vAPRe9',
                          'pk_live_51JCk7wGWd5hOwkfPYzlWnuidk0JSsRDhJ0UaTVcsFUAHgd1dRA1hfi3bTpH8Asm46QNfqiS0RsLvVEHYcJqr7m1a00jCQT904z')

fin.close()

fin = open(file_to_edit, "wt")

os.system("echo file edit and save complete")
fin.write(data)

fin.close()

fin = open(file_to_edit, "rt")

print(fin.read())

fin.close()

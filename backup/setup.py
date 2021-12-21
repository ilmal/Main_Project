import os
import backup
import sys

path = None


def reqFileFound(path):
    print("FILE FOUND: ")
    print("Installing packages")
    os.system("pip install -r requirements.txt")
    print("Package install complete, executing code!")
    backup.main(path)


# check if more than one argument is passed at startup
if len(sys.argv) > 2:
    print("More than one argument detected, please make sure to only add one variable at the startup")
    sys.exit(1)
if sys.argv[1].split("=")[0] == "PATH":
    path = sys.argv[1].split("=")[1]


files = os.listdir(".")

for file in files:
    if file == "requirements.txt":
        reqFileFound(path)
        continue

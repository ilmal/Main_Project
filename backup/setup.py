import os
import backup

files = os.listdir(".")


def reqFileFound():
    print("FILE FOUND: ")
    print("Installing packages")
    os.system("pip install -r requirements.txt")
    print("Package install complete, executing code!")


for file in files:
    if file == "requirements.txt":
        reqFileFound()
        continue
    print("not found")

import os
import sys

target_path = None
destination_path = None


def reqFileFound(target_path, destination_path):
    print("FILE FOUND: ")
    print("Installing packages")
    os.system("pip install -r requirements.txt")
    print("Package install complete, executing code!")
    import backup # need import here so that packages are installed before called
    backup.main(target_path, destination_path)


# check that the right amount of arguments is passed at startup
maxArg = 2
if len(sys.argv) > maxArg + 1:  # plus one for the [0] arg is the base command
    print("More than one argument detected, please make sure to only add ",
          maxArg, " variable at the startup")
    sys.exit(1)

for arg in sys.argv:
    if arg.split("=")[0] == "TARGET_PATH":
        target_path = arg.split("=")[1]
    if arg.split("=")[0] == "DESTINATION_PATH":
        destination_path = arg.split("=")[1]

files = os.listdir(".")

for file in files:
    if file == "requirements.txt":
        reqFileFound(target_path, destination_path)
        continue

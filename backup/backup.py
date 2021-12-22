import time
import schedule
import shutil
import zipfile
import os

target_folder = "test_folder"
output_name = "test_folder.zip"


def centralizeServerFiles(baseFolder):
    print("bacseFolder: ", baseFolder)
    print("hello")  # ADD SEARCH FOR "mc-servers" AND CENTRALIZE FILES


def main(baseFolder):
    if(baseFolder == None):
        baseFolder = "/mnt/k8s-storage/kubedata"

    schedule.every(1).seconds.do(centralizeServerFiles, baseFolder)

    while 1:
        schedule.run_pending()
        time.sleep(1)

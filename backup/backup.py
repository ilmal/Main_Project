import time
import schedule
import shutil
from zipfile import ZipFile
import os
from datetime import datetime
import sms

target_folder = "/mnt/k8s_storage/kubedata/"
destination_folder = "/home/nils/backup-k8s/"

mongo_pod_name = "mongo-0"

<<<<<<< HEAD
zipfile_output_name = "k8s-backupdata-" + datetime.now().strftime("%Y-%m-%d_%H_%M_%S")
=======
zipfile_output_name = "k8s-backupdata-" + datetime.now().strftime("%Y-%m-%d_%H_%M_%S") + ".zip"
>>>>>>> 9a89074cf83d7b4dbd7cc4dce8444357a9e14dd0

list_of_nodes = [
    "192.168.3.38",
    "192.168.3.222",
    "192.168.3.229",
    "192.168.3.37"
]

def checkIfFileClear(df_setup):
    # check if destination is clear
    print("cheking if destination folder is clear")
    os.system("mkdir " + df_setup)
    if(len(os.listdir(df_setup)) > 0):
        print("destination folder not clear, deleting files")
        shutil.rmtree(df_setup)

def centralizeServerFiles(tf_setup, df_setup):
    print("target_folder: ", tf_setup)
    print("destination_folder: ", df_setup)

    for file in os.listdir(tf_setup):
        if file.startswith("mc-servers"):
            shutil.copytree(tf_setup + file, df_setup + "server-files/" + file)
            print("file " + file + " copied")

def getMongoDump(mongo_pod_name, df_setup):
    print("uploading file to container")
    os.system("kubectl cp -n mongo ./container_script.sh " + mongo_pod_name + ":/")
    print("file uploaded")
    os.system("kubectl exec -it " + mongo_pod_name + " -- bash container_script.sh")
    print("script executed")
    os.system("kubectl cp " + mongo_pod_name + ":/dump " + df_setup + "/mongo-files")
    print("dump file copied to destination folder")

def compressToZip(df_setup, zipfile_output_name):
    print("writing zip file")
    # print("creating zip file: " + zipfile_output_name)
    shutil.make_archive(df_setup + zipfile_output_name, 'zip', df_setup)

    # print("starting zip process")
    # zipObj = ZipFile(df_setup + zipfile_output_name, "w")
    # print("writing server-files")
    # zipObj.write(df_setup + "server-files")
    # print("writing mongofiles")
    # zipObj.write(df_setup + "mongo-files")
    # print("writing complete, exiting zip")
    # zipObj.close()
    print("zip file writing done")

def sendZipToAllNodes(df_setup):
    for node in list_of_nodes:
        print("sending data to node: ", node)
        if node == "192.168.3.37":
            os.system("scp " + df_setup + zipfile_output_name + ".zip" + " johan@" + node + ":/home/johan/backup-k8s/")
        else:
            os.system("scp " + df_setup + zipfile_output_name + ".zip" + " nils@" + node + ":/home/nils/backup-k8s/")
        print("data sent!")

def checkSystem():
    def findFile(arr):
        for item in arr:
            if item == zipfile_output_name:
                return True
        return False

    data = []

    for node in list_of_nodes:
        if node == "192.168.3.37":
            output = os.popen("ssh johan@" + node + " ls /home/johan/backup-k8s").read()
        else:
            output = os.popen("ssh nils@" + node + " ls /home/nils/backup-k8s").read()
        arr = output.split("\n")

        print("from node: " + node + " are these files:")
        print(arr)

        if findFile(arr):
            data.append(node + ": success")
        else:
            data.append(node + ": fail")
    print("DATA: ", data)
    return data



        
def main(tf_setup, df_setup):  # tf=target_folder; df=destination_folder;

    # check if argument is passed at startup, if not case: set var to default path see at start of file
    if tf_setup == None:
        tf_setup = target_folder
    if df_setup == None:
        df_setup = destination_folder
    
<<<<<<< HEAD
    # checkIfFileClear(df_setup)
=======
    # checkIfFileClear()
>>>>>>> 9a89074cf83d7b4dbd7cc4dce8444357a9e14dd0
    # centralizeServerFiles(tf_setup, df_setup)
    # getMongoDump(mongo_pod_name, df_setup)
    # compressToZip(df_setup, zipfile_output_name)
    # sendZipToAllNodes(df_setup)
    # sms.main(checkSystem())

    def dayRoutine():
        checkIfFileClear(df_setup)
        centralizeServerFiles(tf_setup, df_setup)
        getMongoDump(mongo_pod_name, df_setup)
        compressToZip(df_setup, zipfile_output_name)
        sendZipToAllNodes(df_setup)
        sms.main(checkSystem())
    
    def nightRoutine():
        checkIfFileClear(df_setup)
        centralizeServerFiles(tf_setup, df_setup)
        getMongoDump(mongo_pod_name, df_setup)
        compressToZip(df_setup, zipfile_output_name)
        sendZipToAllNodes(df_setup)

    schedule.every().day.at("15:00").do(dayRoutine)
    schedule.every().day.at("00:00").do(nightRoutine)


    while 1:
        schedule.run_pending()
        time.sleep(1)

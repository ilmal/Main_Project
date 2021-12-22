import time
import schedule
import shutil
import zipfile
import os

target_folder = "/mnt/k8s-storage/kubedata/"
destination_folder = "/home/nils/backup-k8s/"
output_name = "test_folder.zip"


def centralizeServerFiles(tf_setup, df_setup):
    print("bacseFolder: ", tf_setup)
    files = os.listdir(tf_setup)
    for file in files:
        if file.startswith("mc-servers"):
            shutil.copy(tf_setup + file, df_setup)
            print("files copied from ", tf_setup, " to ", df_setup)


def main(tf_setup, df_setup):  # tf=target_folder; df=destination_folder;

    # check if argument is passed at startup, if not case: set var to default path see at start of file
    if tf_setup == None:
        tf_setup = target_folder
    if df_setup == None:
        df_setup = destination_folder

    centralizeServerFiles(tf_setup, df_setup)

    # schedule.every(1).seconds.do(
    #     centralizeServerFiles, tf_setup, df_setup)

    # while 1:
    #     schedule.run_pending()
    #     time.sleep(1)

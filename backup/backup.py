import time
import schedule


# import shutil
# import zipfile
# import os

# target_folder = "test_folder"
# output_name = "test_folder.zip"

# if target_folder in os.listdir("."):
#     shutil.rmtree(target_folder)

# os.mkdir(target_folder)

# for file in os.listdir("."):
#     if file.startswith("."):
#         print("File: " + file + "start with . (skipping)")
#         continue
#     if not file.startswith("test"):
#         print("File: " + file + " don't start with test")
#         continue
#     if not file.endswith(".test"):
#         print("File: " + file + " don't end with test")
#         continue
#     print("File: " + file + " is correct")
#     shutil.copy("./" + file, target_folder)

# if output_name in os.listdir("."):
#     os.remove(output_name)


# zip = zipfile.ZipFile(output_name, 'w', zipfile.ZIP_DEFLATED)

# shutil.make_archive(target_folder, 'zip', target_folder)


def main():
    print("hello")


schedule.every(1).seconds.do(main)
schedule.every().hour.do(main)
schedule.every().day.at("10:30").do(main)

while 1:
    schedule.run_pending()
    time.sleep(1)

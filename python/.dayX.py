#
import sys


file_path = "../input/dayX.txt" if len(sys.argv) > 1 else "./.temp.txt"

with open(file_path) as file:
    data = file.read().splitlines()



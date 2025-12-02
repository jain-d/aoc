# Gift Shop
import sys


file_path = "../input/day2.txt" if len(sys.argv) > 1 else "./.temp.txt"

with open(file_path) as file:
    id_ranges = file.read().rstrip("\n").split(",")

def id_check(id: str) -> bool:
    window_size = 1
    while True:
        if window_size > len(id):
            return False
        slice = window_size
        start = 0
        subset_not_found = True
        while slice + window_size <= len(id) and id[start:slice] == id[slice:slice+window_size]:
            if slice + window_size == len(id):
                return True
            subset_not_found = False
            start = slice
            slice = slice + window_size
        if slice + window_size > len(id):
            return False
        if subset_not_found:
            window_size += 1
        else:
            window_size = slice + 1

sum_of_invalid_ids = 0
for id_range in id_ranges:
    first_id, second_id = map(lambda x: int(x), id_range.split("-"))
    invalid_ids = [id for id in range(first_id, second_id + 1) if not len(str(id)) % 2 and str(id)[:len(str(id)) // 2] == str(id)[(len(str(id)) // 2):]]
    sum_of_invalid_ids += sum(invalid_ids)

print(f"\n\033[1;33m{sum_of_invalid_ids}\033[0m")

sum_of_invalid_ids_2 = 0
for id_range in id_ranges:
    first_id, second_id = map(lambda x: int(x), id_range.split("-"))
    for number in range(first_id, second_id + 1):
        if id_check(str(number)):
            sum_of_invalid_ids_2 += number

print(f"\033[1;33m{sum_of_invalid_ids_2}\033[0m")

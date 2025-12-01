# Secret Entrance
import sys


file_path = "../input/day1.txt" if len(sys.argv) > 1 else "./.temp.txt"

with open(file_path) as file:
    raw_data = file.read().splitlines()
current_pos = 50
times_zero = 0
pass_zero = 0

for a_rotation in raw_data:
    rotation_direction, rotation_amount = a_rotation[0], a_rotation[1:]
    cycles: int = 0

    if len(rotation_amount) > 2:
        cycles, rotation_amount = int(rotation_amount[:-2]), rotation_amount[-2:]
    new_pos = current_pos - int(rotation_amount) if rotation_direction == "L" else current_pos + int(rotation_amount)

    if new_pos == 0:
        times_zero += 1
        pass_zero += 1 if current_pos != 0 else 0
    elif new_pos < 0:
        new_pos += 100
        pass_zero += 1 if current_pos > 0 else 0
    elif new_pos > 99:
        times_zero += 1 if new_pos == 100 else 0
        new_pos -= 100
        pass_zero += 1

    current_pos = new_pos
    pass_zero += cycles
print(f"\n\033[1;33m{times_zero}\033[0m")
print(f"\033[1;33m{pass_zero}\033[0m")

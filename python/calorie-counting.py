from pyutils.colors import Colors

# Part 1
total_calories_per_elf: list = []

with open("../input/day1.txt", "r") as file:
    file_content = file.read()
    global elves
    elves = file_content.split("\n\n")

for elf in elves:
    entry_list = elf.splitlines()
    total_calories = 0
    for entry in entry_list:
        total_calories += int(entry.strip())
    total_calories_per_elf.append(total_calories)

total_calories_per_elf.sort()

print(f"\n{Colors.ORANGE}{total_calories_per_elf[-1]}")

# Part 2
print(f"\n{Colors.ORANGE}{sum(total_calories_per_elf[-3:])}")

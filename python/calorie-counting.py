from pyutils.colors import Colors


# Part 1
most_calories = 0
with open("../input/day1.txt", "r") as file:
    file_content = file.read()
    global elves
    elves = file_content.split("\n\n")

for elf in elves:
    entry_list = elf.splitlines()
    if len(entry_list) > 1:
        total_calories = 0
        for entry in entry_list:
            total_calories += int(entry.strip())
        most_calories = total_calories if total_calories > most_calories else most_calories

    else:
        if (calories := int(entry_list[0])) > most_calories:
            most_calories = calories

print(f"\n{Colors.ORANGE}{most_calories}")


# Part 2


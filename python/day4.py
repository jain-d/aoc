# Printing Department
import sys


file_path = "../input/day4.txt" if len(sys.argv) > 1 else "./.temp.txt"

with open(file_path) as file:
    data = file.read().splitlines()

grid = list(map(lambda x: list(x), data))
paper_roll = "@"

# part 1
accessable_rolls = 0
for row in range(0, len(grid)):
    for column in range(0, len(grid[row])):
        adjacent_rolls = 0
        if grid[row][column] == paper_roll:
            if row - 1 >= 0:
                if column - 1 >= 0 and grid[row - 1][column - 1] == paper_roll:
                    adjacent_rolls += 1
                if grid[row - 1][column] == paper_roll:
                    adjacent_rolls += 1
                if column + 1 < len(grid[row]) and grid[row - 1][column + 1] == paper_roll:
                    adjacent_rolls += 1
            if column - 1 >= 0 and grid[row][column - 1] == paper_roll:
                adjacent_rolls += 1
            if column + 1 < len(grid[row]) and grid[row][column + 1] == paper_roll:
                adjacent_rolls += 1
            if row + 1 < len(grid):
                if column - 1 >= 0 and grid[row + 1][column - 1] == paper_roll:
                    adjacent_rolls += 1
                if grid[row + 1][column] == paper_roll:
                    adjacent_rolls += 1
                if column + 1 < len(grid[row]) and grid[row + 1][column + 1] == paper_roll:
                    adjacent_rolls += 1
            if adjacent_rolls < 4:
                accessable_rolls += 1
print(f"\n\033[1;33m{accessable_rolls}\033[0m")

# part 2
total_accessable_rolls = 0
while True:
    accessable_rolls = 0
    for row in range(0, len(grid)):
        for column in range(0, len(grid[row])):
            adjacent_rolls = 0
            if grid[row][column] == paper_roll:
                if row - 1 >= 0:
                    if column - 1 >= 0 and grid[row - 1][column - 1] == paper_roll:
                        adjacent_rolls += 1
                    if grid[row - 1][column] == paper_roll:
                        adjacent_rolls += 1
                    if column + 1 < len(grid[row]) and grid[row - 1][column + 1] == paper_roll:
                        adjacent_rolls += 1
                if column - 1 >= 0 and grid[row][column - 1] == paper_roll:
                    adjacent_rolls += 1
                if column + 1 < len(grid[row]) and grid[row][column + 1] == paper_roll:
                    adjacent_rolls += 1
                if row + 1 < len(grid):
                    if column - 1 >= 0 and grid[row + 1][column - 1] == paper_roll:
                        adjacent_rolls += 1
                    if grid[row + 1][column] == paper_roll:
                        adjacent_rolls += 1
                    if column + 1 < len(grid[row]) and grid[row + 1][column + 1] == paper_roll:
                        adjacent_rolls += 1
                if adjacent_rolls < 4:
                    accessable_rolls += 1
                    grid[row][column] = "."
    if accessable_rolls == 0:
        break
    total_accessable_rolls += accessable_rolls

print(f"\033[1;33m{total_accessable_rolls}\033[0m")

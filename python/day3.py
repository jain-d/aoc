# Lobby
import sys


file_path = "../input/day3.txt" if len(sys.argv) > 1 else "./.temp.txt"

with open(file_path) as file:
    raw_data = file.read().splitlines()

for no_of_batteries in [2, 12]:
    highest_two_battery_joltages = []

    for joltage in raw_data:
        highest_possible_jolts: list[str] = []
        times: int = no_of_batteries
        manual_override: bool = False
        last_found_at: int = 0

        for time in range(times):
            if not manual_override:
                start_point = time
            highest_possible_jolts.append(joltage[start_point])
            last_found_at = start_point
            for index in range(start_point+1, len(joltage) - (times - 1 - time)):
                if joltage[index] > highest_possible_jolts[time]:
                    highest_possible_jolts[time] = joltage[index]
                    last_found_at = index
                    manual_override = True

            if manual_override:
                start_point = last_found_at + 1
                

        highest_two_battery_joltages.append(int("".join(highest_possible_jolts)))

    print(f"\n\033[1;33m{sum(highest_two_battery_joltages)}\033[0m")

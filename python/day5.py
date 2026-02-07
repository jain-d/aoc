# Cafeteria
import sys
import bisect


file_path = "../input/day5.txt" if len(sys.argv) > 1 else "./.temp.txt"

with open(file_path) as file:
    fresh_prod_ranges, individual_ids = file.read().split("\n\n")

fresh_prod_ranges = fresh_prod_ranges.splitlines()
individual_ids = individual_ids.splitlines()

left: list[int] = []
right: list[int] = []

for prod_range in fresh_prod_ranges:
    left_endpoint, right_endpoint = prod_range.split("-")
    left_endpoint, right_endpoint = int(left_endpoint), int(right_endpoint)
    if not left and not right:
        left.append(left_endpoint)
        right.append(right_endpoint)
        continue

    l_idx = bisect.bisect_right(left, left_endpoint)
    r_idx = bisect.bisect_right(right, right_endpoint)

    if l_idx != r_idx:
        if r_idx == len(right) and l_idx == 0: # covers the entire range
            left.clear()
            right.clear()
            left.append(left_endpoint)
            right.append(right_endpoint)
        else:
            pass
    
    if l_idx == 0:
        if left[l_idx] <= right_endpoint: # overlap
            left[l_idx] = left_endpoint
            if right[l_idx] < right_endpoint:
                r_idx = bisect.bisect_right(right, right_endpoint)

        else: # discreet range
            bisect.insort_right(left, left_endpoint)
            bisect.insort_right(right, right_endpoint)
    elif right[l_idx - 1] >= left_endpoint:
        pass # overlap
    


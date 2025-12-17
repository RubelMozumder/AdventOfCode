from typing import List

global ZERO_LEADING_VALID_NUMBER, TOTAL_VALID_ID
ZERO_LEADING_VALID_NUMBER: List[int] = []
TOTAL_VALID_ID = 0


def is_invalid_number(number: str):
    num_len = len(number)
    # even?
    if (num_len % 2 == 0) and (mid_char_no := int(num_len / 2)):
        counts = 0
        while number[mid_char_no - 1 - counts] == number[num_len - 1 - counts]:
            print(" ### 3")
            counts += 1
            # all chars are already checked
            if counts == mid_char_no:
                print(" number # ", number)
                return True if int(number) not in ZERO_LEADING_VALID_NUMBER else False

    return False


def parse_range(id_range: str):
    global ZERO_LEADING_VALID_NUMBER, TOTAL_VALID_ID
    ZERO_LEADING_VALID_NUMBER = []
    TOTAL_VALID_ID = 0

    left_s, right_s = [i.strip() for i in id_range.split("-")]
    l_num_size = len(left_s)
    lowest_left_number = 10 ** (l_num_size - 1)
    # right part starts with 0
    if right_s.startswith("0"):
        if left_s.startswith("0"):
            ZERO_LEADING_VALID_NUMBER += list(
                id_range(int(left_s.lstrip("0")), right_s.lstrip("0"))
            )
            return

    left_int: int = int(left_s)
    # check for zero leading valid number upto the power of ten
    if left_s.startswith("0"):
        left_int = int(left_s.lstrip("0"))
        ZERO_LEADING_VALID_NUMBER.append(int(left_int))
        while left_int < lowest_left_number:
            print(" ### 2")
            left_int += 1

    right_intger = int(right_s)
    while left_int <= right_intger:
        if is_invalid_number(number=str(left_int)):
            print(" ### 1")
            TOTAL_VALID_ID += 1
            left_int += 1
            continue
        left_int += 1
    print(
        f" range id_range : {id_range} ZERO_LEADING_VALID_NUMBER : {ZERO_LEADING_VALID_NUMBER} Total {TOTAL_VALID_ID}"
    )
    return


def get_range(puzzle_input: str):
    seperator = ","

    ranges = puzzle_input.split(seperator)
    for id_range in ranges:
        parse_range(id_range=id_range)


if __name__ == "__main__":
    # puzzle_input: str = """1188511880-1188511890"""
    puzzle_input: str = """11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
    1698522-1698528,446443-446449,38593856-38593862,565653-565659,
    824824821-824824827,2121212118-2121212124"""
    get_range(puzzle_input.strip())
    print(" #### Total : ", TOTAL_VALID_ID)

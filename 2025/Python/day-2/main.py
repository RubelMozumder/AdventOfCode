from typing import List

global ZERO_LEADING_VALID_NUMBER, SUM_INVLID_ID
ZERO_LEADING_VALID_NUMBER: List[int] = []
SUM_INVLID_ID = 0


def is_invalid_number(number: str):
    num_len = len(number)
    # even?
    if (num_len % 2 == 0) and (mid_char_no := int(num_len / 2)):
        counts = 0
        while number[mid_char_no - 1 - counts] == number[num_len - 1 - counts]:
            counts += 1
            # all chars are already checked
            if counts == mid_char_no:
                return True if int(number) not in ZERO_LEADING_VALID_NUMBER else False

    return False


def parse_range(id_range: str):
    global ZERO_LEADING_VALID_NUMBER, SUM_INVLID_ID
    ZERO_LEADING_VALID_NUMBER
    SUM_INVLID_ID
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
            left_int += 1

    right_intger = int(right_s)
    while left_int <= right_intger:
        if is_invalid_number(number=str(left_int)):
            SUM_INVLID_ID += left_int
        left_int += 1

    return


def get_range(puzzle_input: str):
    seperator = ","

    ranges = puzzle_input.split(seperator)
    for id_range in ranges:
        # skip none or empty string
        if id_range:
            parse_range(id_range=id_range.strip())

    print(" #### Total : ", SUM_INVLID_ID)


if __name__ == "__main__":
    # Sum of the invalid id: 1227775554
    puzzle_input_test: str = """11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
    1698522-1698528,446443-446449,38593856-38593862,565653-565659,
    824824821-824824827,2121212118-2121212124"""
    # The sum of the invalid id : 56660955519
    puzzle_input: str = """
        328412 - 412772,
        1610 - 2974,
        163 - 270,
        7693600637 - 7693779967,
        352 - 586,
        65728 - 111612,
        734895 - 926350,
        68 - 130,
        183511 - 264058,
        8181752851 - 8181892713,
        32291 - 63049,
        6658 - 12472,
        720 - 1326,
        21836182 - 21869091,
        983931 - 1016370,
        467936 - 607122,
        31 - 48,
        6549987 - 6603447,
        8282771161 - 8282886238,
        7659673 - 7828029,
        2 - 18,
        7549306131 - 7549468715,
        3177 - 5305,
        20522 - 31608,
        763697750 - 763835073,
        5252512393 - 5252544612,
        6622957 - 6731483,
        9786096 - 9876355,
        53488585 - 53570896
    """
    get_range(puzzle_input_test.strip())

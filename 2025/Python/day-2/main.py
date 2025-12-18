from typing import List

global ZERO_LEADING_VALID_NUMBER, SUM_INVLID_ID_P2
ZERO_LEADING_VALID_NUMBER: List[int] = []
SUM_INVLID_ID_P2 = 0
SUM_INVLID_ID_P1 = 0


def is_invalid_number_p1(number: str):
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


def is_invalid_number_p2(number: str):
    num_len = len(number)
    half_integer_number = int(num_len / 2)
    no_of_digit_repeated_number = 1
    # if num_len == 2:
    #     return number[0] == number[1]
    while no_of_digit_repeated_number <= half_integer_number:
        if (num_len % no_of_digit_repeated_number == 0) and (
            no_number_in_each_grp := int(num_len / no_of_digit_repeated_number)
        ):
            possible_repeated_num = number[0:no_of_digit_repeated_number]
            # full string of number

            list_of_repeated_num = (
                number[
                    i * no_of_digit_repeated_number : (i + 1)
                    * no_of_digit_repeated_number
                ]
                for i in range(no_number_in_each_grp)
            )
            if (
                all((possible_repeated_num == i for i in list_of_repeated_num))
                and number not in ZERO_LEADING_VALID_NUMBER
            ):
                return True
        no_of_digit_repeated_number += 1

    return False


def parse_range(id_range: str):
    global ZERO_LEADING_VALID_NUMBER, SUM_INVLID_ID_P2, SUM_INVLID_ID_P1
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
        if is_invalid_number_p2(number=str(left_int)):
            SUM_INVLID_ID_P2 += left_int
        if is_invalid_number_p1(number=str(left_int)):
            SUM_INVLID_ID_P1 += left_int
        left_int += 1

    return


def get_range(puzzle_input: str):
    seperator = ","

    ranges = puzzle_input.split(seperator)
    for id_range in ranges:
        # skip none or empty string
        if id_range:
            parse_range(id_range=id_range.strip())

    print(" #### Total : ", SUM_INVLID_ID_P2)
    print(" #### Total : ", SUM_INVLID_ID_P1)


if __name__ == "__main__":
    # Sum of the invalid id: 1227775554 (Part-1) and  4174379265 (part-2)
    puzzle_input_test: str = """11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124"""

    # Part-1 Test data
    # 11-22 has two invalid IDs, 11 and 22.
    # 95-115 has one invalid ID, 99.
    # 998-1012 has one invalid ID, 1010.
    # 1188511880-1188511890 has one invalid ID, 1188511885.
    # 222220-222224 has one invalid ID, 222222.
    # 1698522-1698528 contains no invalid IDs.
    # 446443-446449 has one invalid ID, 446446.
    # 38593856-38593862 has one invalid ID, 38593859.
    # The rest of the ranges contain no invalid IDs.

    # Part-2 Test data
    # 11-22 still has two invalid IDs, 11 and 22.
    # 95-115 now has two invalid IDs, 99 and 111.
    # 998-1012 now has two invalid IDs, 999 and 1010.
    # 1188511880-1188511890 still has one invalid ID, 1188511885.
    # 222220-222224 still has one invalid ID, 222222.
    # 1698522-1698528 still contains no invalid IDs.
    # 446443-446449 still has one invalid ID, 446446.
    # 38593856-38593862 still has one invalid ID, 38593859.
    # 565653-565659 now has one invalid ID, 565656.
    # 824824821-824824827 now has one invalid ID, 824824824.
    # 2121212118-2121212124 now has one invalid ID, 2121212121.

    # The sum of the invalid id : 56660955519 (Part-1), 79183223243 (Part-2)
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
    get_range(puzzle_input.strip())

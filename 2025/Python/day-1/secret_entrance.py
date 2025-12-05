L_BOUNDARIES = 0
R_BOUNDARIES = 99
TOTAL_STEPS = 100

NUTRAL_NUMBER = 0


def walk_left(point, steps):
    moved = point - steps
    if moved == NUTRAL_NUMBER:
        return (NUTRAL_NUMBER, 0)
    elif moved > L_BOUNDARIES:
        return (moved, 0)
    else:
        return (moved + TOTAL_STEPS, 1)


def walk_right(point, steps):
    moved = point + steps
    if moved == NUTRAL_NUMBER:
        return (NUTRAL_NUMBER, 0)
    elif moved <= R_BOUNDARIES:
        return (moved, 0)
    else:
        return (moved - TOTAL_STEPS, 0)


def find_password(str_list, start_point):
    password = 0
    res = start_point
    for str_ in str_list:
        if str_.startswith("L"):
            steps = int(str_[1:])
            res, pass_incre = walk_left(res, steps)
            password += pass_incre
        elif str_.startswith("R"):
            steps = int(str_[1:])
            res, pass_incre = walk_right(res, steps)
            password += pass_incre
        else:
            raise ValueError(f"Invalid direction found: {str_}")
    return password


# def main(puzzel_input_file):
#     try:
#         with open(puzzel_input_file, "r") as f:
#             str_list = [line.strip() for line in f.readlines()]
#     except FileNotFoundError:
#         print(f"File {puzzel_input_file} not found.")
#         return
#     print(
#         "### find_password(str_list=str_list, start_point=50)",
#         find_password(str_list=str_list, start_point=50),
#     )

#     return find_password(str_list=str_list, start_point=50)

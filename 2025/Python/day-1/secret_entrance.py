L_BOUNDARIES = 0
R_BOUNDARIES = 99
TOTAL_STEPS = 100

NUTRAL_NUMBER = 0


def walk_left(point, steps):
    moved = point - steps
    if (moved % 100) == 0:
        return (NUTRAL_NUMBER, 1)
    return (moved % TOTAL_STEPS, 0)


def walk_right(point, steps):
    moved = point + steps
    if (moved % 100) == 0:
        return (0, 1)
    return (moved % TOTAL_STEPS, 0)


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

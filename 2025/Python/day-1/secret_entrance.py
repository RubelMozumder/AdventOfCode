L_BOUNDARIES = 0
R_BOUNDARIES = 99
TOTAL_STEPS = 100

NUTRAL_NUMBER = 0


def walk_left1(point, steps):
    moved = point - steps
    if (moved % 100) == 0:
        return (NUTRAL_NUMBER, 1)
    return (moved % TOTAL_STEPS, 0)


def walk_right1(point, steps):
    moved = point + steps
    if (moved % 100) == 0:
        return (0, 1)
    return (moved % TOTAL_STEPS, 0)

def walk_left2(point, steps):
    moved = point - steps
    # moved ~ (99, 1)
    # moved == 0
    # moved < 0 
    zero_crossed = 1
    # Already pointing at zero not crossing zero
    if point == 0:
        zero_crossed = 0
    if moved < 1:
         # already zero crossed
        # print(
        #     f"##### moved: with steps {steps}",
        #     (moved % TOTAL_STEPS, (int(moved / TOTAL_STEPS) * -1) + zero_crossed),
        # )
        
        return (moved % TOTAL_STEPS, 
                (int(moved / TOTAL_STEPS) * -1) + zero_crossed)
    return (moved, 0)

def walk_right2(point, steps):
    moved = point + steps
    # moved ~ (1-99)
    # moved == 0
    # moved > 99
    if moved > R_BOUNDARIES:
        return (moved % TOTAL_STEPS, int(moved / TOTAL_STEPS))
    elif moved == 0:
        return (0, 1)
    return (moved, 0)

def get_int_list_from_file(puzzle_input_file):
    try:
        with open(puzzle_input_file, "r") as f:
            str_list = [line.strip() for line in f.readlines()]
    except FileNotFoundError:
        raise FileNotFoundError(f"File {puzzle_input_file} not found.")
    return str_list

def find_password_part1(puzzle_input_file, start_point=50):
    str_list = get_int_list_from_file(puzzle_input_file)
    password = 0
    res = start_point
    for str_ in str_list:
        if str_.startswith("L"):
            steps = int(str_[1:])
            res, pass_incre = walk_left1(res, steps)
            password += pass_incre
        elif str_.startswith("R"):
            steps = int(str_[1:])
            res, pass_incre = walk_right1(res, steps)
            password += pass_incre
        else:
            raise ValueError(f"Invalid direction found: {str_}")
    return password

def find_password_part2(puzzle_input_file, start_point=50):

    str_list = get_int_list_from_file(puzzle_input_file)
    password = 0
    res = start_point
    for str_ in str_list:
        if str_.startswith("L"):
            steps = int(str_[1:])
            res, password_incre = walk_left2(res, steps)
            password += password_incre
        elif str_.startswith("R"):
            steps = int(str_[1:])
            res, password_incre = walk_right2(res, steps)
            password += password_incre
        else:
            raise ValueError(f"Invalid direction found: {str_}")
    return password 

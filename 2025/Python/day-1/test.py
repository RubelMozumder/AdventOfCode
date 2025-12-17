from secret_entrance import walk_left1, walk_right1, find_password_part1, find_password_part2
from pathlib import Path

if __name__ == "__main__":
    assert walk_left1(50, 68) == (82, 0)
    assert walk_left1(82, 30) == (52, 0)
    assert walk_right1(52, 48) == (0, 1)
    assert walk_left1(0, 5) == (95, 0)
    assert walk_right1(95, 60) == (55, 0)
    assert walk_left1(55, 55) == (0, 1)
    assert walk_left1(0, 1) == (99, 0)
    assert walk_left1(99, 99) == (0, 1)
    assert walk_right1(0, 14) == (14, 0)
    assert walk_left1(14, 82) == (32, 0)
    assert walk_right1(50, 50) == (0, 1)

    current_dir = Path(__file__).resolve().parent
    puzzle_input_file1 = current_dir / "test1.txt"
    puzzle_input_file2 = current_dir / "puzzle_input.txt"
    assert find_password_part1(puzzle_input_file=puzzle_input_file1, start_point=50) == 3
    assert find_password_part1(puzzle_input_file=puzzle_input_file2, start_point=50) == 1089
    puzzle_input_file1 = current_dir / "test2.txt"
    assert find_password_part2(puzzle_input_file=puzzle_input_file1, start_point=50) == 6
    assert (
        find_password_part2(puzzle_input_file=puzzle_input_file2, start_point=50) == 6530
    )
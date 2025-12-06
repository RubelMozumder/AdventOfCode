from secret_entrance import walk_left, walk_right, find_password_part1, find_password_part2



if __name__ == "__main__":
    from pathlib import Path

    current_dir = Path(__file__).resolve().parent
    puzzle_input_file = current_dir / "puzzle_input.txt"
    print(" ### : password ", find_password_part1(puzzle_input_file=puzzle_input_file, start_point=50))
    print(" ### : password ", find_password_part2(puzzle_input_file=puzzle_input_file, start_point=50))

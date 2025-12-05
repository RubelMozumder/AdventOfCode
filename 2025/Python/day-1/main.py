from secret_entrance import walk_left, walk_right, find_password


def main(puzzel_input_file):
    try:
        with open(puzzel_input_file, "r") as f:
            str_list = [line.strip() for line in f.readlines()]
    except FileNotFoundError:
        print(f"File {puzzel_input_file} not found.")
        return
    return find_password(str_list=str_list, start_point=50)


if __name__ == "__main__":
    from pathlib import Path

    current_dir = Path(__file__).resolve().parent
    puzzel_input_file = current_dir / "puzzle_input.txt"
    print(" ### :", main(puzzel_input_file=puzzel_input_file))

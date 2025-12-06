from secret_entrance import walk_left, walk_right
from main import main
from pathlib import Path

if __name__ == "__main__":
    assert walk_left(50, 68) == (82, 0)
    assert walk_left(82, 30) == (52, 0)
    assert walk_right(52, 48) == (0, 1), walk_right(52, 48)
    assert walk_left(0, 5) == (95, 0)
    assert walk_right(95, 60) == (55, 0)
    assert walk_left(55, 55) == (0, 1)
    assert walk_left(0, 1) == (99, 0)
    assert walk_left(99, 99) == (0, 1)
    assert walk_right(0, 14) == (14, 0)
    assert walk_left(14, 82) == (32, 0)
    assert walk_right(50, 50) == (0, 1)

    current_dir = Path(__file__).resolve().parent
    puzzel_input_file1 = current_dir / "test.txt"
    puzzel_input_file2 = current_dir / "puzzle_input.txt"
    assert main(puzzel_input_file=puzzel_input_file1) == 3
    assert main(puzzel_input_file=puzzel_input_file2) == 1089

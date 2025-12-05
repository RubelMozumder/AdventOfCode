from secret_entrance import walk_left, walk_right
from main import main
from pathlib import Path

if __name__ == "__main__":
    assert walk_left(50, 68) == 82
    assert walk_left(82, 30) == 52
    assert walk_right(52, 48) == 0
    assert walk_left(0, 5) == 95
    assert walk_right(95, 60) == 55
    assert walk_left(55, 55) == 0
    assert walk_left(0, 1) == 99
    assert walk_left(99, 99) == 0
    assert walk_right(0, 14) == 14
    assert walk_left(14, 82) == 32
    assert walk_right(50, 50) == 0
    assert walk_left(50, 50) == 0

    assert walk_right(0, 0) == 0
    assert walk_left(0, 0) == 0

    assert walk_left(3, 5) == 98
    assert walk_right(98, 5) == 3
    assert walk_right(95, 60) == 55

    current_dir = Path(__file__).resolve().parent
    puzzel_input_file = current_dir / "test.txt"
    assert main(puzzel_input_file=puzzel_input_file) == 3

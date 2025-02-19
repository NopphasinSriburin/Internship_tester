
# pattern_drawer.py
def draw_pattern(x):
    for i in range(1, x + 1):
        print('*' * i)
    for i in range(x - 1, 0, -1):
        print('*' * i)

if __name__ == "__main__":
    draw_pattern(5)
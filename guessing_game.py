#!/usr/bin/env python3
"""
간단한 숫자 맞추기 게임 (1-100)

사용자 입력을 받아 1부터 100 사이의 정답을 맞추는 콘솔 게임입니다.
힌트: 정답보다 크거나 작은지 알려줍니다. q를 입력하면 게임을 종료합니다.

사용: python3 guessing_game.py
"""
import random


def play_game():
    secret = random.randint(1, 100)
    attempts = 0
    print("숫자 맞추기 게임에 오신 것을 환영합니다! (1부터 100 사이)")
    print("힌트: 정답보다 크면 '더 작음', 정답보다 작으면 '더 큼'이라고 알려드립니다.")
    print("종료하려면 'q'를 입력하세요. 행운을 빌어요!\n")

    while True:
        guess = input("숫자를 입력하세요: ").strip()
        if not guess:
            print("입력이 비어있습니다 — 1부터 100 사이의 숫자를 입력하거나 'q'로 종료하세요.")
            continue

        if guess.lower() == 'q':
            print("게임을 종료합니다. 다음에 또 도전해주세요!")
            break

        try:
            num = int(guess)
        except ValueError:
            print("유효한 숫자를 입력하세요. 예: 42 또는 'q'로 종료")
            continue

        if num < 1 or num > 100:
            print("숫자는 1부터 100 사이여야 합니다. 다시 시도하세요.")
            continue

        attempts += 1

        if num == secret:
            print(f"정답입니다! 🎉 {attempts}번 만에 맞추셨어요. 축하합니다!")
            break
        elif num < secret:
            print("더 큽니다. ↑")
        else:
            print("더 작습니다. ↓")


if __name__ == '__main__':
    try:
        play_game()
    except KeyboardInterrupt:
        print('\n게임이 중단되었습니다. 다음에 또 도전하세요!')

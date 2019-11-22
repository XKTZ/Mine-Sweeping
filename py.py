import math
import random
backBoard = [[0 for i in range(10)] for i in range(10)]
frontBoard = [[-2 for i in range(10)] for i in range(10)]
win = False

def calSum(x, y):
    if backBoard[x][y] != -1:
        for i in range(-1, 2):
            for j in range(-1, 2):
                if  0 <= (x + i) < 10 and 0 <= (y + j) < 10 and backBoard[x + i][y + j] == -1:
                    backBoard[x][y] += 1

def openBlock(x, y):
    if backBoard[x][y] != -1:
        frontBoard[x][y] = backBoard[x][y]
        if backBoard[x][y] == 0:
            mX = x - 1
            mY = y - 1
            aX = x + 1
            aY = y + 1

            try:
                if mX >=0 and backBoard[mX][y] >= 0 and frontBoard[mX][y] == -2:
                    openBlock(mX, y)
            except IndexError:
                pass
            try:
                if aX >=0 and backBoard[aX][y] >= 0 and frontBoard[aX][y] == -2:
                    openBlock(aX, y)
            except IndexError:
                pass
            try:
                if aY >= 0 and backBoard[x][aY] >= 0 and frontBoard[x][aY] == -2:
                    openBlock(x, aY)
            except IndexError:
                pass
            try:
                if mY >= 0 and backBoard[x][mY] >= 0 and frontBoard[x][mY] == -2:
                    openBlock(x, mY)
            except IndexError:
                pass
    else:
        print("You lose")
        printBack()
        exit()

def printFront():
    for i in range(10):
        for j in range(10):
            if frontBoard[i][j] >= 0:
                print(frontBoard[i][j], end="  ")
            else:
                print("N", end="  ")
        print()

def printBack():
    for i in range(10):
        for j in range(10):
            if backBoard[i][j] >= 0:
                print(backBoard[i][j], end="  ")
            else:
                print("X", end="  ")
        print()

def calAllSum():
    for i in range(10):
        for j in range(10):
            calSum(i, j)

def getRan():
    for i in range(10):
        ok = False
        while not ok:
            x = int(random.random() * 10)
            y = int(random.random() * 10)
            if backBoard[x][y] != -1:
                ok = True
                backBoard[x][y] = -1

def checkWin():
    empBlock = 0
    for i in range(10):
        for j in range(10):
            if frontBoard[i][j] != -2:
                empBlock += 1
    if empBlock >= 90:
        global win
        win = True

getRan()
calAllSum()
printFront()

while not win:
    y, x = (int(i) - 1 for i in input().split())
    openBlock(x, y)
    checkWin()
    printFront()
    if win:
        print()
        print("You Win")
        print()
        printBack()
        exit()
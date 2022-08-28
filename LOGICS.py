grid = [None, None, None,
        None, None, None,
        None, None, None]

def getPlayerInput():
    spot = None
    
    spot = int(input("Pick a number on the grid [1-9]:"))
    
    while(type(spot) != "int"):
        spot = int(input("That was not a number, please pick a number on the grid [1-9]:"))

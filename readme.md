# Tic Tac Toe

This project implements a simple tic tac toe game with a reasonable computer AI.

The game chooses a random player to start the game.
You have always the "X" and the opponent (computer) has always the "O".

Game can finish with either a win, a loss or a draw.

It then promts you for a new game.

_(Game screenshot)_
![alt text](src/img/screenshot.jpg)

I hope you enjoy the game

## AI

The AI first checks if the computer can win in the next move, then checks if it has to prevent the player from winning in the next move.

If neither of the above apply, it plays according to a minimax algorithm which I found in geeksforgeeks and was implemented by rag2127 (https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/).

## Instalation

This app uses npm and webpack.

> `$ npm install`

npm has the following scripts

> `$ npm run build`
>
> _Builds the dist folder in development mode_

> `$ npm run prod`
>
> _Builds the dist folder in production mode_

> `$ npm run dev`
>
> _Runs the app in localhost:3000_

---

Paris Lyritis, 2022

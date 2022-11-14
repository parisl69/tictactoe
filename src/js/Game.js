import Player from './Player.js'
import { delay } from './delay.js'
import { findBestMove } from './minmax'

const playAgainButton = '<button id="play-again-button">Play again</button>'

export default class Game {
	info = $('#bottom-info-wrapper')
	constructor() {
		this.you = new Player('you', 'x')
		this.opp = new Player('opp', 'o')
		this.initialize()
	}
	initialize() {
		this.board = Array(9).fill('empty')
		this.over = 0
		this.activePlayer = ['you', 'opp'][Math.floor(Math.random() * 2)]
		this.enableCells()
		$('#top-info-wrapper .you img').addClass(this.you.mark)
		$('#top-info-wrapper .opp img').addClass(this.opp.mark)
		$('.ttt-cell').removeClass('o x you opp')
		$('.win-line').hide()
	}
	// returns this board as a 2D array
	get2dBoard() {
		return [
			this.board.slice(0, 3),
			this.board.slice(3, 6),
			this.board.slice(6, 9),
		]
	}
	// sets an element in the 2D board
	set2dBoardElement(row, col, val) {
		this.board[3 * row + col] = val
	}
	switchPlayer() {
		this.activePlayer = this.activePlayer === 'you' ? 'opp' : 'you'
	}
	disableCells() {
		$('.ttt-cell').addClass('disabled')
	}
	enableCells() {
		$('.ttt-cell').removeClass('disabled')
	}
	async playGame() {
		$(this.info).html('Game started')
		while (this.over === 0) {
			if (this.activePlayer === 'you') {
				await this.playerTurn()
			} else {
				await this.oppTurn()
			}
			this.over = this.checkGame()
			this.switchPlayer()
		}
		switch (this.over) {
			case 1:
				$(this.info).html('Game is a draw.' + playAgainButton)
				break
			case 2:
				this.disableCells()
				$(this.info).html('You win!' + playAgainButton)
				break
			case 3:
				this.disableCells()
				$(this.info).html('Opponent wins :(' + playAgainButton)
				break
		}
	}
	playerTurn() {
		return new Promise((resolve) => {
			$(this.info).html('Make your move...')
			let this_game = this
			$(document).on(
				'click',
				'.ttt-cell:not(.o):not(.x):not(.disabled)',
				function (e) {
					$(this).addClass(this_game.you.mark + ' you')
					const cellNo = $(this).attr('id')[1]
					this_game.board[parseInt(cellNo - 1)] = 'you'
					resolve()
				}
			)
		})
	}
	oppTurn() {
		return new Promise(async (resolve) => {
			this.disableCells()
			$(this.info).html('Opponent playing...')
			await delay(1000)
			this.oppPlayLogic()
			this.enableCells()
			resolve()
		})
	}
	/**
	 * Computer logic for play using minmax algorithm
	 */
	oppPlayLogic() {
		let board = this.get2dBoard()
		const bestMove = findBestMove(board)
		console.log('Computer plays ' + bestMove.row + ', ' + bestMove.col)
		const moveIndex = 3 * bestMove.row + bestMove.col
		const cell = $('#c' + (moveIndex + 1).toString())
		cell.addClass(this.opp.mark + ' opp')
		this.board[moveIndex] = 'opp'
	}
	/**
	 * Checks if game is still running, has a win or a draw
	 * @returns
	 * 0: game still running
	 * 1: draw
	 * 2: player wins
	 * 3: opponent wins
	 */
	checkGame() {
		// Check for wins. Player: 2, Computer: 3
		const winPatterns = {
			'win-line-1': [0, 1, 2],
			'win-line-2': [3, 4, 5],
			'win-line-3': [6, 7, 8],
			'win-line-4': [0, 3, 6],
			'win-line-5': [1, 4, 7],
			'win-line-6': [2, 5, 8],
			'win-line-7': [0, 4, 8],
			'win-line-8': [2, 4, 6],
		}
		for (const key in winPatterns) {
			const winCombo = winPatterns[key]
			if (
				this.board[winCombo[0]] !== 'empty' &&
				this.board[winCombo[0]] === this.board[winCombo[1]] &&
				this.board[winCombo[1]] === this.board[winCombo[2]]
			) {
				$('#' + key).show()
				return this.board[winCombo[0]] === 'you' ? 2 : 3
			}
		}
		// Check for draw i.e. All cells do not include 'empty': 1
		if (!this.board.includes('empty')) {
			return 1
		}
		// Game still running: 0
		return 0
	}
}
